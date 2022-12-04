"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, DB_NAME, POSTGRES_USER, POSTGRES_USER_PASSWORD, ENV, TEST_DB_NAME, PORT, FRONTEND_URL, PEPPER, SALT_ROUNDS, TOKEN_SECRET, } = process.env;
exports.config = {
    POSTGRES_HOST,
    DB_NAME,
    POSTGRES_USER,
    POSTGRES_USER_PASSWORD,
    ENV,
    TEST_DB_NAME,
    PORT,
    FRONTEND_URL,
    PEPPER,
    SALT_ROUNDS,
    TOKEN_SECRET,
};
const pool = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: ENV === 'test' ? TEST_DB_NAME : DB_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_USER_PASSWORD,
});
exports.default = pool;
