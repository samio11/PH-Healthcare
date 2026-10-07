import { z } from "zod";

export const updateDoctorSchemaZod = z.object({
  name: z.string().min(1, "Name cannot be empty").optional(),

  email: z.email("Invalid email address").optional(),

  profilePhoto: z.string().optional(),

  contactNumber: z.string().optional(),

  address: z.string().optional(),

  registrationNumber: z
    .string()
    .min(1, "Registration number cannot be empty")
    .optional(),

  experience: z.number().min(0, "Experience cannot be negative").optional(),

  gender: z.enum(["MALE", "FEMALE"]).optional(),

  appointmentFee: z
    .number()
    .min(0, "Appointment fee cannot be negative")
    .optional(),

  qualification: z.string().min(1, "Qualification cannot be empty").optional(),

  currentWorkingPlace: z
    .string()
    .min(1, "Current working place cannot be empty")
    .optional(),

  designation: z
    .string()
    .min(1, "Designation cannot be empty")
    .optional(),

  averageRating: z.number().min(0).max(5).optional(),
});