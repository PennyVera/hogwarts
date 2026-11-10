import express from "express";
import * as controller from "../controllers/students.controller.js";

export const router = express.Router();

// get all students R
router.get("/", controller.getAllStudents);
// get specific student R
router.get("/:id", controller.getSingleStudent);
// create new student C
router.post("/", controller.createStudent);
// delete a student D
router.delete("/:id", controller.deleteStudent);
// update a student U
router.put("/:id", controller.updateStudent);
