"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC';
                        return [4 /*yield*/, conn.query(query, [user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("something went wrong with fetching data from database " + error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)';
                        return [4 /*yield*/, conn.query(query, [id, user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0] === undefined
                                ? { message: 'NO order with this ID' }
                                : result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("something went wrong with fetching order with id: " + id + " from database " + error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.current = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = "SELECT * FROM orders WHERE user_id=($1) AND status='active' ORDER BY id DESC LIMIT 1";
                        return [4 /*yield*/, conn.query(query, [user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("something went wrong with fetching current order from database " + error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (new_order) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
                        return [4 /*yield*/, conn.query(query, [
                                new_order.status,
                                new_order.user_id,
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("something went wrong with creating new order into the database " + error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'DELETE FROM orders WHERE id=($1)';
                        return [4 /*yield*/, conn.query(query, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("something went wrong with deleting order with id: " + id + " from database " + error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProduct = function (new_order_product) {
        return __awaiter(this, void 0, void 0, function () {
            var quantity, order_id, product_id, order_product, conn, query, p, q, id, sql, result, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        quantity = new_order_product.quantity, order_id = new_order_product.order_id, product_id = new_order_product.product_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        order_product = void 0;
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        query = 'SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2) LIMIT 1';
                        return [4 /*yield*/, conn.query(query, [order_id, product_id])];
                    case 3:
                        p = _a.sent();
                        if (!p.rows[0]) return [3 /*break*/, 5];
                        q = quantity + p.rows[0].quantity;
                        id = p.rows[0].id;
                        sql = 'UPDATE order_products SET quantity=($2) WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [id, q])];
                    case 4:
                        result = _a.sent();
                        order_product = result.rows[0];
                        return [3 /*break*/, 7];
                    case 5:
                        sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [quantity, order_id, product_id])];
                    case 6:
                        result = _a.sent();
                        order_product = result.rows[0];
                        _a.label = 7;
                    case 7:
                        conn.release();
                        return [2 /*return*/, order_product];
                    case 8:
                        err_1 = _a.sent();
                        throw new Error("Could not add product " + product_id + " to order " + order_id + ": " + err_1);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.orderProducts = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = "SELECT name, price, order_id, product_id, quantity\n                     FROM order_products\n                     INNER JOIN products ON products.id = order_products.product_id\n                     WHERE order_products.order_id = ($1)";
                        return [4 /*yield*/, conn.query(query, [order_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not fetch order: " + order_id + "'s products: " + err_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
