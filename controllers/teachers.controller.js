import * as repository from "../repositories/teachers.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

// Get all teachers
export async function getAllTeachers(req, res) {
  const all = await repository.getAllTeachers();
  return res.status(200).json(all);
}

// Get a single teacher
export async function getSingleTeacher(req, res) {
  const id = req.params.id;
  const single = await repository.getSingleTeacher(id);

  if (single.rowCount === 0) {
    throw new HTTPError(404, "Teacher not found");
  }
  return res.status(200).json(single.rows[0]);
}

// Create a new teacher
export async function createTeacher(req, res) {
  const { name, house_id } = req.body;

  if (!name || !house_id) {
    throw new HTTPError(400, "Teacher name and house_id are required");
  }

  const createdResult = await repository.createTeacher(req, res);
  return res.status(201).json(createdResult);
}

// Update a teacher
export async function updateTeacher(req, res) {
  const id = req.params.id;
  const { name, house_id } = req.body;
  if (!name || !house_id) {
    throw new HTTPError(400, "Teacher name and house_id are required");
  }

  const updateResult = await repository.updateTeacher(id, name, house_id);

  if (updateResult.rowCount === 0) {
    throw new HTTPError(404, "Teacher not found");
  }
  return res.status(200).json(updateResult.rows[0]);
}

// Delete a teacher
export async function deleteTeacher(req, res) {
  const { id } = req.params;
  const deleteResult = await repository.deleteTeacher(id);
  if (deleteResult.rowCount === 0) {
    throw new HTTPError(404, "Teacher not found");
  }
  return res.status(200).json({ message: "Teacher deleted successfully" });
}
