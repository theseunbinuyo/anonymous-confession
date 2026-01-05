import express from 'express';
import { 
  getAllConfessions, 
  createConfession, 
  deleteConfession 
} from '../controllers/confessionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/api/confessions', getAllConfessions);
router.post('/api/confessions', authMiddleware, createConfession);
router.delete('/api/confessions/:id', authMiddleware, deleteConfession);

export default router;

