import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  DB_NAME,
  POSTGRES_USER,
  POSTGRES_USER_PASSWORD,
  ENV,
  TEST_DB_NAME,
  PORT,
} = process.env;

export const config = {
  POSTGRES_HOST,
  DB_NAME,
  POSTGRES_USER,
  POSTGRES_USER_PASSWORD,
  ENV,
  TEST_DB_NAME,
  PORT,
};

const pool = new Pool({
  host: POSTGRES_HOST,
  database: ENV === 'test' ? TEST_DB_NAME : DB_NAME,
  user: POSTGRES_USER,
  password: POSTGRES_USER_PASSWORD,
});

export default pool;
