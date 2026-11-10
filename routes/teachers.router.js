import express from "express";
import * as controller from "../controllers/teachers.controller.js";

export const router = express.Router();

// Get all teachers R
router.get("/", controller.getAllTeachers);
// Get specific teacher R
router.get("/:id", controller.getSingleTeacher);
// Post new teacher C
router.post("/", controller.createTeacher);
// Put teacher U
router.put("/:id", controller.updateTeacher);
// Delete teacher D
router.delete("/:id", controller.deleteTeacher);
