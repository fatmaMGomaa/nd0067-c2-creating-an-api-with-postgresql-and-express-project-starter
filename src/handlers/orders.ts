import express, { Request, Response } from 'express';
import { OrderProduct, Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middlewares/authentication_middleware';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const orders = await store.index(user_id);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id, req.params.user_id);
    res.json(order);
  } catch (err) {
    res.status(404).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const p: Order = {
      status: 'active',
      user_id: req.params.user_id,
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

const orderProducts = async (req: Request, res: Response) => {
  try {
    const order_products = await store.orderProducts(req.params.id);
    res.json(order_products);
  } catch (err) {
    res.status(400).json({ err, message: 'error' });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const p: OrderProduct = {
      order_id: req.params.id,
      product_id: req.body.product_id,
      quantity: parseInt(req.body.quantity),
    };
    const order_product = await store.addProduct(p);
    res.json(order_product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders', verifyAuthToken, destroy);
  app.get('/orders/:id/products', verifyAuthToken, orderProducts);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default orders_routes;
