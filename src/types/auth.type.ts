import {
  forgotPasswordStep1Schema,
  forgotPasswordStep2Schema,
  loginSchema,
  otpSchema,
  registerSchema
} from '@/schemaValidations';
import z from 'zod';

export type LoginBodyType = z.infer<typeof loginSchema>;
export type RegisterBodyType = z.infer<typeof registerSchema>;
export type OtpBodyType = z.infer<typeof otpSchema>;
export type ForgotPasswordBodyType = z.infer<typeof forgotPasswordStep1Schema> &
  z.infer<typeof forgotPasswordStep2Schema>;
