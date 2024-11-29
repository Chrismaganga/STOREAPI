"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authMiddleware);
router.post('/', userController_1.createUser);
router.post('/login', userController_1.authenticateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map