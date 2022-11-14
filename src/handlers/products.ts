import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const p: Product = {
      name: req.body.name,
      price: parseFloat(req.body.price),
    };
    const added_product = await store.create(p);
    res.json(added_product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted_product = await store.delete(req.body.id);
    res.json(deleted_product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.delete('/products', destroy);
};

export default products_routes;
