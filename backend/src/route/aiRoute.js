import express from 'express'

import { protectedRoute } from '../middleware/authMiddleware.js';
import { chatWithAI, getChatByChatId, getChatHistory } from '../controller/aiController.js';

const router = express.Router();

router.post("/chat-bot", protectedRoute, chatWithAI);
router.get("/chats", protectedRoute, getChatHistory)
router.get("/chats/:chatid", protectedRoute, getChatByChatId)
export default router