import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Ingresa tu nombre completo"),
    email: z.string().email("Ingresa un email válido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: z.string().min(2, "Ingresa tu nombre completo"),
  phone: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
