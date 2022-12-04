"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication_middleware"));
const store = new user_1.UserStore();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
const create = async (req, res) => {
    try {
        const p = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password_digest: req.body.password,
        };
        const added_user = await store.create(p);
        res.json(added_user);
    }
    catch (err) {
        res
            .status(400)
            .json({ Error: err, message: 'This email is already existing' });
    }
};
// const update = async (req: Request, res: Response) => {
//   try {
//     const p: User = {
//       id: parseInt(req.body.id),
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       password_digest: req.body.password,
//     };
//     const updated_user = await store.update(p);
//     res.json(updated_user);
//   } catch (err) {
//     res.status(400).json({
//       Error: err,
//       message: `Could not update user with email ${req.body.email}`,
//     });
//   }
// };
const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth_user = await store.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ auth_user }, database_1.config.TOKEN_SECRET);
        if (auth_user) {
            res.json({ ...auth_user, token });
        }
        else {
            res.status(401).json({ message: 'Not Authenticated' });
        }
    }
    catch (err) {
        res.status(401).json({
            Error: err,
            message: 'Something went wrong with authentication user',
        });
    }
};
// const destroy = async (req: Request, res: Response) => {
//   try {
//     const deleted_user = await store.delete(req.body.id);
//     res.json(deleted_user);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };
const users_routes = (app) => {
    app.get('/users', authentication_middleware_1.default, index);
    app.get('/users/:id', authentication_middleware_1.default, show);
    app.post('/users', create);
    // app.patch('/users', verifyAuthToken, update);
    // app.delete('/users', verifyAuthToken, destroy);
    app.post('/users/authenticate', authenticate);
};
exports.default = users_routes;
