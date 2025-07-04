import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

export const createAuthRouter = (authController) => {
  const router = express.Router();
  router.post('/register', authController.registerUser);
  router.post('/login', authController.loginUser);
  router.post('/logout', authController.logoutUser);
  router.get('/me', protect, authController.getCurrentUser);
  return router;
};