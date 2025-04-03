import z from "zod";

export const registrationSchema = z.object({
  fullname: z.string().trim(),
  email: z.string().trim().email({ message: "Invalid Email" }),
  password: z
    .string()
    .trim()
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
      {
        message:
          "password must contain atleast one Uppercase, one Lowercase, one digit and one special character",
      }
    )
    .min(8, "password must contain 8 characters")
    .max(15, "Password is too long"),
});
