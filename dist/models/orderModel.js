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
exports.OrderModel = void 0;
const db_1 = __importDefault(require("../config/db"));
class OrderModel {
    getCurrentByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`SELECT * FROM orders WHERE user_id = $1 AND status = 'active' LIMIT 1`, [userId]);
            return result.rows[0] || null;
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, status } = order;
            const result = yield db_1.default.query(`INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`, [userId, status]);
            return result.rows[0];
        });
    }
}
exports.OrderModel = OrderModel;
//# sourceMappingURL=orderModel.js.map