import { pool } from "../db.js";

// Get all courses
export async function getAllCourses() {
  const result = await pool.query(
    `SELECT
  c.id,
  c.name AS course,
  t.name AS teacher,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'id', s.id,
      'name', s.name
    )
  ) AS students
FROM courses AS c
JOIN teachers AS t
  ON t.id = c.teacher_id
LEFT JOIN courses_students AS cs
  ON cs.course_id = c.id
LEFT JOIN students AS s
  ON s.id = cs.student_id
GROUP BY c.id, c.name, t.name;`,
  );

  return result.rows;
};

// Get a single course
export async function getSingleCourse(id) {
  return pool.query(
    `SELECT
  c.id,
  c.name AS course,
  t.name AS teacher,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'id', s.id,
      'name', s.name
    )
  ) AS students
FROM courses AS c
JOIN teachers AS t
  ON t.id = c.teacher_id
LEFT JOIN courses_students AS cs
  ON cs.course_id = c.id
LEFT JOIN students AS s
  ON s.id = cs.student_id
WHERE c.id = $1
GROUP BY c.id, c.name, t.name;`,
    [id],
  );
};

// Create a new course
export async function createCourse(course) {
  const result = await pool.query("INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *", [course.name, course.teacher_id]);

  return result.rows[0];
};

// Update a course
export async function updateCourse(id, name, teacher_id) {
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
export async function updateCourseTeacher(courseId, teacherId) {
  return pool.query(
    `UPDATE courses
     SET teacher_id = $1
     WHERE id = $2
     RETURNING *`,
    [teacherId, courseId],
  );
};

// Add a student to a course
export async function addStudentToCourse(courseId, studentId) {
  return pool.query(
    `INSERT INTO courses_students (course_id, student_id)
     VALUES ($1, $2)
     RETURNING course_id, student_id`,
    [courseId, studentId],
  );
};

// Remove a student from a course
export async function removeStudentFromCourse(courseId, studentId) {
  return pool.query(
    `DELETE FROM courses_students
     WHERE course_id = $1 AND student_id = $2
     RETURNING course_id, student_id`,
    [courseId, studentId],
  );
};

// Delete a course
export async function deleteCourse(id) {
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
