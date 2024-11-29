import express from 'express';
import { createOrder, getCurrentOrderByUser } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/current/:userId', authMiddleware, getCurrentOrderByUser);

export default router;
