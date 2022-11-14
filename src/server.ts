import express from 'express';
import bodyParser from 'body-parser';
import { config } from './database';
import products_routes from './handlers/products';
import users_routes from './handlers/users';
import orders_routes from './handlers/orders';

const app: express.Application = express();

app.use(bodyParser.json());

products_routes(app);
users_routes(app);
orders_routes(app);

app.listen(config.PORT, () => {
  console.log(`starting app on: ${config.PORT}`);
});
