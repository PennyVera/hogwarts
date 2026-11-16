import * as z from "zod";

export const CreateCourseDTO = z.object({
  name: z.string(),
  teacher_id: z.int(),
});

export const UpdateCourseDTO = z.object({
  name: z.string(),
  teacher_id: z.int(),
});

export const ChangeCourseTeacherDTO = z.object({
  teacher_id: z.int(),
});

export const AddStudentToCourseDTO = z.object({
  student_id: z.int(),
});
