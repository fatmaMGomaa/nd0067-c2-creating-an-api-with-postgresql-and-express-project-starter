import pool from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const query = 'SELECT * FROM orders';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `something went wrong with fetching data from database ${error}`
      );
    }
  }

  async show(id: string): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const query = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0] === undefined
        ? { message: 'NO order with this ID' }
        : result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with fetching order with id: ${id} from database ${error}`
      );
    }
  }
  async create(new_order: Order): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const query =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(query, [
        new_order.status,
        new_order.user_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with creating new order into the database ${error}`
      );
    }
  }

  async delete(id: string): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const query = 'DELETE FROM orders WHERE id=($1)';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with deleting order with id: ${id} from database ${error}`
      );
    }
  }
}
