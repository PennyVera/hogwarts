import { pool } from "../db.js";

// Get all teachers
export async function getAllTeachers() {
  const result = await pool.query(
    /*sql*/
    `SELECT teachers.id, teachers.name, houses.name AS house
  FROM teachers 
  LEFT JOIN houses 
  ON teachers.house_id = houses.id`,
  );
  return result.rows;
};

// Get a single teacher
export async function getSingleTeacher(id) {
  const one = await pool.query(
    /*sql*/
    `SELECT teachers.id, teachers.name, houses.name AS house 
  FROM teachers 
  LEFT JOIN houses 
  ON teachers.house_id = houses.id 
  WHERE teachers.id = $1`,
    [id],
  );
  return one;
};

// Create a new teacher
export async function createTeacher(teacher) {
  const result = await pool.query("INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *", [teacher.name, teacher.house_id]);

  return result.rows[0];
};

// Update a teacher
export async function updateTeacher(id, teacher) {
  const result = await pool.query(
    `UPDATE teachers
     SET name = $1, house_id = $2
     WHERE id = $3
     RETURNING *`,
    [teacher.name, teacher.house_id, id],
  );

  if (result.rowCount === 0) {
    return result;
  }

  return getSingleTeacher(id);
};

// Delete a teacher
export async function deleteTeacher(id) {
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
