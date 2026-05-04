import express from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

import {
  startTrial,
  getMyTrial,
  getAllTrials,
  convertTrial
} from "../controllers/trialController.js";

const router = express.Router();

// routes
router.post("/start", auth, startTrial);
router.get("/me", auth, getMyTrial);
router.get("/", auth, role("admin"), getAllTrials);
router.post("/convert", auth, role("admin"), convertTrial);

// ✅ IMPORTANT: default export
export default router;