import pool from '../database';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password_digest: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await pool.connect();
      const query = 'SELECT * FROM users';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `something went wrong with fetching data from database ${error}`
      );
    }
  }

  async show(id: string): Promise<User[]> {
    try {
      const conn = await pool.connect();
      const query = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0] === undefined
        ? { message: 'NO User with this ID' }
        : result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with fetching user with id: ${id} from database ${error}`
      );
    }
  }
  async create(new_user: User): Promise<User[]> {
    try {
      const conn = await pool.connect();
      const query =
        'INSERT INTO users (first_name, last_name, email, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(query, [
        new_user.first_name,
        new_user.last_name,
        new_user.email,
        new_user.password_digest,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with creating user ${new_user.email} into the database ${error}`
      );
    }
  }

  async delete(id: string): Promise<User[]> {
    try {
      const conn = await pool.connect();
      const query = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong with deleting user with id: ${id} from database ${error}`
      );
    }
  }
}
