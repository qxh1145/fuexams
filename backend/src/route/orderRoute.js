import { createPaymentLink, deleteOrder, getAllOrders, handlePayOSOrder, updateUser } from "../controller/paymentController.js";
import express from 'express'
import { protectedRoute } from "../middleware/authMiddleware.js";
import checkRoles from "../middleware/checkPermission.js";
import { ROLES } from "../constants/Roles.js";

const router = express.Router();

router.post('/create-order',protectedRoute, createPaymentLink);
router.post('/receive-hook', handlePayOSOrder); 
router.get('/get-all-orders',protectedRoute,checkRoles(ROLES.ADMIN), getAllOrders)
router.delete('/delete-transaction', protectedRoute, checkRoles(ROLES.ADMIN), deleteOrder)
router.put('/update-transaction', protectedRoute, checkRoles(ROLES.ADMIN), updateUser)
export default router