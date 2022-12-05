"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var database_1 = require("../database");
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            var token = authorizationHeader.split(' ')[1];
            var decoded = jsonwebtoken_1.default.verify(token, database_1.config.TOKEN_SECRET);
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
