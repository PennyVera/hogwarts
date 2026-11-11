import * as repository from "../repositories/students.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

// Get all students
export async function getAllStudents(req, res) {
  const all = await repository.getAllStudents();
  return res.status(200).json(all);
}

// Get a single student
export async function getSingleStudent(req, res) {
  const id = req.params.id;
  const single = await repository.getSingleStudent(id);

  if (single.rowCount === 0) {
    throw new HTTPError(404, "Student not found");
  }
  return res.status(200).json(single.rows[0]);
}

// Create a new student
export async function createStudent(req, res) {
  const { name, house_id, semester } = req.body;

  if (!name || !house_id || !semester) {
    throw new HTTPError(400, "Student name, house_id, and semester are required");
  }

  const createdResult = await repository.createStudent(req, res);
  return res.status(201).json(createdResult);
}

// Update a student
export async function updateStudent(req, res) {
  const { id } = req.params;
  const { name, house_id, semester } = req.body;

  if (!name || !house_id || !semester) {
    throw new HTTPError(400, "Student name, house_id, and semester are required");
  }

  const updateResult = await repository.updateStudent(id, name, house_id, semester);

  if (updateResult.rowCount === 0) {
    throw new HTTPError(404, "Student not found");
  }

  return res.status(200).json(updateResult.rows[0]);
}

// Delete a student
export async function deleteStudent(req, res) {
  const { id } = req.params;
  const deleteResult = await repository.deleteStudent(id);

  if (deleteResult.rowCount === 0) {
    throw new HTTPError(404, "Student not found");
  }
  return res.status(200).json({ message: "Student deleted successfully" });
}
