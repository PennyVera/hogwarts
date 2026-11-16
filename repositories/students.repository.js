import { pool } from "../db.js";

// get all students
export async function getAllStudents() {
  // query the database for all students
  const result = await pool.query(
    `SELECT students.id, students.name, students.house_id, houses.name AS house, students.semester
     FROM students
     LEFT JOIN houses ON students.house_id = houses.id`,
  );
  // return the students
  return result.rows;
};

// get single student
export async function getSingleStudent(id) {
  // query the database for a single student
  const result = await pool.query(
    `SELECT students.id, students.name, students.house_id, houses.name AS house, students.semester
     FROM students
     LEFT JOIN houses ON students.house_id = houses.id
     WHERE students.id = $1`,
    [id],
  );
  // return the student
  return result;
};

export async function deleteStudent(id) {
  // query the database to delete a single student
  const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);
  // return the result
  return result;
};

export async function createStudent(student) {
  const result = await pool.query(
    "INSERT INTO students (name, semester, house_id) VALUES ($1, $2, $3) RETURNING id",
    [student.name, student.semester, student.house_id],
  );
  const createdStudent = await getSingleStudent(result.rows[0].id);
  return createdStudent.rows[0];
};

export async function updateStudent(id, student) {
  const result = await pool.query(
    "UPDATE students SET name = $1, house_id = $2, semester = $3 WHERE id = $4 RETURNING id",
    [student.name, student.house_id, student.semester, id],
  );

  if (result.rowCount === 0) {
    return result;
  }

  return getSingleStudent(id);
};
