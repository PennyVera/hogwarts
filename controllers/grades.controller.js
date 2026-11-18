import * as repository from "../repositories/grades.repository.js";

// Get all grades
export async function getAllGrades(req, res) {
  const all = await repository.getAllGrades();
  return res.status(200).json(all);
}
