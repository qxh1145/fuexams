import express from 'express'
import { getAllFolder, getAllTest } from '../controller/examsController.js';


const router = express.Router();

router.get("/exams-list", getAllTest);
router.get("/", getAllFolder);

export default router


// const { ROLES } = require('../constants/roles');
// const checkRole = require('../middleware/checkRole');

// // CHỈ Admin mới được xóa bài thi
// router.delete(
//     '/delete/:id', 
//     verifyToken, // Middleware check đăng nhập
//     checkRole([ROLES.ADMIN]), // Middleware check quyền (Sạch đẹp, dễ đọc)
//     examController.delete
// );

// // Admin và Premium được xem bài giải chi tiết
// router.get(
//     '/solution/:id',
//     verifyToken,
//     checkRole([ROLES.ADMIN, ROLES.PREMIUM]),
//     examController.getSolution
// );