import { pool } from "../db.js";

// get all students
export const getAllStudents = async () => {
  // query the database for all students
  const result = await pool.query("SELECT * FROM students");
  // return the students
  return result.rows;
};

// get single student
export const getSingleStudent = async (id) => {
  // query the database for a single student
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  // return the student
  return result;
};

export const deleteStudent = async (id) => {
  // query the database to delete a single student
  const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);
  // return the result
  return result;
};

export const createStudent = async (req, res) => {
  const { name, house_id, semester } = req.body;

  const result = await pool.query("INSERT INTO students (name, semester, house_id) VALUES ($1, $2, $3) RETURNING *", [name, semester, house_id]);
  return result.rows[0];
};

export const updateStudent = async (id, name, house_id, semester) => {
  const result = await pool.query("UPDATE students SET name = $1, house_id = $2, semester = $3 WHERE id = $4 RETURNING *", [name, house_id, semester, id]);
  return result;
};
