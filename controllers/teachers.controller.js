import * as repository from "../repositories/teachers.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

// Get all teachers
export async function getAllTeachers(req, res) {
  const allTeachers = await repository.getAllTeachers();
  if (allTeachers === 0) {
    throw new HTTPError(404, "Teachers not found");
  }
  res.status(200).json(allTeachers);
}

// Get a single teacher
export async function getSingleTeacher(req, res) {
  const id = req.params.id;
  const singleTeacher = await repository.getSingleTeacher(id);

  if (singleTeacher.rows[0]) {
    res.status(200).json(singleTeacher.rows[0]);
  }
  throw new HTTPError(404, "Teacher not found");
}

// Create a new teacher
export async function createTeacher(req, res) {
  const newTeacher = await repository.createTeacher(req, res);
  res.status(201).json(newTeacher);
}

// Update a teacher
export const updateTeacher = async (req, res) => {
  // Get the selected teacher ID and updated values from the request
  const { id } = req.params;
  const { name, house_id } = req.body;

  const result = await repository.updateTeacher(id, name, house_id);

  if (result.rowCount === 0) {
    return res.sendStatus(404);
  }

  return res.status(200).json(result.rows[0]);
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  // Get the selected teacher ID
  const { id } = req.params;
  const result = await repository.deleteTeacher(id);
  if (result.rowCount === 0) {
    return res.sendStatus(404);
  }
  return res.status(200).json({ message: "Teacher deleted successfully" });
};
