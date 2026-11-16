import * as repository from "../repositories/teachers.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";
import { CreateTeacherDTO, UpdateTeacherDTO } from "../dtos/teachers.dto.js";

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
  const teacher = CreateTeacherDTO.parse(req.body);

  const createdResult = await repository.createTeacher(teacher);
  return res.status(201).json(createdResult);
}

// Update a teacher
export async function updateTeacher(req, res) {
  const id = req.params.id;

  const teacher = UpdateTeacherDTO.parse(req.body);

  const updatedTeacher = await repository.updateTeacher(id, teacher);

  if (updatedTeacher.rowCount === 0) {
    throw new HTTPError(404, "No teacher to update");
  }

  return res.status(200).json(updatedTeacher.rows[0]);
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
