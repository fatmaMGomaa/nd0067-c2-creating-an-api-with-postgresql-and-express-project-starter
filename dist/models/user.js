"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserStore = void 0;
var database_1 = __importStar(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var hashing_password = function (password) {
    var salt = parseInt(database_1.config.SALT_ROUNDS);
    var hashed_password = bcrypt_1.default.hashSync("" + password + database_1.config.PEPPER, salt);
    return hashed_password;
};
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'SELECT id, email, first_name, last_name FROM users';
                        return [4 /*yield*/, conn.query(query)];
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
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'SELECT id, email, first_name, last_name FROM users WHERE id=($1)';
                        return [4 /*yield*/, conn.query(query, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0] === undefined
                                ? { message: 'NO User with this ID' }
                                : result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("something went wrong with fetching user with id: " + id + " from database " + error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.create = function (new_user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = 'INSERT INTO users (first_name, last_name, email, password_digest) VALUES($1, $2, $3, $4) RETURNING id, email, first_name, last_name';
                        return [4 /*yield*/, conn.query(query, [
                                new_user.first_name,
                                new_user.last_name,
                                new_user.email,
                                hashing_password(new_user.password_digest),
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("something went wrong with creating user " + new_user.email + " into the database " + error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // async update(updated_user: User): Promise<User> {
    //   try {
    //     const conn = await pool.connect();
    //     const query =
    //       'UPDATE users SET first_name=$2, last_name=$3, email=$4, password_digest=$5 WHERE id=$1 RETURNING id, email, first_name, last_name';
    //     const result = await conn.query(query, [
    //       updated_user.id,
    //       updated_user.first_name,
    //       updated_user.last_name,
    //       updated_user.email,
    //       hashing_password(updated_user.password_digest),
    //     ]);
    //     conn.release();
    //     return result.rows[0];
    //   } catch (error) {
    //     throw new Error(
    //       `something went wrong with updating user ${updated_user.email} into the database ${error}`
    //     );
    //   }
    // }
    // async delete(id: string): Promise<User> {
    //   try {
    //     const conn = await pool.connect();
    //     const query = 'DELETE FROM users WHERE id=($1)';
    //     const result = await conn.query(query, [id]);
    //     conn.release();
    //     return result.rows[0];
    //   } catch (error) {
    //     throw new Error(
    //       `something went wrong with deleting user with id: ${id} from database ${error}`
    //     );
    //   }
    // }
    UserStore.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE email=($1)';
                        return [4 /*yield*/, conn.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length) {
                            user = result.rows[0];
                            if (bcrypt_1.default.compareSync("" + password + database_1.config.PEPPER, user.password_digest)) {
                                return [2 /*return*/, user];
                            }
                        }
                        conn.release();
                        return [2 /*return*/, null];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Something went wrong with authentication user with email " + email);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
