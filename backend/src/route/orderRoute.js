import { createPaymentLink } from "../controller/paymentController.js";
import express from 'express'
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/create-order',protectedRoute, createPaymentLink);

export default router