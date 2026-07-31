const db = require('../config/db');
class OrderModel {
  static async createOrderWithItems({ user_id, items, total_amount }, client = null) {
    if (db.isDbConnected() && client) {
      const orderSql = `
        INSERT INTO orders (user_id, total_amount, status)
        VALUES ($1, $2, 'COMPLETED')
        RETURNING *;
      `;
      const orderRes = await client.query(orderSql, [user_id, total_amount]);
      const order = orderRes.rows[0];
      const insertedItems = [];
      for (const item of items) {
        const itemSql = `
          INSERT INTO order_items (order_id, medicine_id, medicine_name, quantity, unit_price, subtotal)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;
        const itemRes = await client.query(itemSql, [
          order.id,
          item.medicine_id,
          item.medicine_name,
          item.quantity,
          item.unit_price,
          item.subtotal
        ]);
        insertedItems.push(itemRes.rows[0]);
      }
        order.items = insertedItems;
      return order;
    } else {
      const newOrder = {
        id: db.inMemoryDb.orderIdCounter++,
        user_id,
        total_amount: parseFloat(total_amount).toFixed(2),
        status: 'COMPLETED',
        created_at: new Date(),
        updated_at: new Date(),
        items: []
      };
      for (const item of items) {
        const newMed = {
         id: db.inMemoryDb.medicineIdCounter++,
         name,
         category,
         stock: parseInt(stock, 10),
         price: Number(price),
         low_stock_threshold: parseInt(low_stock_threshold, 10),
         description,
         created_at: new Date(),
         updated_at: new Date()
      };
        db.inMemoryDb.orderItems.push(newItem);
        newOrder.items.push(newItem);
      }
       db.inMemoryDb.orders.push(newOrder);
      return newOrder;
    }
  }
  static async findById(id) {
    const orderId = parseInt(id, 10);
    if (db.isDbConnected()) {
      const orderSql = `SELECT * FROM orders WHERE id = $1;`;
      const orderRes = await db.query(orderSql, [orderId]);
      if (orderRes.rows.length === 0) return null;
      const order = orderRes.rows[0];
      const itemsSql = `SELECT * FROM order_items WHERE order_id = $1;`;
      const itemsRes = await db.query(itemsSql, [orderId]);
      order.items = itemsRes.rows;
      return order;
    } else {
      const order = db.inMemoryDb.orders.find(o => o.id === orderId);
      if (!order) return null;
      const items = db.inMemoryDb.orderItems.filter(i => i.order_id === orderId);
      return { ...order, items };
    }
  }
}
module.exports = OrderModel;

