import pool from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await pool.connect();
      const query = 'SELECT * FROM products';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `something went wrong with fetching data from database ${error}`
      );
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await pool.connect();
      const query = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0] === undefined
        ? { message: 'NO product with this ID' }
        : result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with fetching product with id: ${id} from database ${error}`
      );
    }
  }
  async create(new_product: Product): Promise<Product> {
    try {
      const conn = await pool.connect();
      const query =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(query, [
        new_product.name,
        new_product.price,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with creating product ${new_product.name} into the database ${error}`
      );
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const conn = await pool.connect();
      const query = 'DELETE FROM products WHERE id=($1)';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with deleting product with id: ${id} from database ${error}`
      );
    }
  }
}
