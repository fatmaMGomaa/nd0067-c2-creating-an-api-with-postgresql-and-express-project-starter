"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication_middleware"));
const store = new order_1.OrderStore();
const index = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const orders = await store.index(user_id);
        res.json(orders);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id, req.params.user_id);
        res.json(order);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
const current = async (req, res) => {
    try {
        const order = await store.current(req.params.user_id);
        res.json(order);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
const create = async (req, res) => {
    try {
        const p = {
            status: 'active',
            user_id: req.params.user_id,
        };
        const added_order = await store.create(p);
        res.json(added_order);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted_order = await store.delete(req.body.id);
        res.json(deleted_order);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const orderProducts = async (req, res) => {
    try {
        const order_products = await store.orderProducts(req.params.id);
        res.json(order_products);
    }
    catch (err) {
        res.status(400).json({ err, message: 'error' });
    }
};
const addProduct = async (req, res) => {
    try {
        const p = {
            order_id: req.params.id,
            product_id: req.body.product_id,
            quantity: parseInt(req.body.quantity),
        };
        const order_product = await store.addProduct(p);
        res.json(order_product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const orders_routes = (app) => {
    app.get('/orders', authentication_middleware_1.default, index);
    app.get('/orders/current', authentication_middleware_1.default, current);
    app.get('/orders/:id', authentication_middleware_1.default, show);
    app.post('/orders', authentication_middleware_1.default, create);
    app.delete('/orders', authentication_middleware_1.default, destroy);
    app.get('/orders/:id/products', authentication_middleware_1.default, orderProducts);
    app.post('/orders/:id/products', authentication_middleware_1.default, addProduct);
};
exports.default = orders_routes;
