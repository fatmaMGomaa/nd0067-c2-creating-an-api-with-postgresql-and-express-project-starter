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
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../../models/order");
var user_1 = require("../../models/user");
var product_1 = require("../../models/product");
var userStore = new user_1.UserStore();
var productStore = new product_1.ProductStore();
var store = new order_1.OrderStore();
describe('testing order model', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var new_user, new_product, new_order, new_order_product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    new_user = {
                        first_name: 'amr',
                        last_name: 'gomaa',
                        email: 'amrgoma@gmail.com',
                        password_digest: '999999',
                    };
                    return [4 /*yield*/, userStore.create(new_user)];
                case 1:
                    _a.sent();
                    new_product = {
                        name: 'pepsi',
                        price: 16,
                    };
                    return [4 /*yield*/, productStore.create(new_product)];
                case 2:
                    _a.sent();
                    new_order = {
                        status: 'active',
                        user_id: '1',
                    };
                    return [4 /*yield*/, store.create(new_order)];
                case 3:
                    _a.sent();
                    new_order_product = {
                        order_id: '1',
                        product_id: '1',
                        quantity: 1,
                    };
                    return [4 /*yield*/, store.addProduct(new_order_product)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('checking existing of index method', function () {
        expect(store.index).toBeDefined();
    });
    it('checking existing of current method', function () {
        expect(store.current).toBeDefined();
    });
    it('checking existing of addProduct method', function () {
        expect(store.addProduct).toBeDefined();
    });
    it('checking existing of orderProducts method', function () {
        expect(store.orderProducts).toBeDefined();
    });
    it('current method should get the current active order for user_id: 1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.current('1')];
                case 1:
                    result = _a.sent();
                    expect(result.user_id).toEqual('1');
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should list all orders for user_id: 1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.index('1')];
                case 1:
                    result = _a.sent();
                    expect(result).not.toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('addProduct method should add product with id: 1 to order with id: 1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var p, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = {
                        order_id: '1',
                        product_id: '1',
                        quantity: 5,
                    };
                    return [4 /*yield*/, store.addProduct(p)];
                case 1:
                    result = _a.sent();
                    expect(result.product_id).toEqual('1');
                    return [2 /*return*/];
            }
        });
    }); });
    it('orderProducts method should list all products for order_id: 1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.orderProducts('1')];
                case 1:
                    result = _a.sent();
                    expect(result).not.toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
