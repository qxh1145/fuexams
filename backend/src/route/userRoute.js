import express from "express";
import { deleteUser, getAllUser, getCurrentUser, updateUser } from "../controller/userController.js";
import checkRoles from "../middleware/checkPermission.js";
import { ROLES } from "../constants/Roles.js";

const router = express.Router();

router.get("/me", getCurrentUser);
router.get("/all-user", checkRoles([ROLES.ADMIN]), getAllUser);
router.delete("/delete-user/:id", checkRoles([ROLES.ADMIN]), deleteUser)
router.put("/update-user/:id", checkRoles([ROLES.ADMIN]), updateUser)

export default router;
