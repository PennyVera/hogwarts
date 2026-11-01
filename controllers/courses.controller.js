import * as coursesRepository from "../repositories/courses.repository.js";

export const getAllCourses = async (req, res) => {
  // get all courses from the database
  try {
    // get allCourses from coursesRepository
    const allCourses = await coursesRepository.getAllCourses();
    // return the courses as json
    res.json(allCourses);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

export const getSingleCourse = async (req, res) => {
  // get the chosen courses id from the request params
  try {
    // get the course from coursesRepository
    const singleCourse = await coursesRepository.getSingleCourse(req.params.id);
    // if the course does not exist, return a 404 status code
    if (singleCourse.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(singleCourse.rows[0]);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

export const createCourse = async (req, res) => {
  // get the name and house_id from the request body
  try {
    // create the new course in the database using coursesRepository
    const newCourse = await coursesRepository.createCourse(req, res);
    res.status(201).json(newCourse);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

export const deleteCourse = async (req, res) => {
  // get chosen courses id
  const { id } = req.params;
  // delete the course from the database
  try {
    const result = await coursesRepository.deleteCourse(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    // return a success message
    return res.status(200).json({ message: "Course deleted successfully" });
    // return an error message
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};

export const updateCourse = async (req, res) => {
  // get chosen course id
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
