import express from 'express';
import { createUser, authenticateUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createUser);
router.post('/login', authenticateUser);

export default router;