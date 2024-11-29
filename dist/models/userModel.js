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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../config/db"));
class UserModel {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, password } = user;
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const result = yield db_1.default.query(`INSERT INTO users (first_name, last_name, password_hash) VALUES ($1, $2, $3) RETURNING *`, [firstName, lastName, passwordHash]);
            const _a = result.rows[0], { password_hash } = _a, userWithoutPassword = __rest(_a, ["password_hash"]);
            return userWithoutPassword;
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`SELECT * FROM users WHERE email = $1`, [email]);
            const user = result.rows[0];
            if (user && (yield bcrypt_1.default.compare(password, user.password_hash))) {
                const { password_hash } = user, userWithoutPassword = __rest(user, ["password_hash"]);
                return userWithoutPassword;
            }
            return null;
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map