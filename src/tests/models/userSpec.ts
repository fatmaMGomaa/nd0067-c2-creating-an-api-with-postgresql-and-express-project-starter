import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('testing user model', () => {
  it('checking existing of index method', () => {
    expect(store.index).toBeDefined();
  });

  it('checking existing of create method', () => {
    expect(store.create).toBeDefined();
  });

  it('checking existing of show method', () => {
    expect(store.show).toBeDefined();
  });

  it('create method should add a user with email nohagoma@gmail.com', async () => {
    const new_user: User = {
      first_name: 'noha',
      last_name: 'gomaa',
      email: 'nohagoma@gmail.com',
      password_digest: '123456789',
    };
    const result = await store.create(new_user);

    expect(result.email).toEqual('nohagoma@gmail.com');
  });

  it('show method should get user with id 1', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(1);
  });

  it('index method should list all users', async () => {
    const result = await store.index();
    expect(result).not.toEqual([]);
  });

  it('authenticate method should get user with emaill: fatmagoma@gmail.com and password: 123456789', async () => {
    const result = await store.authenticate('fatmagoma@gmail.com', '11111111');
    expect(result).toBeNull();
  });
});
