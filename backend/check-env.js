const fs = require('fs');
const path = require('path');
const envPath = path.resolve(__dirname, '.env');
console.log('Loading .env from:', envPath);
if (fs.existsSync(envPath)) {
  console.log('Raw content:\n', fs.readFileSync(envPath, 'utf8'));
} else {
  console.log('.env file NOT found');
}
require('dotenv').config({ path: envPath });
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mysql = require('mysql2/promise');

async function checkEnvironment() {
  console.log("=== Environment Check ===");
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "***SET***" : "(empty)");
  console.log("DB_NAME:", process.env.DB_NAME);
  console.log("PORT:", process.env.PORT);
  
  console.log("\n=== Testing MySQL Connection ===");
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'expense_hub'
    });
    
    console.log("✅ MySQL connected successfully!");
    
    const [databases] = await connection.query('SHOW DATABASES');
    console.log("\nAvailable databases:");
    databases.forEach(db => console.log(`  - ${db.Database}`));
    
    await connection.end();
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.log("\nPossible fixes:");
    console.log("1. Make sure MySQL is running");
    console.log("2. Check your password in .env file");
    console.log("3. Create database: CREATE DATABASE expense_hub;");
  }
}

checkEnvironment();