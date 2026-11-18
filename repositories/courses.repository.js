import { pool } from "../db.js";

// Get all courses
export async function getAllCourses() {
  const result = await pool.query(
    `SELECT
  c.id,
  c.name AS course,
  c.teacher_id,
  t.name AS teacher,
  c.type,
  c.level,
  c.school_year,
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
GROUP BY c.id, c.name, c.teacher_id, t.name;`,
  );

  return result.rows;
};

// Get a single course
export async function getSingleCourse(id) {
  return pool.query(
    `SELECT
  c.id,
  c.name AS course,
  c.teacher_id,
  t.name AS teacher,
  c.type,
  c.level,
  c.school_year,
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
GROUP BY c.id, c.name, c.teacher_id, t.name;`,
    [id],
  );
};

// Create a new course
export async function createCourse(course) {
  const result = await pool.query(
    "INSERT INTO courses (name, teacher_id, type, level, school_year) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [course.name, course.teacher_id, course.type, course.level, course.school_year],
  );

  const createdCourse = await getSingleCourse(result.rows[0].id);
  return createdCourse.rows[0];
};

// Update a course
export async function updateCourse(id, course) {
  const result = await pool.query(
    `UPDATE courses
     SET name = $1, teacher_id = $2, type = $3, level = $4, school_year = $5
     WHERE id = $6
     RETURNING id`,
    [course.name, course.teacher_id, course.type, course.level, course.school_year, id],
  );

  if (result.rowCount === 0) {
    return result;
  }

  return getSingleCourse(id);
};

// Change the teacher assigned to a course
export async function updateCourseTeacher(courseId, teacherId) {
  const result = await pool.query(
    `UPDATE courses
     SET teacher_id = $1
     WHERE id = $2
     RETURNING id`,
    [teacherId, courseId],
  );

  if (result.rowCount === 0) {
    return result;
  }

  return getSingleCourse(courseId);
};

// Add a student to a course
export async function addStudentToCourse(courseId, studentId) {
  const result = await pool.query(
    `INSERT INTO courses_students (course_id, student_id)
     VALUES ($1, $2)
     RETURNING course_id, student_id`,
    [courseId, studentId],
  );

  return pool.query(
    `SELECT
       cs.course_id,
       c.name AS course,
       cs.student_id,
       s.name AS student
     FROM courses_students AS cs
     JOIN courses AS c ON c.id = cs.course_id
     JOIN students AS s ON s.id = cs.student_id
     WHERE cs.course_id = $1 AND cs.student_id = $2`,
    [result.rows[0].course_id, result.rows[0].student_id],
  );
};

// Remove a student from a course
export async function removeStudentFromCourse(courseId, studentId) {
  const result = await pool.query(
    `DELETE FROM courses_students
     WHERE course_id = $1 AND student_id = $2
     RETURNING course_id, student_id`,
    [courseId, studentId],
  );

  if (result.rowCount === 0) {
    return result;
  }

  return pool.query(
    `SELECT
       $1::integer AS course_id,
       c.name AS course,
       $2::integer AS student_id,
       s.name AS student
     FROM courses AS c
     JOIN students AS s ON s.id = $2
     WHERE c.id = $1`,
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
