import * as repository from "../repositories/courses.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

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
  const { name, teacher_id } = req.body;

  if (!name || !teacher_id) {
    throw new HTTPError(400, "Course name and teacher_id are required");
  }

  const createdResult = await repository.createCourse(req, res);
  return res.status(201).json(createdResult);
}

// Update a course
export async function updateCourse(req, res) {
  const { id } = req.params;
  const { name, teacher_id } = req.body;

  if (!name || !teacher_id) {
    throw new HTTPError(400, "Course name and teacher_id are required");
  }

  const updatedResult = await repository.updateCourse(id, name, teacher_id);

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
  const { teacher_id: teacherId } = req.body;

  if (!courseId || !teacherId) {
    throw new HTTPError(400, "Course ID and teacher_id are required");
  }

  const changeResult = await repository.updateCourseTeacher(courseId, teacherId);

  if (changeResult.rowCount === 0) {
    throw new HTTPError(404, "Course not found");
  }

  return res.status(200).json(changeResult.rows[0]);
}

// Add a student to a course
export async function addStudentToCourse(req, res) {
  const { courseId } = req.params;
  const { student_id: studentId } = req.body;

  if (!courseId || !studentId) {
    throw new HTTPError(400, "Course ID and student_id are required");
  }

  const addResult = await repository.addStudentToCourse(courseId, studentId);
  return res.status(201).json(addResult.rows[0]);
}

// Remove a student from a course
export async function removeStudentFromCourse(req, res) {
  const { courseId, studentId } = req.params;

  if (!courseId || !studentId) {
    throw new HTTPError(400, "Course ID and student ID are required");
  }

  const removeResult = await repository.removeStudentFromCourse(courseId, studentId);

  if (removeResult.rowCount === 0) {
    throw new HTTPError(404, "Student not found in the course");
  }

  return res.status(200).json(removeResult.rows[0]);
}
