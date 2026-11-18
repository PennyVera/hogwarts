import * as repository from "../repositories/exams.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

// Get all exams
export async function getAllExams(req, res) {
  const all = await repository.getAllExams();
  return res.status(200).json(all);
}

// Get a single exam
export async function getSingleExam(req, res) {
  const letter = req.params.letter.toUpperCase();
  const single = await repository.getSingleExam(letter);

  if (single.rowCount === 0) {
    throw new HTTPError(404, "Exam not found");
  }
  return res.status(200).json(single.rows);
}

