import express from "express";
import * as studentsController from "../controllers/students.controller.js";

export const studentsRouter = express.Router();

// get all students R
studentsRouter.get("/", studentsController.getAllStudents);
// get specific student R
studentsRouter.get("/:id", studentsController.getSingleStudent);
// create new student C
studentsRouter.post("/", studentsController.createStudent);
// delete a student D
studentsRouter.delete("/:id", studentsController.deleteStudent);
// update a student U
studentsRouter.put("/:id", studentsController.updateStudent);
