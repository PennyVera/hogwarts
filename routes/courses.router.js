import express from "express";
import * as coursesController from "../controllers/courses.controller.js";

export const coursesRouter = express.Router();

// get all courses R
coursesRouter.get("/", coursesController.getAllCourses);
// get specific course R
coursesRouter.get("/:id", coursesController.getSingleCourse);
// create new course C
coursesRouter.post("/", coursesController.createCourse);
// delete a course D
coursesRouter.delete("/:id", coursesController.deleteCourse);
// update a course U
coursesRouter.put("/:id", coursesController.updateCourse);
// change the teacher assigned to a course
coursesRouter.put("/:courseId/teacher", coursesController.updateCourseTeacher);
// add a student to a course
coursesRouter.post("/:courseId/students", coursesController.addStudentToCourse);
// remove a student from a course
coursesRouter.delete("/:courseId/students/:studentId", coursesController.removeStudentFromCourse);
