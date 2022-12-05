import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('testing users handler endpoints', () => {
  let token = '';
  beforeAll(async () => {
    const response = await request
      .post('/users/authenticate')
      .send({ email: 'fatmagoma@gmail.com', password: '123456789' });
    if (response.body) {
      token = response.body.token;
    }
  });

  it('checking users index endpoint', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).not.toEqual([]);
  });

  it('checking show endpoint for user_id: 1', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.id).toEqual(1);
  });

  it('checking create endpoint', async () => {
    const response = await request.post('/users').send({
      first_name: 'radwa',
      last_name: 'gomaa',
      email: 'radwagoma@gmail.com',
      password: '55555',
    });
    expect(response.body.email).toEqual('radwagoma@gmail.com');
  });

  it('checking authenticate endpoint for user_id: 1', async () => {
    const response = await request
      .post('/users/authenticate')
      .send({ email: 'fatmagoma@gmail.com', password: '123456789' });
    expect(response.body.token).not.toEqual('');
  });
});
