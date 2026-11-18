import * as z from "zod";

const courseFields = {
  name: z.string(),
  teacher_id: z.int(),
  type: z.enum(["core", "elective", "extra-curricular"]),
  level: z.enum(["OWL", "NEWT"]),
  school_year: z.int().min(1).max(7),
};

function validateCourseLevel({ level, school_year }, context) {
  const validLevel = (level === "OWL" && school_year <= 5) || (level === "NEWT" && school_year >= 6);

  if (!validLevel) {
    context.addIssue({
      code: "custom",
      message: "OWL courses must be in years 1-5 and NEWT courses in years 6-7",
      path: ["level"],
    });
  }
}

export const CreateCourseDTO = z.object(courseFields).superRefine(validateCourseLevel);

export const UpdateCourseDTO = z.object(courseFields).superRefine(validateCourseLevel);

export const ChangeCourseTeacherDTO = z.object({
  teacher_id: z.int(),
});

export const AddStudentToCourseDTO = z.object({
  student_id: z.int(),
});
