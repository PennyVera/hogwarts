import * as repository from "../repositories/students.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

// Get all students
export const getAllStudents = async (req, res) => {
  const allStudents = await repository.getAllStudents();
  res.status(200).json(allStudents);
};

// Get a single student
export const getSingleStudent = async (req, res) => {
  const id = req.params.id;
  const single = await repository.getSingleStudent(id);

  if (single.rowCount === 0) {
    throw new HTTPError(404, "Student not found");
  }
  res.status(200).json(single.rows[0]);
};

// Create a new student
export const createStudent = async (req, res) => {
  const { name, house_id, semester } = req.body;

  if (!name || house_id === undefined || semester === undefined) {
    throw new HTTPError(400, "Student name, house_id, and semester are required");
  }

  const newStudent = await repository.createStudent(req, res);
  return res.status(201).json(newStudent);
};

// Update a student
export const updateStudent = async (req, res) => {
  // Get the selected student ID and updated values from the request
  const { id } = req.params;
  const { name, house_id, semester } = req.body;
  if (!name || house_id === undefined || semester === undefined) {
    throw new HTTPError(400, "Student name, house_id, and semester are required");
  }

  const updateResult = await repository.updateStudent(id, name, house_id, semester);

  if (updateResult.rowCount === 0) {
    throw new HTTPError(404, "Student not found");
  }

  return res.status(200).json(updateResult.rows[0]);
};

// Delete a student
export const deleteStudent = async (req, res) => {
  // Get the selected student ID
  const { id } = req.params;
  const deleteResult = await repository.deleteStudent(id);
  if (deleteResult.rowCount === 0) {
    throw new HTTPError(404, "Student not found");
  }
  return res.status(200).json({ message: "Student deleted successfully" });
};
