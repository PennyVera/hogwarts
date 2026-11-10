import express from "express";
import * as controller from "../controllers/courses.controller.js";

export const router = express.Router();

// get all courses R
router.get("/", controller.getAllCourses);
// get specific course R
router.get("/:id", controller.getSingleCourse);
// create new course C
router.post("/", controller.createCourse);
// delete a course D
router.delete("/:id", controller.deleteCourse);
// update a course U
router.put("/:id", controller.updateCourse);
// change the teacher assigned to a course
router.put("/:courseId/teacher", controller.updateCourseTeacher);
// add a student to a course
router.post("/:courseId/students", controller.addStudentToCourse);
// remove a student from a course
router.delete("/:courseId/students/:studentId", controller.removeStudentFromCourse);
