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
    },
    getGoogleLoginUrl: {
      baseUrl: `${AppConstants.apiUrl}v1/auth/google`,
      headers: baseHeader,
      method: 'GET'
    },
    loginGoogle: {
      baseUrl: `${AppConstants.apiUrl}v1/auth/google/callback`,
      headers: baseHeader,
      method: 'POST'
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
  },
  product: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/product/list`,
      headers: baseHeader,
      method: 'GET'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/product/get/:id`,
      headers: baseHeader,
      method: 'GET'
    },
    getLatest: {
      baseUrl: `${AppConstants.apiUrl}v1/product/latest`,
      headers: baseHeader,
      method: 'GET'
    },
    getBestSeller: {
      baseUrl: `${AppConstants.apiUrl}v1/product/best-seller`,
      headers: baseHeader,
      method: 'GET'
    },
    getTopDiscount: {
      baseUrl: `${AppConstants.apiUrl}v1/product/top-discount`,
      headers: baseHeader,
      method: 'GET'
    },
    getFeature: {
      baseUrl: `${AppConstants.apiUrl}v1/product/feature`,
      headers: baseHeader,
      method: 'GET'
    }
  },
  category: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/category/list`,
      headers: baseHeader,
      method: 'GET'
    }
  },
  cartItem: {
    updateCartItem: {
      baseUrl: `${AppConstants.apiUrl}v1/cart-item/update`,
      headers: baseHeader,
      method: 'PUT'
    },
    deleteCartItem: {
      baseUrl: `${AppConstants.apiUrl}v1/cart-item/delete/:id`,
      headers: baseHeader,
      method: 'DELETE'
    }
  },
  cart: {
    getCart: {
      baseUrl: `${AppConstants.apiUrl}v1/cart/get`,
      headers: baseHeader,
      method: 'GET'
    },
    addItem: {
      baseUrl: `${AppConstants.apiUrl}v1/cart/add-item`,
      headers: baseHeader,
      method: 'POST'
    },
    checkout: {
      baseUrl: `${AppConstants.apiUrl}v1/cart/checkout`,
      headers: baseHeader,
      method: 'POST'
    }
  }
});

export default apiConfig;
