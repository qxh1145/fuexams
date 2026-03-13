import express from 'express'
import { getAllExams } from '../controller/adminController.js';

const router = express.Router();

router.get("/all-exams",getAllExams);

export default router