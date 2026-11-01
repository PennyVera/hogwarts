import * as coursesRepository from "../repositories/courses.repository.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await coursesRepository.getAllCourses();
    res.json(allCourses);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Get a single course
export const getSingleCourse = async (req, res) => {
  try {
    const singleCourse = await coursesRepository.getSingleCourse(req.params.id);
    if (singleCourse.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(singleCourse.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Create a new course
export const createCourse = async (req, res) => {
  // The request body contains the course name and teacher ID.
  try {
    const newCourse = await coursesRepository.createCourse(req, res);
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  // Get the selected course ID
  const { id } = req.params;
  try {
    const result = await coursesRepository.deleteCourse(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  // Get the selected course ID and updated values from the request
  const { id } = req.params;
  const { name, teacher_id } = req.body;

  try {
    const result = await coursesRepository.updateCourse(id, name, teacher_id);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};

// Change the teacher assigned to a course
export const updateCourseTeacher = async (req, res) => {
  const { courseId } = req.params;
  const { teacher_id: teacherId } = req.body;

  try {
    const result = await coursesRepository.updateCourseTeacher(courseId, teacherId);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(err.code === "23503" ? 404 : 500).json({
      error: err.code === "23503" ? "teacher not found" : "database error",
      code: err.code,
    });
  }
};

// Add a student to a course
export const addStudentToCourse = async (req, res) => {
  const { courseId } = req.params;
  const { student_id: studentId } = req.body;

  try {
    const result = await coursesRepository.addStudentToCourse(courseId, studentId);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    const status = err.code === "23503" ? 404 : err.code === "23505" ? 409 : 500;
    return res.status(status).json({
      error: status === 404 ? "course or student not found" : status === 409 ? "student is already enrolled" : "database error",
      code: err.code,
    });
  }
};

// Remove a student from a course
export const removeStudentFromCourse = async (req, res) => {
  const { courseId, studentId } = req.params;

  try {
    const result = await coursesRepository.removeStudentFromCourse(courseId, studentId);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};
