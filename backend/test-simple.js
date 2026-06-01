const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('Testing MySQL connection...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',  // Change if you have a password
      database: 'expense_hub'
    });
    
    console.log('✅ Connected to MySQL!');
    
    // Create a test table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INT PRIMARY KEY AUTO_INCREMENT,
        message VARCHAR(255)
      )
    `);
    
    console.log('✅ Table created/verified');
    
    // Insert test data
    await connection.query('INSERT INTO test_table (message) VALUES (?)', ['Hello MySQL!']);
    console.log('✅ Data inserted');
    
    // Read test data
    const [rows] = await connection.query('SELECT * FROM test_table');
    console.log('✅ Data retrieved:', rows);
    
    await connection.end();
    console.log('✅ All tests passed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nPossible solutions:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Check your password in .env file');
    console.log('3. Create database: CREATE DATABASE expense_hub;');
    console.log('4. Check if port 3306 is available');
  }
}

testConnection();