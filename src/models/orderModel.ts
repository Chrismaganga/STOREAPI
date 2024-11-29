import pool from "../config/db";
import { Order } from "../types/Order";

export class OrderModel {
  async getCurrentByUser(userId: number): Promise<Order | null> {
    const result = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 AND status = 'active' LIMIT 1`,
      [userId]
    );
    return result.rows[0] || null;
  }

  async create(order: Order): Promise<Order> {
    const { userId, status } = order;
    const result = await pool.query(
      `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`,
      [userId, status]
    );
    return result.rows[0];
  }
}
