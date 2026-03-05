import express from 'express'

import { protectedRoute } from '../middleware/authMiddleware.js';
import { chatWithAI } from '../controller/aiController.js';

const router = express.Router();

router.post("/chat-bot", protectedRoute, chatWithAI);

export default router