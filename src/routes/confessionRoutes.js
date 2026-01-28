import express from 'express';
import { 
  getAllConfessions, 
  createConfession, 
  deleteConfession,
  getUserConfessions
} from '../controllers/confessionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/confessions', getAllConfessions);
router.post('/confessions', authMiddleware, createConfession);
router.delete('/confessions/:id', authMiddleware, deleteConfession);
router.get('/confessions/my', authMiddleware, getUserConfessions);

export default router;