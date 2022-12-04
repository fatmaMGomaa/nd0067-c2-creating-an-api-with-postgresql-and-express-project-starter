"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication_middleware"));
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
const create = async (req, res) => {
    try {
        const p = {
            name: req.body.name,
            price: parseFloat(req.body.price),
        };
        const added_product = await store.create(p);
        res.json(added_product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted_product = await store.delete(req.body.id);
        res.json(deleted_product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', authentication_middleware_1.default, create);
    app.delete('/products', destroy);
};
exports.default = products_routes;
