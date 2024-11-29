"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=tokenUtil.js.map