import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ForgotPasswordBodyType,
  LoginBodyType,
  OtpBodyType,
  RegisterBodyType
} from '@/types';
import { http } from '@/utils';

const authApiRequest = {
  register: (body: RegisterBodyType) =>
    http.post<ApiResponse<any>>(apiConfig.auth.register, {
      body
    }),
  verifyOtp: (body: OtpBodyType) =>
    http.post<ApiResponse<any>>(apiConfig.auth.verifyOtp, {
      body
    }),
  forgotPassword: (body: Pick<ForgotPasswordBodyType, 'email'>) =>
    http.post<ApiResponse<any>>(apiConfig.auth.forgotPassword, {
      body
    }),
  changePassword: (body: ForgotPasswordBodyType) =>
    http.post<ApiResponse<any>>(apiConfig.auth.changePassword, {
      body
    }),
  login: (body: LoginBodyType) =>
    http.post<ApiResponse<{ token: string }>>(apiConfig.auth.api.login, {
      body
    }),
  loginFromNextServerToServer: (body: LoginBodyType) =>
    http.post<ApiResponse<{ token: string }>>(apiConfig.auth.login, {
      body
    }),
  logout: () => http.post<ApiResponse<any>>(apiConfig.auth.api.logout),
  getGoogleLoginUrl: () =>
    http.get<ApiResponse<{ url: string }>>(apiConfig.auth.getGoogleLoginUrl),
  loginGoogle: (code: string) =>
    http.post<ApiResponse<{ token: string }>>(apiConfig.auth.loginGoogle, {
      params: { code }
    }),
  resendOtp: (email: string) =>
    http.post<ApiResponse<any>>(apiConfig.auth.resendOtp, {
      body: { email }
    })
};
export default authApiRequest;
