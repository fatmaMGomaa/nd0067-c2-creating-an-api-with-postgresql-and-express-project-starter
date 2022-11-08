/* Replace with your SQL commands */
CREATE TYPE order_status AS ENUM ('active', 'pending', 'completed', 'canceled');
CREATE TABLE orders (id SERIAL PRIMARY KEY, status order_status NOT Null, user_id bigint REFERENCES users(id));