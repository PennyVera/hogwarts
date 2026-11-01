import { pool } from "../db.js";

// get all teachers
export const getAllTeachers = async () => {
  // query the database for all teachers
  const result = await pool.query("SELECT * FROM teachers");
  // return the teachers
  console.table(result.rows);
  return result.rows;
};

// get single teacher
export const getSingleTeacher = async (id) => {
  // get the chosen teachers id
  // query the database for the teacher with that id
  const one = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);
  // return the teacher
  return one;
};

// create a new teacher
export const createTeacher = async (req, res) => {
  // get the name and house_id from the request body
  const { name, house_id } = req.body;

  // insert the new teacher into the database
  const result = await pool.query("INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *", [name, house_id]);

  // return the newly created teacher
  return result.rows[0];
};

// update a teacher
// repositories/teachers.repository.js
export const updateTeacher = async (id, name, house_id) => {
  const result = await pool.query(
    `UPDATE teachers
     SET name = $1, house_id = $2
     WHERE id = $3
     RETURNING *`,
    [name, house_id, id],
  );

  return result;
};

// delete a teacher
export const deleteTeacher = async (id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Courses can remain after their teacher is deleted, but must be unassigned first.
    await client.query("UPDATE courses SET teacher_id = NULL WHERE teacher_id = $1", [id]);
    const result = await client.query("DELETE FROM teachers WHERE id = $1", [id]);

    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
