import express from 'express';
import {
  authUser,
  authUserUsername,
  registerUser,
  updateUsername,
  updateUserProfile,
  logoutUser,
  getUserProfile
} from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

// public routes
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/login/username', authUserUsername);

// protected routes
router.post('/logout', protect, logoutUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put('/profile/username', protect, updateUsername);

export default router;