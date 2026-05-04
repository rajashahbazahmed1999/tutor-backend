import express from "express";

import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

/**
 * Get all users (Admin only)
 */
router.get("/", auth, role("admin"), getUsers);

/**
 * Get single user
 */
router.get("/:id", auth, getUser);

/**
 * Update user
 */
router.put("/:id", auth, updateUser);

/**
 * Delete user (Admin only)
 */
router.delete("/:id", auth, role("admin"), deleteUser);

export default router;