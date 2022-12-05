import { OrderProduct, Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const userStore = new UserStore();
const productStore = new ProductStore();
const store = new OrderStore();

describe('testing order model', () => {
  beforeAll(async () => {
    const new_user: User = {
      first_name: 'amr',
      last_name: 'gomaa',
      email: 'amrgoma@gmail.com',
      password_digest: '999999',
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
    await store.create(new_order);

    const new_order_product: OrderProduct = {
      order_id: '1',
      product_id: '1',
      quantity: 1,
    };
    await store.addProduct(new_order_product);
  });

  it('checking existing of index method', () => {
    expect(store.index).toBeDefined();
  });

  it('checking existing of current method', () => {
    expect(store.current).toBeDefined();
  });

  it('checking existing of addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('checking existing of orderProducts method', () => {
    expect(store.orderProducts).toBeDefined();
  });

  it('current method should get the current active order for user_id: 1', async () => {
    const result = await store.current('1');
    expect(result.user_id).toEqual('1');
  });

  it('index method should list all orders for user_id: 1', async () => {
    const result = await store.index('1');
    expect(result).not.toEqual([]);
  });

  it('addProduct method should add product with id: 1 to order with id: 1', async () => {
    const p: OrderProduct = {
      order_id: '1',
      product_id: '1',
      quantity: 5,
    };
    const result = await store.addProduct(p);
    expect(result.product_id).toEqual('1');
  });

  it('orderProducts method should list all products for order_id: 1', async () => {
    const result = await store.orderProducts('1');
    expect(result).not.toEqual([]);
  });
});
