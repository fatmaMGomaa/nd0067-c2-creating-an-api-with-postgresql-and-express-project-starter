"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, database_1.config.TOKEN_SECRET);
            if (decoded) {
                req.params.user_id = decoded.auth_user.id;
                next();
            }
            else {
                res.status(403).json({
                    message: 'faild to verify token',
                });
            }
        }
        else {
            res.status(406).json({
                message: 'No token to verify',
            });
        }
    }
    catch (err) {
        res.status(400).json({
            Error: err,
            message: 'Something went wrong with token validation',
        });
    }
};
exports.default = verifyAuthToken;
