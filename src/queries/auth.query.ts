import { authApiRequest } from '@/api-requests';
import {
  ForgotPasswordBodyType,
  LoginBodyType,
  OtpBodyType,
  RegisterBodyType
} from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (body: RegisterBodyType) => authApiRequest.register(body)
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationKey: ['otp-verify'],
    mutationFn: (body: OtpBodyType) => authApiRequest.verifyOtp(body)
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (body: Pick<ForgotPasswordBodyType, 'email'>) =>
      authApiRequest.forgotPassword(body)
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (body: ForgotPasswordBodyType) =>
      authApiRequest.changePassword(body)
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginBodyType) => authApiRequest.login(body)
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authApiRequest.logout()
  });
};

export const useLoginGoogleQuery = () => {
  return useQuery({
    queryKey: ['loginGoogle'],
    queryFn: () => authApiRequest.getGoogleLoginUrl(),
    enabled: false
  });
};

export const useLoginGoogleMutation = () => {
  return useMutation({
    mutationFn: (code: string) => authApiRequest.loginGoogle(code)
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationKey: ['resend-otp'],
    mutationFn: (email: string) => authApiRequest.resendOtp(email)
  });
};
