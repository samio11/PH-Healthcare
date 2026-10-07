import { z } from "zod";

export const createDoctorSchemaZod = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),

  doctor: z.object({
    name: z.string().min(1, "Name is required"),

    email: z.email("Invalid email address"),

    profilePhoto: z.string().optional(),

    contactNumber: z.string().optional(),

    address: z.string().optional(),

    registrationNumber: z.string().min(1, "Registration number is required"),

    experience: z.number().optional(),

    gender: z.enum(["MALE", "FEMALE"]),

    appointmentFee: z.number().min(0, "Appointment fee cannot be negative"),

    qualification: z.string().min(1, "Qualification is required"),

    currentWorkingPlace: z
      .string()
      .min(1, "Current working place is required"),

    designation: z.string().min(1, "Designation is required"),

    averageRating: z
      .number()
      .min(0)
      .max(5),
  }),

  specialties: z
    .array(z.string())
    .min(1, "At least one specialty is required"),
});