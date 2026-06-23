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

// Initialize the Grok client (xAI) – will fallback if no API key
const grokClient = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'expense_hub',
  waitForConnections: true,
  connectionLimit: 10,
});

// Test MySQL connection & create users table (non‑blocking)
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        category VARCHAR(100),
        price DECIMAL(10,2) NOT NULL,
        old_price DECIMAL(10,2),
        description TEXT,
        image VARCHAR(500),
        rating DECIMAL(2,1) DEFAULT 4.0,
        reviews INT DEFAULT 0,
        delivery VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Products table ready');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        items JSON,
        total DECIMAL(10,2) NOT NULL,
        status ENUM('processing','confirmed','shipped','out_for_delivery','delivered','cancelled') DEFAULT 'processing',
        payment_method VARCHAR(50),
        shipping_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✅ Orders table ready');

    // Run migration to add 'cancelled' to the ENUM if not already present
    try {
      await pool.query(`
        ALTER TABLE orders MODIFY COLUMN status ENUM('processing','confirmed','shipped','out_for_delivery','delivered','cancelled') DEFAULT 'processing'
      `);
      console.log('✅ Orders status ENUM updated/verified');
    } catch (err) {
      console.warn('⚠️ Could not alter orders status enum (it might be already updated):', err.message);
    }

    // Seeding products table
    const [existingProducts] = await pool.query('SELECT COUNT(*) as count FROM products');
    if (existingProducts[0].count === 0) {
      console.log('🌱 Seeding products into MySQL...');
      
      const seedProductNames = {
        Mobiles: [
          'iPhone 15 Pro Max', 'Samsung Galaxy S24 Ultra', 'Google Pixel 8 Pro', 'OnePlus 12', 'Xiaomi 14 Ultra',
          'Vivo X100 Pro', 'Nothing Phone (2)', 'Motorola Edge 50 Pro', 'Realme 12 Pro+', 'Poco X6 Pro',
          'Redmi Note 13 Pro', 'Samsung Galaxy A55', 'OnePlus Nord CE4', 'iPhone 15 Plus', 'Google Pixel 8a',
          'IQOO 12 5G', 'Oppo Reno 11 Pro', 'Vivo V30 Pro', 'Samsung Galaxy S23 FE', 'Motorola G84 5G',
          'Nothing Phone (2a)', 'Infinix Note 40 Pro', 'Tecno Camon 30', 'iPhone 14 Pro', 'Samsung Galaxy Fold 5'
        ],
        Fashion: [
          'Nike Air Max Sneakers', 'Adidas Ultraboost Running Shoes', "Levi's 501 Original Jeans", 'Zara Slim Fit Jacket', 'H&M Classic Fleece Hoodie',
          'Puma RS-X Retro Shoes', 'Roadster Casual Denim Shirt', 'U.S. Polo Assn. Polo T-Shirt', 'Jack & Jones Leather Jacket', 'Allen Solly Formal Shirt',
          'Woodland Waterproof Leather Boots', 'Tommy Hilfiger Casual Blazer', 'Vero Moda Women Floral Dress', 'Only Cotton Casual Top', 'Fabindia Silk Kurta',
          'Biba Anarkali Suit Set', 'W Cotton Straight Kurti', 'Crocs Classic Clogs', 'Reebok Floatride Running Shoes', 'Asics Gel-Kayano Sneakers',
          'Skechers Go Walk Shoes', 'Peter England Formal Trousers', 'Wrogn Slim Fit Jeans', 'HRX Activewear Trackpants', 'Puma ESS Training Shorts'
        ],
        Electronics: [
          'Sony WH-1000XM5 Headphones', 'Apple AirPods Pro (2nd Gen)', 'Bose QuietComfort Ultra', 'JBL Flip 6 Bluetooth Speaker', 'LG C3 55-inch OLED TV',
          'Apple iPad Pro 11-inch', 'Samsung Galaxy Tab S9', 'HP Pavilion 15 Laptop', 'ASUS ROG Strix Gaming Laptop', 'Apple MacBook Air M3',
          'Dell Inspiron 14 Thin Laptop', 'Lenovo IdeaPad 3', 'Logitech MX Master 3S Mouse', 'Keychron K2 Mechanical Keyboard', 'OnePlus Buds 3 TWS',
          'Boat Stone 1200 Speaker', 'Seagate 2TB External HDD', 'Samsung 1TB Portable SSD', 'Canon EOS R50 DSLR Camera', 'GoPro Hero 12 Black',
          'Sony Alpha 7 IV Camera', 'TP-Link Deco Mesh WiFi Router', 'Marshall Acton III Speaker', 'Sennheiser Accentum Headphones', 'Jabra Elite 4 Active Earbuds'
        ],
        Grocery: [
          'Tata Salt Lite 1kg', 'Amul Butter 500g', 'India Gate Basmati Rice 5kg', 'Fortune Kachi Ghani Mustard Oil 1L', 'Maggi 2-Minute Noodles 12-Pack',
          'Brooke Bond Red Label Tea 1kg', 'Aashirvaad Shudh Chakki Atta 10kg', 'Catch Turmeric Powder 200g', 'Everest Garam Masala 100g', 'Kellogg\'s Corn Flakes 1.2kg',
          'Saffola Gold Cooking Oil 5L', 'Dabur Honey 500g', 'Britannia Good Day Cookies 8-Pack', 'Parle-G Gluco Biscuits 800g', 'Nescafe Classic Instant Coffee 200g',
          'Surf Excel Easy Wash Detergent 5kg', 'Dettol Liquid Handwash 1.5L', 'Colgate MaxFresh Toothpaste 300g', 'Vim Dishwash Gel 2L', 'Lizol Floor Cleaner 2L',
          'Harpic Disinfectant Toilet Cleaner 1L', 'Catch Coriander Powder 200g', 'Everest Kashmiri Chilli Powder 200g', 'Tata Tea Gold 1kg', 'Daawat Rozana Super Basmati Rice 5kg'
        ],
        Beauty: [
          'L\'Oréal Paris Hyaluronic Acid Serum', 'Cetaphil Gentle Skin Cleanser', 'Nivea Soft Light Moisturiser', 'Lakmé Absolute Wet & Dry Foundation', 'Maybelline New York Fit Me Matte Poreless',
          'Sugar Cosmetics Matte Attack Lipstick', 'Neutrogena Hydro Boost Water Gel', 'The Derma Co 10% Niacinamide Serum', 'Plum Green Tea Pore Cleansing Face Wash', 'MCaffeine Naked & Raw Coffee Face Scrub',
          'Minimalist 10% Vitamin C Face Serum', 'Biotique Morning Nectar Flawless Skin Lotion', 'Mamaearth Onion Hair Fall Control Oil', 'Tresemme Keratin Smooth Shampoo', 'Dove Intense Repair Conditioner',
          'L\'Oréal Paris Total Repair 5 Hair Mask', 'WOW Skin Science Apple Cider Vinegar Wash', 'Garnier Skin Naturals Micellar Water', 'Kama Ayurveda Pure Rose Water', 'Forest Essentials Luxury Sugar Soap',
          'Himalaya Herbals Purifying Neem Face Wash', 'Colorbar Velvet Matte Lipstick', 'Maybelline Lash Sensational Mascara', 'Faces Canada Magneteyes Eyeliner', 'Sugar Cosmetics Blend The Rules Eyeshadow'
        ],
        'Home & Kitchen': [
          'Prestige Deluxe Pressure Cooker 3L', 'Philips Daily Collection Air Fryer', 'Wakefit Orthopaedic Memory Foam Mattress', 'Borosil Vision Glass Tumbler Set of 6', 'Milton Thermosteel Water Bottle 1L',
          'Bajaj Rex 500W Mixer Grinder', 'Pigeon by Stovekraft 1.5L Electric Kettle', 'Wonderchef Nutri-blend Mixer Grinder', 'Kent 1600W Induction Cooktop', 'Solimo Non-Stick Cookware Set of 3',
          'Hawkins Classic Aluminum Pressure Cooker', 'Eureka Forbes Trendy Zip Vacuum Cleaner', 'Philips Steam Iron 1440W', 'Cello H2O Stainless Steel Bottle Set', 'Kuber Industries 6-Piece Wardrobe Organiser',
          'Sleepwell Dual Comfort Mattress', 'Godrej Aer Spray Home Air Freshener', 'Bosch 13 Place Settings Dishwasher', 'Morphy Richards 30L Convection Microwave', 'Samsung 28L Convection Microwave Oven',
          'IFB 6kg Fully Automatic Washing Machine', 'Haier 258L Double Door Refrigerator', 'Crompton Solarium Care 15L Geyser', 'Havells Festiva 1200mm Ceiling Fan', 'USHA Shriram 3 Burner Gas Stove'
        ]
      };

      const seedProductImageMap = {
  // Mobiles (distinct, matching specific brands)
  'iPhone 15 Pro Max': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80',
  'Samsung Galaxy S24 Ultra': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80',
  'Google Pixel 8 Pro': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
  'OnePlus 12': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80',
  'Xiaomi 14 Ultra': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
  'Vivo X100 Pro': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80',
  'Nothing Phone (2)': 'https://images.unsplash.com/photo-1689255953335-e11ff833bcf5?w=400&q=80',
  'Motorola Edge 50 Pro': 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80',
  'Realme 12 Pro+': 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?w=400&q=80',
  'Poco X6 Pro': 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&q=80',
  'Redmi Note 13 Pro': 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80',
  'Samsung Galaxy A55': 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?w=400&q=80',
  'OnePlus Nord CE4': 'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=400&q=80',
  'iPhone 15 Plus': 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80',
  'Google Pixel 8a': 'https://images.unsplash.com/photo-1565538810643-b5abd3cb82ee?w=400&q=80',
  'IQOO 12 5G': 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80',
  'Oppo Reno 11 Pro': 'https://images.unsplash.com/photo-1533228893047-0b92c6a2b4b9?w=400&q=80',
  'Vivo V30 Pro': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  'Samsung Galaxy S23 FE': 'https://images.unsplash.com/photo-1610945415295-d9b2117943aa?w=400&q=80',
  'Motorola G84 5G': 'https://images.unsplash.com/photo-1558885561-56c2a04a72e6?w=400&q=80',
  'Nothing Phone (2a)': 'https://images.unsplash.com/photo-1689255953335-e11ff833bcf5?w=400&q=80',
  'Infinix Note 40 Pro': 'https://images.unsplash.com/photo-1529653762500-9b3898502540?w=400&q=80',
  'Tecno Camon 30': 'https://images.unsplash.com/photo-1533228893047-0b92c6a2b4b9?w=400&q=80',
  'iPhone 14 Pro': 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&q=80',
  'Samsung Galaxy Fold 5': 'https://images.unsplash.com/photo-1551645121-d1034da75057?w=400&q=80',

  // Fashion (dresses, jeans, shoes, hoodies)
  'Nike Air Max Sneakers': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  'Adidas Ultraboost Running Shoes': 'https://images.unsplash.com/photo-1587563876166-12f711d7e8b8?w=400&q=80',
  "Levi's 501 Original Jeans": 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80',
  'Zara Slim Fit Jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
  'H&M Classic Fleece Hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80',
  'Puma RS-X Retro Shoes': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80',
  'Roadster Casual Denim Shirt': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&q=80',
  'U.S. Polo Assn. Polo T-Shirt': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80',
  'Jack & Jones Leather Jacket': 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&q=80',
  'Allen Solly Formal Shirt': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
  'Woodland Waterproof Leather Boots': 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&q=80',
  'Tommy Hilfiger Casual Blazer': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
  'Vero Moda Women Floral Dress': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
  'Only Cotton Casual Top': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80',
  'Fabindia Silk Kurta': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80',
  'Biba Anarkali Suit Set': 'https://images.unsplash.com/photo-1610030470298-4c58cf3e3902?w=400&q=80',
  'W Cotton Straight Kurti': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80',
  'Crocs Classic Clogs': 'https://images.unsplash.com/photo-1603487988353-c6ecc1b3aa48?w=400&q=80',
  'Reebok Floatride Running Shoes': 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80',
  'Asics Gel-Kayano Sneakers': 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&q=80',
  'Skechers Go Walk Shoes': 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80',
  'Peter England Formal Trousers': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80',
  'Wrogn Slim Fit Jeans': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&q=80',
  'HRX Activewear Trackpants': 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&q=80',
  'Puma ESS Training Shorts': 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80',

  // Electronics (gadgets, tablets, routers, cameras)
  'Sony WH-1000XM5 Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
  'Apple AirPods Pro (2nd Gen)': 'https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=400&q=80',
  'Bose QuietComfort Ultra': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',
  'JBL Flip 6 Bluetooth Speaker': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
  'LG C3 55-inch OLED TV': 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80',
  'Apple iPad Pro 11-inch': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
  'Samsung Galaxy Tab S9': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
  'HP Pavilion 15 Laptop': 'https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?w=400&q=80',
  'ASUS ROG Strix Gaming Laptop': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80',
  'Apple MacBook Air M3': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
  'Dell Inspiron 14 Thin Laptop': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80',
  'Lenovo IdeaPad 3': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80',
  'Logitech MX Master 3S Mouse': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80',
  'Keychron K2 Mechanical Keyboard': 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80',
  'OnePlus Buds 3 TWS': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
  'Boat Stone 1200 Speaker': 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=400&q=80',
  'Seagate 2TB External HDD': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80',
  'Samsung 1TB Portable SSD': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80',
  'Canon EOS R50 DSLR Camera': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
  'GoPro Hero 12 Black': 'https://images.unsplash.com/photo-1524823902339-6141a784cbb4?w=400&q=80',
  'Sony Alpha 7 IV Camera': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
  'TP-Link Deco Mesh WiFi Router': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
  'Marshall Acton III Speaker': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80',
  'Sennheiser Accentum Headphones': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80',
  'Jabra Elite 4 Active Earbuds': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',

  // Grocery (rice, butter, oil, biscuits, coffee, cleaner)
  'Tata Salt Lite 1kg': 'https://images.unsplash.com/photo-1604882737321-e6937fd6f519?w=400&q=80',
  'Amul Butter 500g': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80',
  'India Gate Basmati Rice 5kg': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
  'Fortune Kachi Ghani Mustard Oil 1L': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
  'Maggi 2-Minute Noodles 12-Pack': 'https://images.unsplash.com/photo-1612966608967-3e2b817fa060?w=400&q=80',
  'Brooke Bond Red Label Tea 1kg': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80',
  'Aashirvaad Shudh Chakki Atta 10kg': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
  'Catch Turmeric Powder 200g': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
  'Everest Garam Masala 100g': 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=400&q=80',
  'Kellogg\'s Corn Flakes 1.2kg': 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80',
  'Saffola Gold Cooking Oil 5L': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
  'Dabur Honey 500g': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
  'Britannia Good Day Cookies 8-Pack': 'https://images.unsplash.com/photo-1558961312-50346c09988b?w=400&q=80',
  'Parle-G Gluco Biscuits 800g': 'https://images.unsplash.com/photo-1558961312-50346c09988b?w=400&q=80',
  'Nescafe Classic Instant Coffee 200g': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
  'Surf Excel Easy Wash Detergent 5kg': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
  'Dettol Liquid Handwash 1.5L': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80',
  'Colgate MaxFresh Toothpaste 300g': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80',
  'Vim Dishwash Gel 2L': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
  'Lizol Floor Cleaner 2L': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
  'Harpic Disinfectant Toilet Cleaner 1L': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
  'Catch Coriander Powder 200g': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
  'Everest Kashmiri Chilli Powder 200g': 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=400&q=80',
  'Tata Tea Gold 1kg': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80',
  'Daawat Rozana Super Basmati Rice 5kg': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',

  // Beauty (cleanser, shampoo, creams, cosmetics)
  'L\'Oréal Paris Hyaluronic Acid Serum': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  'Cetaphil Gentle Skin Cleanser': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
  'Nivea Soft Light Moisturiser': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
  'Lakmé Absolute Wet & Dry Foundation': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
  'Maybelline New York Fit Me Matte Poreless': 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=400&q=80',
  'Sugar Cosmetics Matte Attack Lipstick': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80',
  'Neutrogena Hydro Boost Water Gel': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  'The Derma Co 10% Niacinamide Serum': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  'Plum Green Tea Pore Cleansing Face Wash': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
  'MCaffeine Naked & Raw Coffee Face Scrub': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  'Minimalist 10% Vitamin C Face Serum': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  'Biotique Morning Nectar Flawless Skin Lotion': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
  'Mamaearth Onion Hair Fall Control Oil': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  'Tresemme Keratin Smooth Shampoo': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
  'Dove Intense Repair Conditioner': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
  'L\'Oréal Paris Total Repair 5 Hair Mask': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
  'WOW Skin Science Apple Cider Vinegar Wash': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
  'Garnier Skin Naturals Micellar Water': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
  'Kama Ayurveda Pure Rose Water': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80',
  'Forest Essentials Luxury Sugar Soap': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  'Himalaya Herbals Purifying Neem Face Wash': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
  'Colorbar Velvet Matte Lipstick': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80',
  'Maybelline Lash Sensational Mascara': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
  'Faces Canada Magneteyes Eyeliner': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
  'Sugar Cosmetics Blend The Rules Eyeshadow': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',

  // Home & Kitchen (cooker, airfryer, blender, bottles, sheets)
  'Prestige Deluxe Pressure Cooker 3L': 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80',
  'Philips Daily Collection Air Fryer': 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=400&q=80',
  'Wakefit Orthopaedic Memory Foam Mattress': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
  'Borosil Vision Glass Tumbler Set of 6': 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80',
  'Milton Thermosteel Water Bottle 1L': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
  'Bajaj Rex 500W Mixer Grinder': 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=400&q=80',
  'Pigeon by Stovekraft 1.5L Electric Kettle': 'https://images.unsplash.com/photo-1595228702420-b3740f7f9761?w=400&q=80',
  'Wonderchef Nutri-blend Mixer Grinder': 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=400&q=80',
  'Kent 1600W Induction Cooktop': 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80',
  'Solimo Non-Stick Cookware Set of 3': 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80',
  'Hawkins Classic Aluminum Pressure Cooker': 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80',
  'Eureka Forbes Trendy Zip Vacuum Cleaner': 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&q=80',
  'Philips Steam Iron 1440W': 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=400&q=80',
  'Cello H2O Stainless Steel Bottle Set': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
  'Kuber Industries 6-Piece Wardrobe Organiser': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80',
  'Sleepwell Dual Comfort Mattress': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
  'Godrej Aer Spray Home Air Freshener': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80',
  'Bosch 13 Place Settings Dishwasher': 'https://images.unsplash.com/photo-1585245324344-f614c2434d3d?w=400&q=80',
  'Morphy Richards 30L Convection Microwave': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80',
  'Samsung 28L Convection Microwave Oven': 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80',
  'IFB 6kg Fully Automatic Washing Machine': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
  'Haier 258L Double Door Refrigerator': 'https://images.unsplash.com/photo-1571175432247-fe03a56f36b1?w=400&q=80',
  'Crompton Solarium Care 15L Geyser': 'https://images.unsplash.com/photo-1585245324344-f614c2434d3d?w=400&q=80',
  'Havells Festiva 1200mm Ceiling Fan': 'https://images.unsplash.com/photo-1595228702420-b3740f7f9761?w=400&q=80',
  'USHA Shriram 3 Burner Gas Stove': 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80',

  // Vegetables (roots, greens, fresh farm, squash)
  'Carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
  'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
  'Tomato': 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&q=80',
  'Onion': 'https://images.unsplash.com/photo-1618519764620-7403abdbfee9?w=400&q=80',
  'Cabbage': 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&q=80',
  'Cauliflower': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ecf?w=400&q=80',
  'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
  'Cucumber': 'https://images.unsplash.com/photo-1604974244764-16248f3702c2?w=400&q=80',
  'Broccoli': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
  'Lemon': 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&q=80',
  'Ginger': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80',
  'Garlic': 'https://images.unsplash.com/photo-1555465910-31f7f20a184d?w=400&q=80',
  'Green Chilli': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=80',
  'Coriander': 'https://images.unsplash.com/photo-1588879460618-9249e7d947d1?w=400&q=80',
  'Mint': 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80',
  'Sweet Potato': 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=400&q=80',
  'Ladies Finger': 'https://images.unsplash.com/photo-1464454709131-ffd692ba94eb?w=400&q=80',
  'Brinjal': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
  'Green Peas': 'https://images.unsplash.com/photo-1587570258169-be5731b8fbf2?w=400&q=80',
  'Capsicum': 'https://images.unsplash.com/photo-1563565312871-70bf8f9c2d1b?w=400&q=80',
  'Beetroot': 'https://images.unsplash.com/photo-1528137871380-60b64d1f2b6b?w=400&q=80',
  'Radish': 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=400&q=80',
  'Pumpkin': 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80',
  'Bottle Gourd': 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&q=80',
  'Bitter Gourd': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ecf?w=400&q=80'
};

      const seedVegetablesList = [
        { en: 'Carrot', hi: 'गाजर', kn: 'ಗಜ್ಜರಿ', price: 40, oldPrice: 50, desc: 'Sweet root vegetable' },
        { en: 'Potato', hi: 'आलू', kn: 'ಆಲೂಗಡ್ಡೆ', price: 30, oldPrice: 40, desc: 'Staple tuber' },
        { en: 'Tomato', hi: 'टमाटर', kn: 'ಟೊಮೆಟೊ', price: 35, oldPrice: 45, desc: 'Juicy fruit vegetable' },
        { en: 'Onion', hi: 'प्याज', kn: 'ಈರುಳ್ಳಿ', price: 25, oldPrice: 35, desc: 'Pungent bulb' },
        { en: 'Cabbage', hi: 'पत्ता गोभी', kn: 'ಎಲೆಕೋಸು', price: 30, oldPrice: 40, desc: 'Leafy green vegetable' },
        { en: 'Cauliflower', hi: 'फूलगोभी', kn: 'ಹೂಕೋಸು', price: 45, oldPrice: 60, desc: 'Flower vegetable' },
        { en: 'Spinach', hi: 'पालक', kn: 'ಪಾಲಕ್', price: 20, oldPrice: 30, desc: 'Leafy green spinach' },
        { en: 'Cucumber', hi: 'खीरा', kn: 'ಸೌತೆಕಾಯಿ', price: 25, oldPrice: 35, desc: 'Cooling cucumber' },
        { en: 'Broccoli', hi: 'हरी फूलगोभी', kn: 'ಹಸಿರು ಹೂಕೋಸು', price: 80, oldPrice: 100, desc: 'Nutrient-dense' },
        { en: 'Lemon', hi: 'नींबू', kn: 'ನಿಂಬೆಹಣ್ಣು', price: 15, oldPrice: 20, desc: 'Tangy fresh lemon' },
        { en: 'Ginger', hi: 'अदरक', kn: 'ಶುಂಠಿ', price: 120, oldPrice: 150, desc: 'Spicy fresh ginger' },
        { en: 'Garlic', hi: 'लहसुन', kn: 'ಬೆಳ್ಳುಳ್ಳಿ', price: 100, oldPrice: 120, desc: 'Pungent garlic bulb' },
        { en: 'Green Chilli', hi: 'हरी मिर्च', kn: 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ', price: 50, oldPrice: 65, desc: 'Spicy green chillies' },
        { en: 'Coriander', hi: 'हरा धनिया', kn: 'ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು', price: 15, oldPrice: 25, desc: 'Aromatic coriander' },
        { en: 'Mint', hi: 'पुदीना', kn: 'ಪುದೀನಾ ಸೊಪ್ಪು', price: 15, oldPrice: 25, desc: 'Fresh mint leaves' },
        { en: 'Sweet Potato', hi: 'शकरकंद', kn: 'ಗೆಣಸು', price: 40, oldPrice: 55, desc: 'Sweet starchy tuber' },
        { en: 'Ladies Finger', hi: 'भिंडी', kn: 'ಬೆಂಡೆಕಾಯಿ', price: 35, oldPrice: 45, desc: 'Fresh okra' },
        { en: 'Brinjal', hi: 'बैंगन', kn: 'ಬದನೆಕಾಯಿ', price: 30, oldPrice: 40, desc: 'Fresh eggplants' },
        { en: 'Green Peas', hi: 'हरी मटर', kn: 'ಹಸಿರು ಬಟಾಣಿ', price: 60, oldPrice: 80, desc: 'Sweet green peas' },
        { en: 'Capsicum', hi: 'शिमला मिर्च', kn: 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ', price: 50, oldPrice: 70, desc: 'Crisp green bell pepper' },
        { en: 'Beetroot', hi: 'चुकंदर', kn: 'ಬೀಟ್ರೂಟ್', price: 40, oldPrice: 50, desc: 'Sweet earthy beetroot' },
        { en: 'Radish', hi: 'मूली', kn: 'ಮೂಲಂಗಿ', price: 30, oldPrice: 40, desc: 'Crisp white radish' },
        { en: 'Pumpkin', hi: 'कद्दू', kn: 'ಕುಂಬಳಕಾಯಿ', price: 25, oldPrice: 35, desc: 'Sweet yellow pumpkin' },
        { en: 'Bottle Gourd', hi: 'लौकी', kn: 'ಸೋರೆಕಾಯಿ', price: 20, oldPrice: 30, desc: 'Fresh bottle gourd' },
        { en: 'Bitter Gourd', hi: 'करेला', kn: 'ಹಾಗಲಕಾಯಿ', price: 35, oldPrice: 45, desc: 'Healthy bitter gourd' }
      ];

      const seedProducts = [];

      for (const cat of Object.keys(seedProductNames)) {
        const names = seedProductNames[cat];
        for (let i = 0; i < 25; i++) {
          const name = names[i % names.length];
          let basePrice;
          if (cat === 'Mobiles') basePrice = 12000 + i * 4000;
          else if (cat === 'Fashion') basePrice = 500 + i * 200;
          else if (cat === 'Electronics') basePrice = 1500 + i * 1500;
          else if (cat === 'Grocery') basePrice = 30 + i * 35;
          else if (cat === 'Beauty') basePrice = 200 + i * 80;
          else basePrice = 400 + i * 400;

          const uniqueName = i >= names.length ? `${name} (V${Math.floor(i / names.length) + 1})` : name;
          const oldPrice = basePrice + Math.floor(basePrice * 0.25);
          const rating = 3.8 + (i % 13) / 10;
          const reviews = 150 + i * 180;
          const delivery = cat === 'Grocery' ? '10 mins' : '1-2 days';
          const img = seedProductImageMap[name] || 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=400&q=80';

          // Calculate Best Price (minimum compared price)
          const platformKeys = ['Amazon', 'Flipkart', 'Zepto', 'Blinkit', 'BigBasket', 'Instamart'];
          const bestPlatform = platformKeys[Math.floor(Math.random() * platformKeys.length)];
          const comparePrices = platformKeys.map(platform => {
            return platform === bestPlatform
              ? Math.round(basePrice * 0.9)
              : Math.round(basePrice * (0.92 + Math.random() * 0.2));
          });
          const bestPrice = Math.min(...comparePrices);

          seedProducts.push([
            uniqueName, cat, bestPrice, oldPrice, 'Premium quality product • Selected Seller Choice',
            img, rating, reviews, delivery
          ]);
        }
      }

      for (const veg of seedVegetablesList) {
        const rating = 4 + Math.random() * 0.8;
        const reviews = Math.floor(Math.random() * 2000) + 120;
        const name = `${veg.en} (${veg.hi} / ${veg.kn})`;
        const desc = `${veg.desc} | हिंदी: ${veg.hi} | ಕನ್ನಡ: ${veg.kn}`;
        const img = seedProductImageMap[veg.en] || 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&q=80';

        // Calculate Best Price for vegetable
        const platformKeys = ['Amazon', 'Flipkart', 'Zepto', 'Blinkit', 'BigBasket', 'Instamart'];
        const bestPlatform = platformKeys[Math.floor(Math.random() * platformKeys.length)];
        const comparePrices = platformKeys.map(platform => {
          return platform === bestPlatform
            ? Math.round(veg.price * 0.9)
            : Math.round(veg.price * (0.92 + Math.random() * 0.2));
        });
        const bestPrice = Math.min(...comparePrices);

        seedProducts.push([
          name, 'Vegetables', bestPrice, veg.oldPrice, desc,
          img, rating, reviews, '10 mins - 1 day'
        ]);
      }

      // Bulk insert into MySQL
      for (const p of seedProducts) {
        await pool.query(
          'INSERT INTO products (name, category, price, old_price, description, image, rating, reviews, delivery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          p
        );
      }
      console.log(`✅ Successfully seeded ${seedProducts.length} products into MySQL!`);
    } else {
      console.log('✅ MySQL products table already populated');
    }
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
    console.log('⚠️  The server will continue, but database features will not work until you fix the connection.');
  }
})();

