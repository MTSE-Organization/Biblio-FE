import {
  forgotPasswordStep1Schema,
  forgotPasswordStep2Schema,
  loginSchema,
  otpSchema,
  registerSchema
} from '@/schemaValidations';
import { ProfileResType } from '@/types/account.type';
import { Socket } from 'socket.io-client';
import z from 'zod';

export type LoginBodyType = z.infer<typeof loginSchema>;
export type RegisterBodyType = z.infer<typeof registerSchema>;
export type OtpBodyType = z.infer<typeof otpSchema>;
export type ForgotPasswordBodyType = z.infer<typeof forgotPasswordStep1Schema> &
  z.infer<typeof forgotPasswordStep2Schema>;

export type AuthStoreType = {
  isAuthenticated: boolean;
  profile: ProfileResType | null;
  loading: boolean;
  socket: Socket | null;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setProfile: (profile: ProfileResType | null) => void;
  setLoading: (loading: boolean) => void;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
};
