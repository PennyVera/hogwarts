import { pool } from "../db.js";

// Get all grades
export async function getAllExams() {
  const result = await pool.query(
    `select exams.id, exams.grade_letter, g.name as grade_name, c.name as course_name, s.name as student_name from exams
join public.students s on exams.student_id = s.id
    join public.courses c on exams.course_id = c.id
join public.grades g on exams.grade_letter = g.letter
`,
  );

  return result.rows;
}

// Get a single exam
export async function getSingleExam(letter) {
  const result = await pool.query(
    `
SELECT
  exams.id,
  exams.grade_letter,
  g.name AS grade_name,
  c.name AS course_name,
  s.name AS student_name
FROM exams
JOIN public.students s ON exams.student_id = s.id
JOIN public.courses c ON exams.course_id = c.id
JOIN public.grades g ON exams.grade_letter = g.letter
WHERE exams.grade_letter = $1`,
    [letter],
  );

  return result;
}
