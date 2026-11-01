import { pool } from "../db.js";

// Get all teachers
export const getAllTeachers = async () => {
  const result = await pool.query("SELECT * FROM teachers");
  return result.rows;
};

// Get a single teacher
export const getSingleTeacher = async (id) => {
  const one = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);
  return one;
};

// Create a new teacher
export const createTeacher = async (req, res) => {
  const { name, house_id } = req.body;

  const result = await pool.query("INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *", [name, house_id]);

  return result.rows[0];
};

// Update a teacher
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

// Delete a teacher
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
