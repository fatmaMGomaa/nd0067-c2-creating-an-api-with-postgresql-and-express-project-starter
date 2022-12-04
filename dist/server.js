"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const coresOptions = {
    origin: database_1.config.FRONTEND_URL,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(coresOptions));
app.use(body_parser_1.default.json());
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
app.listen(database_1.config.PORT, () => {
    console.log(`starting app on: ${database_1.config.PORT}`);
});
