import express from "express";

import * as teachersController from "../controllers/teachers.controller.js";

export const teachersRouter = express.Router();

// Get all teachers R
teachersRouter.get("/", teachersController.getAllTeachers);
// Get specific teacher R
teachersRouter.get("/:id", teachersController.getSingleTeacher);
// Post new teacher C
teachersRouter.post("/", teachersController.createTeacher);
// Put teacher U
teachersRouter.put("/:id", teachersController.updateTeacher);
// Delete teacher D
teachersRouter.delete("/:id", teachersController.deleteTeacher);
