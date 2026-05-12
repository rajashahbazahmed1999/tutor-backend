import express from "express";


import {
  createTutor,
  getTutors,
  deleteTutor,
} from "../controllers/tutorController.js";

const router = express.Router();

router.get("/", getTutors);

router.post("/", createTutor);

router.delete("/:id", deleteTutor);

export default router;