import { Router } from 'express';

import {

  register,
  login,
  loginWithGoogle,
  getProfile,
  updateProfile,
  forgotPassword,
  updatePassword

} from '../controllers/auth.controller.js';

import {
  authMiddleware
} from '../middlewares/auth.middleware.js';

const router = Router();

// AUTH

router.post('/register', register);

router.post('/login', login);

router.post('/google', loginWithGoogle);

// PROFILE

router.get(
  '/profile',
  authMiddleware,
  getProfile
);

router.put(
  '/profile',
  authMiddleware,
  updateProfile
);

// PASSWORD

router.post(
  '/forgot-password',
  forgotPassword
);

router.put(
  '/update-password',
  authMiddleware,
  updatePassword
);


export default router;