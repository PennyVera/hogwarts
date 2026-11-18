import express from "express";
import * as controller from "../controllers/grades.controller.js";

export const router = express.Router();
// Get all grades R
router.get("/", controller.getAllGrades);
