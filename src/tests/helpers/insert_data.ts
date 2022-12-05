import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import { OrderProduct, Order, OrderStore } from '../../models/order';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

beforeAll(async () => {
  const new_user: User = {
    first_name: 'fatma',
    last_name: 'gomaa',
    email: 'fatmagoma@gmail.com',
    password_digest: '123456789',
  };
  await userStore.create(new_user);

  const new_product: Product = {
    name: 'pepsi',
    price: 16,
  };
  await productStore.create(new_product);

  const new_order: Order = {
    status: 'active',
    user_id: '1',
  };
  await orderStore.create(new_order);

  const new_order_product: OrderProduct = {
    order_id: '1',
    product_id: '1',
    quantity: 1,
  };
  await orderStore.addProduct(new_order_product);
});
