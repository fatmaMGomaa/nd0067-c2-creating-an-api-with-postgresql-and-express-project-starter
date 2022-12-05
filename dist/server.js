"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var database_1 = require("./database");
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = express_1.default();
var coresOptions = {
    origin: database_1.config.FRONTEND_URL,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};
app.use(cors_1.default(coresOptions));
app.use(body_parser_1.default.json());
products_1.default(app);
users_1.default(app);
orders_1.default(app);
app.listen(database_1.config.PORT, function () {
    console.log("starting app on: " + database_1.config.PORT);
});
exports.default = app;
