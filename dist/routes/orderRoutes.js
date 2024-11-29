"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authMiddleware, orderController_1.createOrder);
router.get('/current/:userId', authMiddleware_1.authMiddleware, orderController_1.getCurrentOrderByUser);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map