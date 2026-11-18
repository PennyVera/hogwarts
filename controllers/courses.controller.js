import * as repository from "../repositories/courses.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";
import { CreateCourseDTO, UpdateCourseDTO, ChangeCourseTeacherDTO, AddStudentToCourseDTO } from "../dtos/courses.dto.js";

// Get all courses
export async function getAllCourses(req, res) {
  const all = await repository.getAllCourses();
  return res.status(200).json(all);
}

// Get a single course
export async function getSingleCourse(req, res) {
  const id = req.params.id;
  const single = await repository.getSingleCourse(id);

  if (single.rowCount === 0) {
    throw new HTTPError(404, "Course not found");
  }
  return res.status(200).json(single.rows[0]);
}

// Create a new course
export async function createCourse(req, res) {
  const course = CreateCourseDTO.parse(req.body);

  const createdResult = await repository.createCourse(course);
  return res.status(201).json(createdResult);
}

// Update a course
export async function updateCourse(req, res) {
  const { id } = req.params;
  const course = UpdateCourseDTO.parse(req.body);

  const updatedResult = await repository.updateCourse(id, course);

  if (updatedResult.rowCount === 0) {
    throw new HTTPError(404, "Course not found");
  }

  return res.status(200).json(updatedResult.rows[0]);
}

// Delete a course
export async function deleteCourse(req, res) {
  const { id } = req.params;
  const deleteResult = await repository.deleteCourse(id);

  if (deleteResult.rowCount === 0) {
    throw new HTTPError(404, "Course not found");
  }

  return res.status(200).json({ message: "Course deleted successfully" });
}

// Change the teacher assigned to a course
export async function updateCourseTeacher(req, res) {
  const { courseId } = req.params;
  const { teacher_id: teacherId } = ChangeCourseTeacherDTO.parse(req.body);

  const changeResult = await repository.updateCourseTeacher(courseId, teacherId);

  if (changeResult.rowCount === 0) {
    throw new HTTPError(404, "Course not found");
  }

  return res.status(200).json(changeResult.rows[0]);
}

// Add a student to a course
export async function addStudentToCourse(req, res) {
  const { courseId } = req.params;
  const { student_id: studentId } = AddStudentToCourseDTO.parse(req.body);

  const addResult = await repository.addStudentToCourse(courseId, studentId);
  return res.status(201).json(addResult.rows[0]);
}

// Remove a student from a course
export async function removeStudentFromCourse(req, res) {
  const { courseId, studentId } = req.params;

  const removeResult = await repository.removeStudentFromCourse(courseId, studentId);

  if (removeResult.rowCount === 0) {
    throw new HTTPError(404, "Student not found in the course");
  }

  return res.status(200).json(removeResult.rows[0]);
}
