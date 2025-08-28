import AppConstants from '@/constants/app';
import { ApiConfigGroup } from '@/types';

const baseHeader = { 'Content-Type': 'application/json' };
const multipartHeader = { 'Content-Type': 'multipart/form-data' };

const defineApiConfig = <T extends ApiConfigGroup>(config: T) => config;

const apiConfig = defineApiConfig({
  auth: {
    register: {
      baseUrl: `${AppConstants.apiUrl}/auth/register`,
      headers: baseHeader,
      method: 'POST'
    },
    verifyOtp: {
      baseUrl: `${AppConstants.apiUrl}/auth/verify-otp`,
      headers: baseHeader,
      method: 'POST'
    },
    forgotPassword: {
      baseUrl: `${AppConstants.apiUrl}/auth/forgot-password`,
      headers: baseHeader,
      method: 'POST'
    },
    changePassword: {
      baseUrl: `${AppConstants.apiUrl}/auth/change-password`,
      headers: baseHeader,
      method: 'POST'
    },
    login: {
      baseUrl: `${AppConstants.apiUrl}/auth/login`,
      headers: baseHeader,
      method: 'POST'
    },
    api: {
      login: {
        baseUrl: `/api/auth/login`,
        headers: baseHeader,
        method: 'POST'
      },
      logout: {
        baseUrl: '/api/auth/logout',
        headers: baseHeader,
        method: 'POST'
      }
    }
  },
  user: {
    getProfile: {
      baseUrl: `${AppConstants.apiUrl}/account/profile`,
      headers: baseHeader,
      method: 'GET'
    },
    updateProfile: {
      baseUrl: `${AppConstants.apiUrl}/account/update-profile`,
      headers: baseHeader,
      method: 'PUT'
    }
  }
});

export default apiConfig;
