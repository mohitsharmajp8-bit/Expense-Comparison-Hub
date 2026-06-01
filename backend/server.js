require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this';

// Initialize the Grok client (xAI)
const grokClient = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'expense_hub',
  waitForConnections: true,
  connectionLimit: 10,
});

// Test MySQL connection & create users table
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully!');
    connection.release();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ready');
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
  }
})();

// ========== AUTHENTICATION ENDPOINTS ==========
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({
      message: "User created",
      token,
      user: { id: result.insertId, name, email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ========== AI ENDPOINTS ==========

// 1. AI Advice – Grok with fallback
app.post('/api/ai-advice', async (req, res) => {
  const { productName, price, oldPrice, priceHistory, platforms } = req.body;
  const discount = ((oldPrice - price) / oldPrice) * 100;
  const avgPrice = priceHistory.reduce((sum, p) => sum + p.price, 0) / priceHistory.length;
  
  const prompt = `
Product: ${productName}
Current price: ₹${price}
Original price: ₹${oldPrice}
Discount: ${discount.toFixed(0)}%
Average historical price: ₹${avgPrice.toFixed(0)}
Give a short, actionable buying advice (1-2 sentences). Mention if it's a good deal or if the user should wait.
`;

  try {
    const completion = await grokClient.chat.completions.create({
      model: "grok-beta",
      messages: [
        { role: "system", content: "You are a helpful shopping advisor." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    const advice = completion.choices[0].message.content;
    res.json({ advice });
  } catch (error) {
    console.error('Grok advice error:', error.message);
    const belowAvg = price < avgPrice * 0.95;
    let advice = "";
    if (discount > 30) advice = `🔥 Great deal! ${discount.toFixed(0)}% off – buy now.`;
    else if (belowAvg) advice = `✅ Price is below average. Good time to buy.`;
    else if (price > avgPrice * 1.05) advice = `⏳ Price is higher than usual. Wait for a drop.`;
    else advice = `👍 Decent price. Compare on other platforms.`;
    res.json({ advice });
  }
});

// 2. AI Chat – smart rule‑based (works without API)
app.post('/api/ai-chat', async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const msg = message.toLowerCase();
  let reply = "";

  if (msg.includes("discount") || msg.includes("sale") || msg.includes("offer")) {
    reply = "🎉 We have great discounts! Check products with the 'Deal Score' badge. Today's top deal: 40% off on Samsung Galaxy Buds2 Pro. Use the search bar to find more!";
  } 
  else if (msg.includes("delivery") || msg.includes("shipping") || msg.includes("deliver")) {
    reply = "🚚 Delivery times vary by platform: Zepto/Blinkit: 10 minutes, Amazon/Flipkart: 1-2 days. Your delivery address will be used at checkout for exact estimates.";
  }
  else if (msg.includes("phone") || msg.includes("mobile") || msg.includes("iphone") || msg.includes("samsung")) {
    reply = "📱 We have iPhones, Samsung, OnePlus, and more. For gaming, the OnePlus 12 and iPhone 15 Pro are excellent. Compare prices using the platform badges!";
  }
  else if (msg.includes("vegetable") || msg.includes("carrot") || msg.includes("potato")) {
    reply = "🥕 Fresh vegetables like carrots, potatoes, tomatoes are available under the 'Vegetables' category. Enjoy 10 mins delivery from Zepto/Blinkit!";
  }
  else if (msg.includes("price") || msg.includes("cost") || msg.includes("cheap")) {
    reply = "💰 We compare prices across Amazon, Flipkart, Zepto, Blinkit, BigBasket & Instamart. Look for the 'Best' badge to see the lowest price!";
  }
  else {
    reply = "👋 I'm your AI shopping assistant. You can ask me about discounts, delivery times, product recommendations, or price comparisons. What would you like to know?";
  }

  res.json({ reply });
});

// 3. Price Prediction – rule‑based
app.post('/api/price-predict', async (req, res) => {
  const { priceHistory, currentPrice } = req.body;
  const last3 = priceHistory.slice(-3).map(p => p.price);
  const trend = last3[2] > last3[0] ? "up" : last3[2] < last3[0] ? "down" : "stable";
  let predictedPrice = currentPrice;
  let confidence = 0.7;
  
  if (trend === "down") {
    predictedPrice = currentPrice * 0.95;
    confidence = 0.8;
  } else if (trend === "up") {
    predictedPrice = currentPrice * 1.03;
    confidence = 0.6;
  }
  
  res.json({ trend, predictedPrice: Math.round(predictedPrice), confidence });
});

// 4. Personalized Recommendations – Grok with fallback
app.post('/api/personalized-recs', async (req, res) => {
  const { likedProducts, preferences } = req.body;
  
  const likedNames = likedProducts.map(p => p.name).join(', ');
  const preferredCategories = preferences.categories.join(', ');
  
  const prompt = `
User has liked or bought: ${likedNames || 'nothing yet'}.
User prefers categories: ${preferredCategories || 'general'}.
Recommend 4 product names (only names, no extra text) from our catalog: 
iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, OnePlus 12, Google Pixel 8 Pro, 
Nike Air Max 270, Adidas Ultraboost, Sony WH-1000XM5, Apple AirPods Pro 2,
Basmati Rice 5kg, Fortune Oil 5L, L'Oréal Vitamin C Serum, Mamaearth Onion Oil,
Prestige Cooker, Philips Air Fryer.
Return only a JSON array of 4 product names, e.g. ["iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra", ...]
`;

  try {
    const completion = await grokClient.chat.completions.create({
      model: "grok-beta",
      messages: [
        { role: "system", content: "You are a recommendation engine. Return only valid JSON." },
        { role: "user", content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.5,
    });
    let recs = completion.choices[0].message.content;
    const match = recs.match(/\[.*\]/s);
    if (match) {
      recs = JSON.parse(match[0]);
    } else {
      throw new Error("No JSON array found");
    }
    res.json({ recommendations: recs });
  } catch (error) {
    console.error('Grok recommendations error:', error.message);
    const fallback = ["iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra", "OnePlus 12", "Google Pixel 8 Pro"];
    res.json({ recommendations: fallback });
  }
});

// 5. Semantic Search – basic
app.post('/api/semantic-search', async (req, res) => {
  res.json({ results: [] });
});

// ========== START SERVER (network accessible) ==========
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT} and accessible on your local network`);
  console.log(`   - Local:   http://localhost:${PORT}`);
  console.log(`   - Network: http://<your-ip>:${PORT}`);
});