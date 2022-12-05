import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('testing products handler endpoints', () => {
  let token = '';
  beforeAll(async () => {
    const response = await request
      .post('/users/authenticate')
      .send({ email: 'fatmagoma@gmail.com', password: '123456789' });
    if (response.body) {
      token = response.body.token;
    }
  });

  it('checking products index endpoint', async () => {
    const response = await request.get('/products');
    expect(response.body).not.toEqual([]);
  });

  it('checking show endpoint for product_id: 1', async () => {
    const response = await request.get('/products/1');
    expect(response.body.id).toEqual(1);
  });

  it('checking create endpoint for product_id: 1', async () => {
    const response = await request
      .post('/products')
      .send({ name: 'skirt', price: 250 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.name).toEqual('skirt');
  });
});
