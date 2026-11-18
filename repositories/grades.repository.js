import { pool } from "../db.js";

export async function getAllGrades() {
  const result = await pool.query("SELECT * FROM grades");
  return result.rows;
}
