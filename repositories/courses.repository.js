import { pool } from "../db.js";

// Get all courses
export const getAllCourses = async () => {
  const result = await pool.query(
    `SELECT courses.*,
            COALESCE(
              ARRAY_AGG(courses_students.student_id)
              FILTER (WHERE courses_students.student_id IS NOT NULL),
              '{}'
            ) AS student_ids
     FROM courses
     LEFT JOIN courses_students
       ON courses.id = courses_students.course_id
     GROUP BY courses.id
     ORDER BY courses.id`,
  );

  return result.rows;
};

// Get a single course
export const getSingleCourse = async (id) => {
  return pool.query(
    `SELECT courses.*,
            COALESCE(
              ARRAY_AGG(courses_students.student_id)
              FILTER (WHERE courses_students.student_id IS NOT NULL),
              '{}'
            ) AS student_ids
     FROM courses
     LEFT JOIN courses_students
       ON courses.id = courses_students.course_id
     WHERE courses.id = $1
     GROUP BY courses.id`,
    [id],
  );
};

// Create a new course
export const createCourse = async (req, res) => {
  const { name, teacher_id } = req.body;

  const result = await pool.query("INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *", [name, teacher_id]);

  return result.rows[0];
};

// Update a course
export const updateCourse = async (id, name, teacher_id) => {
  const result = await pool.query(
    `UPDATE courses
     SET name = $1, teacher_id = $2
     WHERE id = $3
     RETURNING *`,
    [name, teacher_id, id],
  );

  return result;
};

// Change the teacher assigned to a course
export const updateCourseTeacher = async (courseId, teacherId) => {
  return pool.query(
    `UPDATE courses
     SET teacher_id = $1
     WHERE id = $2
     RETURNING *`,
    [teacherId, courseId],
  );
};

// Add a student to a course
export const addStudentToCourse = async (courseId, studentId) => {
  return pool.query(
    `INSERT INTO courses_students (course_id, student_id)
     VALUES ($1, $2)
     RETURNING course_id, student_id`,
    [courseId, studentId],
  );
};

// Remove a student from a course
export const removeStudentFromCourse = async (courseId, studentId) => {
  return pool.query(
    `DELETE FROM courses_students
     WHERE course_id = $1 AND student_id = $2
     RETURNING course_id, student_id`,
    [courseId, studentId],
  );
};

// Delete a course
export const deleteCourse = async (id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM courses_students WHERE course_id = $1", [id]);
    const result = await client.query("DELETE FROM courses WHERE id = $1", [id]);

    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
