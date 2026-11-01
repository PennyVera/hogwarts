import express from "express";

// import { pool } from "./db.js";
// imports controllers

// import routers
import { housesRouter } from "./routes/houses.router.js";
import { teachersRouter } from "./routes/teachers.router.js";
import { studentsRouter } from "./routes/students.router.js";
import { coursesRouter } from "./routes/courses.router.js";

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
app.use("/houses/", housesRouter);

// ---- Teachers ---- //
app.use("/teachers/", teachersRouter);

// ---- Students ---- //
app.use("/students/", studentsRouter);

// ---- Courses ---- //
app.use("/courses/", coursesRouter);
