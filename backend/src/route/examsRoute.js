import express from 'express'
import { getAllFolder, getAllTest } from '../controller/examsController.js';


const router = express.Router();

router.get("/exams-list", getAllTest);
router.get("/", getAllFolder);

export default router