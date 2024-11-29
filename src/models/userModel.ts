
import bcrypt from 'bcrypt';
import pool from "../config/db";
import { User } from "../types/User";

export class UserModel {
  async create(user: User): Promise<User> {
    const { firstName, lastName, password } = user;
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, password_hash) VALUES ($1, $2, $3) RETURNING *`,
      [firstName, lastName, passwordHash]
    );

    const { password_hash, ...userWithoutPassword } = result.rows[0];
    return userWithoutPassword;
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  }
}
