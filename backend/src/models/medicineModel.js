const db = require('../config/db');
class MedicineModel {
  static async create({ name, category, stock, price, low_stock_threshold = 10, description = '' }) {
    if (db.isDbConnected()) {
      const sql = `
        INSERT INTO medicines (name, category, stock, price, low_stock_threshold, description)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const result = await db.query(sql, [name, category, stock, price, low_stock_threshold, description]);
      return result.rows[0];
    } else {
      const newMed = {
        id: db.inMemoryDb.medicineIdCounter++,
        name,
        category,
        stock: parseInt(stock, 10),
        price: parseFloat(price).toFixed(2),
        low_stock_threshold: parseInt(low_stock_threshold, 10),
        description,
        created_at: new Date(),
        updated_at: new Date()
      };
      db.inMemoryDb.medicines.push(newMed);
      return newMed;
    }
  }
  static async findById(id, client = null) {
    const medId = parseInt(id, 10);
    if (db.isDbConnected()) {
      const queryExec = client ? client.query.bind(client) : db.query.bind(db);
      const sql = `SELECT * FROM medicines WHERE id = $1;`;
      const result = await queryExec(sql, [medId]);
      return result.rows[0] || null;
    } else {
      return db.inMemoryDb.medicines.find(m => m.id === medId) || null;
    }
  }
  static async findByIdForUpdate(id, client) {
    const medId = parseInt(id, 10);
    if (db.isDbConnected() && client) {
      const sql = `SELECT * FROM medicines WHERE id = $1 FOR UPDATE;`;
      const result = await client.query(sql, [medId]);
      return result.rows[0] || null;
    }
    return this.findById(id);
  }
  static async updateStock(id, newStock, client = null) {
    const medId = parseInt(id, 10);
    const stockVal = parseInt(newStock, 10);
    if (db.isDbConnected()) {
      const queryExec = client ? client.query.bind(client) : db.query.bind(db);
      const sql = `
        UPDATE medicines
        SET stock = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
      `;
      const result = await queryExec(sql, [stockVal, medId]);
      return result.rows[0] || null;
    } else {
      const med = db.inMemoryDb.medicines.find(m => m.id === medId);
      if (med) {
        med.stock = stockVal;
        med.updated_at = new Date();
      }
      return med || null;
    }
  }
  static async findAll(filters = {}) {
    const { category, name, minPrice, maxPrice, lowStockOnly } = filters;
    if (db.isDbConnected()) {
      let sql = `SELECT * FROM medicines WHERE 1=1`;
      const params = [];
      if (category) {
        params.push(`%${category}%`);
        sql += ` AND category ILIKE $${params.length}`;
      }
      if (name) {
        params.push(`%${name}%`);
        sql += ` AND name ILIKE $${params.length}`;
      }
      if (minPrice !== undefined && minPrice !== '') {
        params.push(parseFloat(minPrice));
        sql += ` AND price >= $${params.length}`;
      }
       if (maxPrice !== undefined && maxPrice !== '') {
        params.push(parseFloat(maxPrice));
        sql += ` AND price <= $${params.length}`;
      }
      if (lowStockOnly === true || lowStockOnly === 'true') {
        sql += ` AND stock <= low_stock_threshold`;
      }
      sql += ` ORDER BY id ASC;`;
      const result = await db.query(sql, params);
      return result.rows;
    } else {
      let items = [...db.inMemoryDb.medicines];
      if (category) {
        items = items.filter(m => m.category.toLowerCase().includes(category.toLowerCase()));
      }
      if (name) {
        items = items.filter(m => m.name.toLowerCase().includes(name.toLowerCase()));
      }
      if (minPrice !== undefined && minPrice !== '') {
        items = items.filter(m => parseFloat(m.price) >= parseFloat(minPrice));
      }
      if (maxPrice !== undefined && maxPrice !== '') {
        items = items.filter(m => parseFloat(m.price) <= parseFloat(maxPrice));
      }
      if (lowStockOnly === true || lowStockOnly === 'true') {
        items = items.filter(m => m.stock <= m.low_stock_threshold);
      }
      return items;
    }
  }

  static async findLowStock() {
    if (db.isDbConnected()) {
      const sql = `
        SELECT * FROM medicines
        WHERE stock <= low_stock_threshold
        ORDER BY stock ASC;
      `;
      const result = await db.query(sql);
      return result.rows;
    } else {
      return db.inMemoryDb.medicines.filter(m => m.stock <= m.low_stock_threshold);
    }
  }
}
module.exports = MedicineModel;