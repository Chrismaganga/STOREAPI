import express from 'express';
import { getAllProducts, getProductById, createProduct } from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, createProduct);

export default router;
