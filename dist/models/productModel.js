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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const db_1 = __importDefault(require("../config/db"));
class ProductModel {
    delete(arg0) {
        throw new Error('Method not implemented.');
    }
    update(arg0, body) {
        throw new Error('Method not implemented.');
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM products');
            return result.rows;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM products WHERE id = $1', [id]);
            return result.rows[0] || null;
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, category } = product;
            const result = yield db_1.default.query(`INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *`, [name, price, category]);
            return result.rows[0];
        });
    }
}
exports.ProductModel = ProductModel;
//# sourceMappingURL=productModel.js.map