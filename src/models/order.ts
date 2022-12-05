import pool from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: string;
};

export type OrderProduct = {
  id?: number;
  order_id: string;
  product_id: string;
  quantity: number;
};

export class OrderStore {
  async index(user_id: string): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const query = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC';
      const result = await conn.query(query, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `something went wrong with fetching data from database ${error}`
      );
    }
  }

  async show(id: string, user_id: string): Promise<Order> {
    try {
      const conn = await pool.connect();
      const query = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)';
      const result = await conn.query(query, [id, user_id]);
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

  async current(user_id: string): Promise<Order> {
    try {
      const conn = await pool.connect();
      const query = `SELECT * FROM orders WHERE user_id=($1) AND status='active' ORDER BY id DESC LIMIT 1`;
      const result = await conn.query(query, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with fetching current order from database ${error}`
      );
    }
  }

  async create(new_order: Order): Promise<Order> {
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

  async delete(id: string): Promise<Order> {
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

  async addProduct(new_order_product: OrderProduct): Promise<OrderProduct> {
    const { quantity, order_id, product_id } = new_order_product;
    try {
      let order_product;
      const conn = await pool.connect();
      // checkif the product was added before to the same order
      const query =
        'SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2) LIMIT 1';
      const p = await conn.query(query, [order_id, product_id]);
      if (p.rows[0]) {
        const q = quantity + p.rows[0].quantity;
        const id = p.rows[0].id;
        const sql =
          'UPDATE order_products SET quantity=($2) WHERE id=($1) RETURNING *';
        const result = await conn.query(sql, [id, q]);
        order_product = result.rows[0];
      } else {
        const sql =
          'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
        const result = await conn.query(sql, [quantity, order_id, product_id]);
        order_product = result.rows[0];
      }
      conn.release();
      return order_product;
    } catch (err) {
      throw new Error(
        `Could not add product ${product_id} to order ${order_id}: ${err}`
      );
    }
  }

  async orderProducts(order_id: string): Promise<
    {
      name: string;
      price: number;
      order_id: string;
      product_id: string;
      quantity: number;
    }[]
  > {
    try {
      const conn = await pool.connect();
      const query = `SELECT name, price, order_id, product_id, quantity
                     FROM order_products
                     INNER JOIN products ON products.id = order_products.product_id
                     WHERE order_products.order_id = ($1)`;
      const result = await conn.query(query, [order_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not fetch order: ${order_id}'s products: ${err}`);
    }
  }
}
