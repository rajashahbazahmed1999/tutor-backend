import express from "express";

import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

import {
  createGroup,
  getGroups,
  addStudent,
  removeStudent,
  deleteGroup
} from "../controllers/groupController.js";

const router = express.Router();

/**
 * Create Group (Admin only)
 */
router.post("/", auth, role("admin"), createGroup);

/**
 * Get all groups (Admin + Students)
 */
router.get("/", auth, getGroups);

/**
 * Add student to group (Admin only)
 */
router.post("/:id/add", auth, role("admin"), addStudent);

/**
 * Remove student from group (Admin only)
 */
router.post("/:id/remove", auth, role("admin"), removeStudent);

/**
 * Delete group (Admin only)
 */
router.delete("/:id", auth, role("admin"), deleteGroup);

export default router;