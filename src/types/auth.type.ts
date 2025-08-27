import {
  forgotPasswordStep1Schema,
  forgotPasswordStep2Schema,
  forgotPasswordStep3Schema,
  loginSchema,
  otpSchema,
  registerSchema
} from '@/schemaValidations';
import z from 'zod';

export type LoginBodyType = z.infer<typeof loginSchema>;
export type RegisterBodyType = z.infer<typeof registerSchema>;
export type OtpBodyType = z.infer<typeof otpSchema>;
export type ForgotPasswordStep1BodyType = z.infer<
  typeof forgotPasswordStep1Schema
>;
export type ForgotPasswordStep2BodyType = z.infer<
  typeof forgotPasswordStep2Schema
>;
export type ForgotPasswordStep3BodyType = z.infer<
  typeof forgotPasswordStep3Schema
>;
