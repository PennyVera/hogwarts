import * as repository from "../repositories/students.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";
import { CreateStudentDTO, UpdateStudentDTO } from "../dtos/students.dto.js";

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
  const student = CreateStudentDTO.parse(req.body);

  const createdResult = await repository.createStudent(student);
  return res.status(201).json(createdResult);
}

// Update a student
export async function updateStudent(req, res) {
  const id = req.params.id;
  const student = UpdateStudentDTO.parse(req.body);

  const updateResult = await repository.updateStudent(id, student);

  if (updateResult.rowCount === 0) {
    throw new HTTPError(404, "Student not found");
  }

  return res.status(200).json(updateResult.rows[0]);
}

// Delete a student
export async function deleteStudent(req, res) {
  const id = req.params.id;
  const deleteResult = await repository.deleteStudent(id);

  if (deleteResult.rowCount === 0) {
    throw new HTTPError(404, "Student not found");
  }
  return res.status(200).json({ message: "Student deleted successfully" });
}
