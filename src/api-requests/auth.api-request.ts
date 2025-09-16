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
  register: async (body: RegisterBodyType) =>
    await http.post<ApiResponse<any>>(apiConfig.auth.register, {
      body
    }),
  verifyOtp: async (body: OtpBodyType) =>
    await http.post<ApiResponse<any>>(apiConfig.auth.verifyOtp, {
      body
    }),
  forgotPassword: async (body: Pick<ForgotPasswordBodyType, 'email'>) =>
    await http.post<ApiResponse<any>>(apiConfig.auth.forgotPassword, {
      body
    }),
  changePassword: async (body: ForgotPasswordBodyType) =>
    await http.post<ApiResponse<any>>(apiConfig.auth.changePassword, {
      body
    }),
  login: async (body: LoginBodyType) =>
    await http.post<ApiResponse<{ token: string }>>(apiConfig.auth.api.login, {
      body
    }),
  loginFromNextServerToServer: async (body: LoginBodyType) =>
    await http.post<ApiResponse<{ token: string }>>(apiConfig.auth.login, {
      body
    }),
  logout: async () =>
    await http.post<ApiResponse<any>>(apiConfig.auth.api.logout),
  getGoogleLoginUrl: async () =>
    await http.get<ApiResponse<{ url: string }>>(
      apiConfig.auth.getGoogleLoginUrl
    ),
  loginGoogle: async (code: string) =>
    await http.post<ApiResponse<{ token: string }>>(
      apiConfig.auth.loginGoogle,
      {
        params: { code }
      }
    )
};
export default authApiRequest;
