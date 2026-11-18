import express from "express";
import * as controller from "../controllers/exams.controller.js";

export const router = express.Router();
// Get all exams R
router.get("/", controller.getAllExams);
// Get specific exam R
router.get("/:letter", controller.getSingleExam);
