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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const tokenUtil_1 = require("../utils/tokenUtil");
const userModel = new userModel_1.UserModel();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.create(req.body);
    const token = (0, tokenUtil_1.generateToken)(user);
    res.status(201).json({ user, token });
});
exports.createUser = createUser;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel.authenticate(email, password);
    if (user) {
        const token = (0, tokenUtil_1.generateToken)(user);
        res.json({ user, token });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=userController.js.map