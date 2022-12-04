"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importStar(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashing_password = (password) => {
    const salt = parseInt(database_1.config.SALT_ROUNDS);
    const hashed_password = bcrypt_1.default.hashSync(`${password}${database_1.config.PEPPER}`, salt);
    return hashed_password;
};
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const query = 'SELECT id, email, first_name, last_name FROM users';
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`something went wrong with fetching data from database ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const query = 'SELECT id, email, first_name, last_name FROM users WHERE id=($1)';
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows[0] === undefined
                ? { message: 'NO User with this ID' }
                : result.rows[0];
        }
        catch (error) {
            throw new Error(`something went wrong with fetching user with id: ${id} from database ${error}`);
        }
    }
    async create(new_user) {
        try {
            const conn = await database_1.default.connect();
            const query = 'INSERT INTO users (first_name, last_name, email, password_digest) VALUES($1, $2, $3, $4) RETURNING id, email, first_name, last_name';
            const result = await conn.query(query, [
                new_user.first_name,
                new_user.last_name,
                new_user.email,
                hashing_password(new_user.password_digest),
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`something went wrong with creating user ${new_user.email} into the database ${error}`);
        }
    }
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
    async authenticate(email, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE email=($1)';
            const result = await conn.query(sql, [email]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(`${password}${database_1.config.PEPPER}`, user.password_digest)) {
                    return user;
                }
            }
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`Something went wrong with authentication user with email ${email}`);
        }
    }
}
exports.UserStore = UserStore;
