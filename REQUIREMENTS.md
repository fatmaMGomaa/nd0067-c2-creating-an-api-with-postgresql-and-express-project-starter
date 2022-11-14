# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
    get "/products"
- Show 
    get "/products/:id"
- Create [token required]
    post "/products"
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
    get "/users"
- Show [token required]
    get "/users/:id"
- Create N[token required]
    post "/users"

#### Orders
- Current Order by user (args: user id)[token required]
    get "/orders?user_id=user_id"
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
    get "/orders?user_id=user_id&status=completed"

## Database Schema
#### Product
** CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100), price numeric(5, 2) NOT NULL DEFAULT 0);
-  id => SERIAL PRIMARY KEY
- name => VARCHAR(100)
- price => numeric

#### User
** CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, email VARCHAR NOT NULL, password_digest VARCHAR NOT NULL);
- id => SERIAL PRIMARY KEY
- firstName => VARCHAR(100)
- lastName => VARCHAR(100)
- email => VARCHAR
- password_digest => VARCHAR

#### Orders
**  CREATE TYPE order_status AS ENUM ('active', 'pending', 'completed', 'canceled');
CREATE TABLE orders (id SERIAL PRIMARY KEY, status order_status NOT Null, user_id bigint REFERENCES users(id));
- id => SERIAL PRIMARY KEY
- user_id => bigint foreign_key
- status of order (active or complete) => Enum

#### OrderProducts
** CREATE TABLE order_products ( id SERIAL PRIMARY KEY, quantity integer, order_id bigint REFERENCES orders(id), product_id bigint REFERENCES products(id) );
- id => SERIAL PRIMARY KEY
- product_id => bigint foreign_key
- order_id => bigint foreign_key
- product_quantity => integer
