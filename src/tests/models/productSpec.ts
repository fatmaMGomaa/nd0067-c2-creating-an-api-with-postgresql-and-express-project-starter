import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('testing product model', () => {
  it('checking existing of index method', () => {
    expect(store.index).toBeDefined();
  });

  it('checking existing of create method', () => {
    expect(store.create).toBeDefined();
  });

  it('checking existing of show method', () => {
    expect(store.show).toBeDefined();
  });

  it('create method should add a product with name: pizza and price: 180', async () => {
    const new_product: Product = {
      name: 'pizza',
      price: 180,
    };
    const result = await store.create(new_product);

    expect(result.name).toEqual('pizza');
  });

  it('show method should get product with id 1', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(1);
  });

  it('index method should list all products', async () => {
    const result = await store.index();
    expect(result).not.toEqual([]);
  });
});
