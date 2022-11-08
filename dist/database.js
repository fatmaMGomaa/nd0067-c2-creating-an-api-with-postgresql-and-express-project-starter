"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, DB_NAME = _a.DB_NAME, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_USER_PASSWORD = _a.POSTGRES_USER_PASSWORD, ENV = _a.ENV, TEST_DB_NAME = _a.TEST_DB_NAME, PORT = _a.PORT;
exports.config = {
    POSTGRES_HOST: POSTGRES_HOST,
    DB_NAME: DB_NAME,
    POSTGRES_USER: POSTGRES_USER,
    POSTGRES_USER_PASSWORD: POSTGRES_USER_PASSWORD,
    ENV: ENV,
    TEST_DB_NAME: TEST_DB_NAME,
    PORT: PORT
};
var pool = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: ENV === 'test' ? TEST_DB_NAME : DB_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_USER_PASSWORD
});
exports["default"] = pool;