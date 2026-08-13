const { Pool: PgPool } = require('pg');
const mysql = require('mysql2/promise');
require('dotenv').config();

const hasPgConfig = !!(process.env.DATABASE_URL || (process.env.PGHOST && process.env.PGHOST !== 'localhost'));
const mode = hasPgConfig ? 'postgres' : 'mysql';

let pgPool = null;
let mysqlPool = null;

if (mode === 'postgres') {
  const connectionString = process.env.DATABASE_URL;
  const poolConfig = connectionString
    ? {
        connectionString,
        ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false }
      }
    : {
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT || 5432),
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || '',
        database: process.env.PGDATABASE || 'expense_hub',
        ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
      };
  pgPool = new PgPool(poolConfig);
  console.log('📦 Database Driver: PostgreSQL (Cloud/Remote)');
} else {
  mysqlPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || 3307),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'expense_hub',
    waitForConnections: true,
    connectionLimit: 10,
  });
  console.log('📦 Database Driver: MySQL (Local Port ' + (process.env.DB_PORT || 3307) + ')');
}

function convertSqlToPg(sql) {
  let paramIndex = 1;
  let converted = sql.replace(/\?/g, () => `$${paramIndex++}`);
  if (/^\s*INSERT\s+INTO\s+/i.test(converted) && !/RETURNING/i.test(converted)) {
    converted += ' RETURNING id';
  }
  return converted;
}

const db = {
  mode,
  async query(sql, params = []) {
    if (mode === 'postgres' && pgPool) {
      const pgSql = convertSqlToPg(sql);
      const result = await pgPool.query(pgSql, params);
      const insertId = result.rows && result.rows[0] && result.rows[0].id ? result.rows[0].id : null;
      const resObject = {
        ...result,
        insertId,
        affectedRows: result.rowCount || 0
      };
      return [result.rows, resObject];
    } else {
      return await mysqlPool.query(sql, params);
    }
  }
};

module.exports = db;