// ========== HEALTH CHECK (for debugging) ==========
app.get('/ping', (req, res) => {
  res.json({ status: 'alive', time: new Date().toISOString() });
});

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
      model: "grok-2-latest",   // ✅ fixed model name
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
    // Fallback rule-based
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
      model: "grok-2-latest",   // ✅ fixed model name
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

// ========== PRODUCT ROUTES ==========
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// ========== ORDER ENDPOINTS ==========
const authMiddleware = require('./routes/auth');

app.post('/api/orders', authMiddleware, async (req, res) => {
  const { items, total, paymentMethod, shippingAddress } = req.body;
  if (!items || !total) {
    return res.status(400).json({ message: 'Items and total are required' });
  }
  try {
    const orderNumber = 'BM' + Date.now().toString(36).toUpperCase();
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, order_number, items, total, payment_method, shipping_address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, orderNumber, JSON.stringify(items), total, paymentMethod || 'cod', shippingAddress || '']
    );
    res.status(201).json({
      message: 'Order placed successfully',
      order: { id: result.insertId, orderNumber, status: 'processing' }
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

app.get('/api/orders', authMiddleware, async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

app.post('/api/orders/:id/cancel', authMiddleware, async (req, res) => {
  const orderIdOrNum = req.params.id;
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? AND (id = ? OR order_number = ?)',
      [req.user.id, orderIdOrNum, orderIdOrNum]
    );
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const order = orders[0];
    if (['shipped', 'out_for_delivery', 'delivered'].includes(order.status)) {
      return res.status(400).json({ message: `Cannot cancel order in '${order.status}' status.` });
    }
    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled.' });
    }
    await pool.query(
      'UPDATE orders SET status = "cancelled" WHERE id = ?',
      [order.id]
    );
    res.json({ message: 'Order cancelled successfully', status: 'cancelled' });
  } catch (err) {
    console.error('Error cancelling order:', err);
    res.status(500).json({ message: 'Failed to cancel order' });
  }
});

// ========== START SERVER (production‑ready) ==========
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});