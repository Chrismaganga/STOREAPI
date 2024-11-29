import pool from "../config/db";
import { Product } from "../types/Product";

export class ProductModel {
  async getAll(): Promise<Product[]> {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  }

  async getById(id: number): Promise<Product | null> {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(product: Product): Promise<Product> {
    const { name, price, category } = product;
    const result = await pool.query(
      `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *`,
      [name, price, category]
    );
    return result.rows[0];
  }
}
