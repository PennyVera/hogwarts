import * as z from "zod";

export const CreateStudentDTO = z.object({
  name: z.string(),
  house_id: z.int(),
  semester: z.int(),
  birthday: z.iso.date().nullable().default(null),
  school_year: z.int().min(1).max(7).nullable().default(null),
});

export const UpdateStudentDTO = z.object({
  name: z.string(),
  house_id: z.int(),
  semester: z.int(),
  birthday: z.iso.date().nullable().default(null),
  school_year: z.int().min(1).max(7).nullable().default(null),
});
