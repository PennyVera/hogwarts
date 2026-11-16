import * as z from "zod";

export const CreateStudentDTO = z.object({
  name: z.string(),
  house_id: z.int(),
  semester: z.int(),
});

export const UpdateStudentDTO = z.object({
  name: z.string(),
  house_id: z.int(),
  semester: z.int(),
});
