import { pool } from "../db.js";

// get all houses
export async function getAllHouses() {
  const result = await pool.query("SELECT * FROM houses");

  return result.rows;
}
// get single house
export async function getSingleHouse(id) {
  const one = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
  return one;
}
