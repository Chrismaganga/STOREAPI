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
exports.getCurrentOrderByUser = exports.createOrder = void 0;
const orderModel_1 = require("../models/orderModel");
const orderModel = new orderModel_1.OrderModel();
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel.create(req.body);
    res.status(201).json(order);
});
exports.createOrder = createOrder;
const getCurrentOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const order = yield orderModel.getCurrentByUser(userId);
    if (order)
        res.json(order);
    else
        res.status(404).json({ message: 'No active order found' });
});
exports.getCurrentOrderByUser = getCurrentOrderByUser;
//# sourceMappingURL=orderController.js.map