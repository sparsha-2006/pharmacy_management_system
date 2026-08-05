const db = require("../config/db");

class OrderModel {
  static async createOrderWithItems(
    { user_id, items, total_amount },
    client = null
  ) {
    // PostgreSQL
    if (db.isDbConnected() && client) {
      const orderSql = `
        INSERT INTO orders (user_id, total_amount, status)
        VALUES ($1, $2, 'COMPLETED')
        RETURNING *;
      `;

      const orderRes = await client.query(orderSql, [
        user_id,
        total_amount,
      ]);

      const order = orderRes.rows[0];
      const insertedItems = [];

      for (const item of items) {
        const itemSql = `
          INSERT INTO order_items
          (order_id, medicine_id, medicine_name, quantity, unit_price, subtotal)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;

        const itemRes = await client.query(itemSql, [
          order.id,
          item.medicine_id,
          item.medicine_name,
          item.quantity,
          item.unit_price,
          item.subtotal,
        ]);

        insertedItems.push(itemRes.rows[0]);
      }

      order.items = insertedItems;
      return order;
    }

    // In-memory fallback
    const newOrder = {
      id: db.inMemoryDb.orderIdCounter++,
      user_id,
      total_amount: Number(total_amount),
      status: "COMPLETED",
      created_at: new Date(),
      updated_at: new Date(),
      items: [],
    };

    for (const item of items) {
      const newItem = {
        id: db.inMemoryDb.orderItems.length + 1,
        order_id: newOrder.id,
        medicine_id: item.medicine_id,
        medicine_name: item.medicine_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.subtotal,
      };

      db.inMemoryDb.orderItems.push(newItem);
      newOrder.items.push(newItem);
    }

    db.inMemoryDb.orders.push(newOrder);

    return newOrder;
  }

  static async findById(id) {
    const orderId = parseInt(id, 10);

    if (db.isDbConnected()) {
      const orderSql = `
        SELECT *
        FROM orders
        WHERE id = $1;
      `;

      const orderRes = await db.query(orderSql, [orderId]);

      if (orderRes.rows.length === 0) return null;

      const order = orderRes.rows[0];

      const itemsSql = `
        SELECT *
        FROM order_items
        WHERE order_id = $1;
      `;

      const itemsRes = await db.query(itemsSql, [orderId]);

      order.items = itemsRes.rows;

      return order;
    }

    const order = db.inMemoryDb.orders.find(
      (o) => o.id === orderId
    );

    if (!order) return null;

    const items = db.inMemoryDb.orderItems.filter(
      (i) => i.order_id === orderId
    );

    return {
      ...order,
      items,
    };
  }

  static async getAllOrders() {
    if (db.isDbConnected()) {
      const result = await db.query(`
        SELECT *
        FROM orders
        ORDER BY created_at DESC;
      `);

      return result.rows;
    }

    return db.inMemoryDb.orders;
  }
}

module.exports = OrderModel;