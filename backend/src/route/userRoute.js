import express from 'express'
import { getCurrentUser } from '../controller/userController.js';

const router = express.Router();

router.get("/me", getCurrentUser);

export default router