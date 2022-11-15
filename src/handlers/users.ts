import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { config } from '../database';
import verifyAuthToken from '../middlewares/authentication_middleware';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const p: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password_digest: req.body.password,
    };
    const added_user = await store.create(p);
    res.json(added_user);
  } catch (err) {
    res
      .status(400)
      .json({ Error: err, message: 'This email is already existing' });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const p: User = {
      id: parseInt(req.body.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password_digest: req.body.password,
    };
    const updated_user = await store.update(p);
    res.json(updated_user);
  } catch (err) {
    res.status(400).json({
      Error: err,
      message: `Could not update user with email ${req.body.email}`,
    });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const auth_user = await store.authenticate(email, password);
    const token = jwt.sign(
      { auth_user },
      config.TOKEN_SECRET as unknown as string
    );
    if (auth_user) {
      res.json({ ...auth_user, token });
    } else {
      res.status(401).json({ message: 'Not Authenticated' });
    }
  } catch (err) {
    res.status(401).json({
      Error: err,
      message: 'Something went wrong with authentication user',
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted_user = await store.delete(req.body.id);
    res.json(deleted_user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.patch('/users', verifyAuthToken, update);
  app.delete('/users', verifyAuthToken, destroy);
  app.post('/users/authenticate', authenticate);
};

export default users_routes;
