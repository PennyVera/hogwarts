import * as studentsRepository from "../repositories/students.repository.js";

export const getAllStudents = async (req, res) => {
  // get all students from the database
  try {
    // get allStudents from studentsRepository
    const allStudents = await studentsRepository.getAllStudents();
    // return the students as json
    res.json(allStudents);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

export const getSingleStudent = async (req, res) => {
  // get the chosen students id from the request params
  try {
    // get the student from studentsRepository
    const singleStudent = await studentsRepository.getSingleStudent(req.params.id);
    // if the student does not exist, return a 404 status code
    if (singleStudent.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(singleStudent.rows[0]);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

export const createStudent = async (req, res) => {
  // get the name and house_id from the request body
  try {
    // create the new student in the database using studentsRepository
    const newStudent = await studentsRepository.createStudent(req, res);
    res.status(201).json(newStudent);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

export const deleteStudent = async (req, res) => {
  // get chosen students id
  const { id } = req.params;
  // delete the student from the database
  try {
    const result = await studentsRepository.deleteStudent(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    // return a success message
    return res.status(200).json({ message: "Student deleted successfully" });
    // return an error message
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};

export const updateStudent = async (req, res) => {
  // get chosen student id
  const { id } = req.params;
  const { name, house_id, semester } = req.body;

  try {
    const result = await studentsRepository.updateStudent(id, name, house_id, semester);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};
