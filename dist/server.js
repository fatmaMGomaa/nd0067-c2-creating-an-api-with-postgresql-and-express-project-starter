"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = require("./database");
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
(0, products_1["default"])(app);
(0, users_1["default"])(app);
(0, orders_1["default"])(app);
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from Fatma World!');
// });
// pool.connect().then((client) => {
//   return client
//     .query('SELECT NOW()')
//     .then((res) => {
//       client.release();
//       console.log(res.rows);
//     })
//     .catch((err) => {
//       client.release();
//       console.log(err.message);
//     });
// });
app.listen(database_1.config.PORT, function () {
    console.log("starting app on: ".concat(database_1.config.PORT));
});
