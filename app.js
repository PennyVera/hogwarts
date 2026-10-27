import express from "express";

import { pool } from "./db.js";
import * as housesController from "./controllers/houses.controller.js";
import * as teachersController from "./controllers/teachers.controller.js";

const app = express();
app.use(express.json());
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Root route message
app.get("/", (req, res) => {
  res.send("welcome to Hogwarts API");
});

// ---- Houses ---- //
// Get all houses R
app.get("/houses", housesController.getAllHouses);

// Get specific house R
app.get("/houses/:id", housesController.getSingleHouse);

// ---- Teachers ---- //
// Get all teachers R
app.get("/teachers", teachersController.getAllTeachers);
// Get specific teacher R
app.get("/teachers/:id", teachersController.getSingleTeacher);
// Post new teacher C
app.post("/teachers", teachersController.createTeacher);
// Put teacher U
app.put("/teachers/:id", teachersController.updateTeacher);
// Delete teacher D
app.delete("/teachers/:id", teachersController.deleteTeacher);

// ---- students ---- //
// get all students
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");

    console.table(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error", code: err.code });
  }
});

// get specific student
app.get("/students/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT * FROM students WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error" });
  }
});
