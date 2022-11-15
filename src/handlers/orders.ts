import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middlewares/authentication_middleware';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(404).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const p: Order = {
      status: 'active',
      user_id: req.body.user_id,
    };
    const added_order = await store.create(p);
    res.json(added_order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted_order = await store.delete(req.body.id);
    res.json(deleted_order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders', verifyAuthToken, destroy);
};

export default orders_routes;
