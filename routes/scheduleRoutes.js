import express from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

import {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule
} from "../controllers/scheduleController.js";

const router = express.Router();

/**
 * @route   POST /api/schedules
 * @desc    Create new schedule (Admin only)
 */
router.post("/", auth, role("admin"), createSchedule);

/**
 * @route   GET /api/schedules
 * @desc    Get all schedules (Admin + Students)
 */
router.get("/", auth, getSchedules);

/**
 * @route   GET /api/schedules/:id
 * @desc    Get single schedule
 */
router.get("/:id", auth, getScheduleById);

/**
 * @route   PUT /api/schedules/:id
 * @desc    Update schedule (Admin only)
 */
router.put("/:id", auth, role("admin"), updateSchedule);

/**
 * @route   DELETE /api/schedules/:id
 * @desc    Delete schedule (Admin only)
 */
router.delete("/:id", auth, role("admin"), deleteSchedule);

export default router;