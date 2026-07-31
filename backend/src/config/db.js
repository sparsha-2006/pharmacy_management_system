const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
let pool = null;
let isConnected = false;
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'pharmacy_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
};
// In-Memory Fallback DB for offline local development without PostgreSQL running
const inMemoryDb = {
  medicines: [
    { id: 1, name: 'Paracetamol 500mg', category: 'Painkiller', stock: 100, price: '5.50', low_stock_threshold: 20, description: 'Relieves pain', created_at: new Date(), updated_at: new Date() },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 50, price: '12.00', low_stock_threshold: 15, description: 'Antibiotic', created_at: new Date(), updated_at: new Date() },
    { id: 3, name: 'Ibuprofen 400mg', category: 'Painkiller', stock: 80, price: '8.25', low_stock_threshold: 10, description: 'Anti-inflammatory', created_at: new Date(), updated_at: new Date() },
    { id: 4, name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 8, price: '4.00', low_stock_threshold: 10, description: 'Allergy relief', created_at: new Date(), updated_at: new Date() },
    { id: 5, name: 'Metformin 500mg', category: 'Diabetes', stock: 5, price: '15.00', low_stock_threshold: 10, description: 'Blood sugar control', created_at: new Date(), updated_at: new Date() }
  ],
  orders: [],
  orderItems: [],
  stockAlerts: [],
  medicineIdCounter: 6,
  orderIdCounter: 1,
  orderItemIdCounter: 1,
  alertIdCounter: 1
};
const connectDb = async () => {
  try {
    pool = new Pool(dbConfig);
    const client = await pool.connect();
    isConnected = true;
    console.log(`[PostgreSQL] Connected successfully to database "${dbConfig.database}" at ${dbConfig.host}:${dbConfig.port}`);
    client.release();
    await initSchema();
  } catch (err) {
    console.warn(`[PostgreSQL Warning] Could not connect to PostgreSQL (${err.message}). Using In-Memory Database Fallback for local testing.`);
    isConnected = false;
  }
};
const initSchema = async () => {
  if (!isConnected || !pool) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS medicines (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
        price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
        low_stock_threshold INT NOT NULL DEFAULT 10 CHECK (low_stock_threshold >= 0),
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
        total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        medicine_id INT NOT NULL REFERENCES medicines(id),
        medicine_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL CHECK (quantity > 0),
        unit_price NUMERIC(10, 2) NOT NULL,
        subtotal NUMERIC(10, 2) NOT NULL
      );
CREATE TABLE IF NOT EXISTS stock_alerts (
        id SERIAL PRIMARY KEY,
        medicine_id INT NOT NULL,
        medicine_name VARCHAR(255) NOT NULL,
        current_stock INT NOT NULL,
        threshold INT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('[PostgreSQL] Database tables initialized/verified successfully.');
  } catch (err) {
    console.error('[PostgreSQL Error] Schema initialization failed:', err.message);
  }
};
const query = async (text, params) => {
  if (isConnected && pool) {
    return pool.query(text, params);
  }
  return null; // Signals services to fall back to inMemoryDb if Postgres connection is not active
};
const getClient = async () => {
  if (isConnected && pool) {
    return pool.connect();
  }
  return null;
};
const isDbConnected = () => isConnected;
module.exports = {
  connectDb,
  query,
  getClient,
  isDbConnected,
  inMemoryDb
};