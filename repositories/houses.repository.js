import { pool } from "../db.js";

export async function getAllHouses() {
  const result = await pool.query("SELECT * FROM houses");

  return result.rows;
}