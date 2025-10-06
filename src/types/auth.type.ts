import {
  forgotPasswordStep1Schema,
  forgotPasswordStep2Schema,
  loginSchema,
  otpSchema,
  registerSchema
} from '@/schemaValidations';
import { ProfileType } from '@/types/account.type';
import z from 'zod';

export type LoginBodyType = z.infer<typeof loginSchema>;
export type RegisterBodyType = z.infer<typeof registerSchema>;
export type OtpBodyType = z.infer<typeof otpSchema>;
export type ForgotPasswordBodyType = z.infer<typeof forgotPasswordStep1Schema> &
  z.infer<typeof forgotPasswordStep2Schema>;

export type AuthStoreType = {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  profile: ProfileType | null;
  setProfile: (profile: ProfileType | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
