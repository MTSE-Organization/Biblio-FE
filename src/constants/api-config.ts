import AppConstants from '@/constants/app';
import { ApiConfigGroup } from '@/types';

const baseHeader = { 'Content-Type': 'application/json' };
const multipartHeader = { 'Content-Type': 'multipart/form-data' };

const defineApiConfig = <T extends ApiConfigGroup>(config: T) => config;

const apiConfig = defineApiConfig({
  auth: {
    register: {
      baseUrl: `${AppConstants.apiUrl}v1/auth/register`,
      headers: baseHeader,
      method: 'POST'
    },
    verifyOtp: {
      baseUrl: `${AppConstants.apiUrl}v1/auth/verify-otp`,
      headers: baseHeader,
      method: 'POST'
    },
    forgotPassword: {
      baseUrl: `${AppConstants.apiUrl}v1/auth/forgot-password`,
      headers: baseHeader,
      method: 'POST'
    },
    changePassword: {
      baseUrl: `${AppConstants.apiUrl}v1/auth/change-password`,
      headers: baseHeader,
      method: 'POST'
    },
    login: {
      baseUrl: `${AppConstants.apiUrl}v1/auth/login`,
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
      baseUrl: `${AppConstants.apiUrl}v1/account/profile`,
      headers: baseHeader,
      method: 'GET'
    },
    updateProfile: {
      baseUrl: `${AppConstants.apiUrl}v1/account/update-profile`,
      headers: baseHeader,
      method: 'PUT'
    }
  },
  file: {
    upload: {
      baseUrl: `${AppConstants.apiUrl}v1/file/upload`,
      method: 'POST',
      headers: multipartHeader,
      isUpload: true
    }
  }
});

export default apiConfig;
