import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {POSTGRES_HOST, DB_NAME, POSTGRES_USER, POSTGRES_USER_PASSWORD} = process.env

const pool = new Pool({host:POSTGRES_HOST, database: DB_NAME, user: POSTGRES_USER, password: POSTGRES_USER_PASSWORD})

export default pool;