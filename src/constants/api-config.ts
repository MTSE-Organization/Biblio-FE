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
    getListByCategory: {
      baseUrl: `${AppConstants.apiUrl}v1/product/related/category/:id`,
      headers: baseHeader,
      method: 'GET'
    },
    getTopView: {
      baseUrl: `${AppConstants.apiUrl}v1/product/top-views`,
      headers: baseHeader,
      method: 'GET'
    },
    search: {
      baseUrl: `${AppConstants.apiUrl}v1/product/search`,
      headers: baseHeader,
      method: 'GET'
    }
  },
  category: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/category/list`,
      headers: baseHeader,
      method: 'GET'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/category/get/:id`,
      headers: baseHeader,
      method: 'GET'
    },
    autoComplete: {
      baseUrl: `${AppConstants.apiUrl}v1/category/auto-complete`,
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
  },
  productVariant: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/product-variant/list`,
      headers: baseHeader,
      method: 'GET'
    }
  },
  viewedProduct: {
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/viewed-product/create`,
      headers: baseHeader,
      method: 'POST'
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/viewed-product/list`,
      headers: baseHeader,
      method: 'GET'
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/viewed-product/delete/:id`,
      headers: baseHeader,
      method: 'DELETE'
    }
  },
  address: {
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/address/create`,
      headers: baseHeader,
      method: 'POST'
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/address/delete/:id`,
      headers: baseHeader,
      method: 'DELETE'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/address/get/:id`,
      headers: baseHeader,
      method: 'GET'
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/address/list`,
      headers: baseHeader,
      method: 'GET'
    },
    setDefault: {
      baseUrl: `${AppConstants.apiUrl}v1/address/set-default/:id`,
      headers: baseHeader,
      method: 'PUT'
    },
    update: {
      baseUrl: `${AppConstants.apiUrl}v1/address/update`,
      headers: baseHeader,
      method: 'PUT'
    },
    shippingFee: {
      baseUrl: `${AppConstants.apiUrl}v1/address/shipping-fee`,
      headers: baseHeader,
      method: 'POST'
    }
  },
  publicAddress: {
    province: {
      baseUrl: `/api/address/province`,
      headers: baseHeader,
      method: 'GET',
      ignoreAuth: true
    },
    district: {
      baseUrl: `/api/address/district`,
      headers: baseHeader,
      method: 'GET',
      ignoreAuth: true
    },
    ward: {
      baseUrl: `/api/address/ward`,
      headers: baseHeader,
      method: 'GET',
      ignoreAuth: true
    },
    detail: {
      baseUrl: `/api/address/auto-complete`,
      headers: baseHeader,
      method: 'GET',
      ignoreAuth: true
    },
    getGeoCoords: {
      baseUrl: `/api/address/geo`,
      headers: baseHeader,
      method: 'GET',
      ignoreAuth: true
    }
  },
  order: {
    cancel: {
      baseUrl: `${AppConstants.apiUrl}v1/order/cancel/:id`,
      headers: baseHeader,
      method: 'PUT'
    },
    complete: {
      baseUrl: `${AppConstants.apiUrl}v1/order/complete/:id`,
      headers: baseHeader,
      method: 'PUT'
    },
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/order/create`,
      headers: baseHeader,
      method: 'POST'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/order/get/:id`,
      headers: baseHeader,
      method: 'GET'
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/order/list`,
      headers: baseHeader,
      method: 'GET'
    },
    place: {
      baseUrl: `${AppConstants.apiUrl}v1/order/place`,
      headers: baseHeader,
      method: 'POST'
    },
    refund: {
      baseUrl: `${AppConstants.apiUrl}v1/order/refund`,
      headers: baseHeader,
      method: 'PUT'
    }
  },
  coupon: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/coupon/list`,
      headers: baseHeader,
      method: 'GET'
    },
    getById: {
      baseUrl: `${AppConstants.apiUrl}v1/coupon/get/:id`,
      headers: baseHeader,
      method: 'GET'
    }
  },
  favorite: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/favorite-product/list`,
      headers: baseHeader,
      method: 'GET'
    },
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/favorite-product/create`,
      headers: baseHeader,
      method: 'POST'
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/favorite-product/delete/:id`,
      headers: baseHeader,
      method: 'DELETE'
    }
  },
  review: {
    create: {
      baseUrl: `${AppConstants.apiUrl}v1/review/create`,
      headers: baseHeader,
      method: 'POST'
    },
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/review/list`,
      headers: baseHeader,
      method: 'GET'
    },
    summary: {
      baseUrl: `${AppConstants.apiUrl}v1/review/summary/:productId`,
      headers: baseHeader,
      method: 'GET'
    },
    checkReview: {
      baseUrl: `${AppConstants.apiUrl}v1/review/check-review`,
      headers: baseHeader,
      method: 'POST'
    }
  },
  payment: {
    verifyReturn: {
      baseUrl: `${AppConstants.apiUrl}v1/payment/verify-return-url`,
      headers: baseHeader,
      method: 'GET'
    }
  },
  notification: {
    getList: {
      baseUrl: `${AppConstants.apiUrl}v1/notification/list`,
      method: 'GET',
      headers: baseHeader
    },
    countUnread: {
      baseUrl: `${AppConstants.apiUrl}v1/notification/count-unread`,
      method: 'GET',
      headers: baseHeader
    },
    markRead: {
      baseUrl: `${AppConstants.apiUrl}v1/notification/mark-read/:id`,
      method: 'PUT',
      headers: baseHeader
    },
    readAll: {
      baseUrl: `${AppConstants.apiUrl}v1/notification/read-all`,
      method: 'PUT',
      headers: baseHeader
    },
    deleteAll: {
      baseUrl: `${AppConstants.apiUrl}v1/notification/delete-all`,
      method: 'DELETE',
      headers: baseHeader
    },
    delete: {
      baseUrl: `${AppConstants.apiUrl}v1/notification/delete/:id`,
      method: 'DELETE',
      headers: baseHeader
    }
  }
});

export default apiConfig;
