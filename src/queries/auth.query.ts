import { authApiRequest } from '@/api-requests';
import {
  ForgotPasswordBodyType,
  LoginBodyType,
  OtpBodyType,
  RegisterBodyType
} from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (body: RegisterBodyType) =>
      await authApiRequest.register(body)
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationKey: ['otp-verify'],
    mutationFn: async (body: OtpBodyType) =>
      await authApiRequest.verifyOtp(body)
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (body: Pick<ForgotPasswordBodyType, 'email'>) =>
      await authApiRequest.forgotPassword(body)
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (body: ForgotPasswordBodyType) =>
      await authApiRequest.changePassword(body)
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (body: LoginBodyType) => await authApiRequest.login(body)
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => await authApiRequest.logout()
  });
};
