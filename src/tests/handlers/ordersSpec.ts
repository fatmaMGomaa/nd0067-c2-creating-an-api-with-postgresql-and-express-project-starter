import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('testing orders handler endpoints', () => {
  let token = '';
  beforeAll(async () => {
    const response = await request
      .post('/users/authenticate')
      .send({ email: 'fatmagoma@gmail.com', password: '123456789' });
    if (response.body) {
      token = response.body.token;
    }
  });

  it('checking users orders index endpoint', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).not.toEqual([]);
  });

  it('checking current order endpoint for user_id: 1', async () => {
    const response = await request
      .get('/orders/current')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.status).toEqual('active');
    expect(response.body.user_id).toEqual('1');
  });
});
