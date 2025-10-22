import {
  ErrorMaps,
  ForgotPasswordBodyType,
  RegisterBodyType,
  UpdateProfileBodyType
} from '@/types';

export const ErrorCode = {
  // Auth
  AUTH_ERROR_PASSWORD_MISMATCH: 'ERROR-AUTH-0000',
  AUTH_ERROR_OTP_INVALID_OR_EXPIRED: 'ERROR-AUTH-0001',

  // Account
  ACCOUNT_ERROR_NOT_FOUND: 'ERROR-ACCOUNT-0000',
  ACCOUNT_ERROR_EMAIL_EXISTED: 'ERROR-ACCOUNT-0001',
  ACCOUNT_ERROR_INVALID_PASSWORD: 'ERROR-ACCOUNT-0002',
  ACCOUNT_ERROR_PHONE_EXISTED: 'ERROR-ACCOUNT-0003',

  // Category
  CATEGORY_ERROR_NOT_FOUND: 'ERROR-CATEGORY-0000',
  CATEGORY_ERROR_NAME_EXISTED: 'ERROR-CATEGORY-0001',

  // Network connection
  NETWORK_ECONNREFUSED: 'ECONNREFUSED',

  // ORDER NOT FOUND
  ORDER_ERROR_NOT_FOUND: 'ERROR-ORDER-0000',

  // PRODUCT NOT FOUND
  PRODUCT_ERROR_NOT_FOUND: 'ERROR-PRODUCT-0000'
} as const;

export const registerErrorMaps: ErrorMaps<RegisterBodyType> = {
  [ErrorCode.ACCOUNT_ERROR_EMAIL_EXISTED]: [
    ['email', { type: 'manual', message: 'Email đã tồn tại' }]
  ]
};

export const formatPasswordErrorMaps: ErrorMaps<ForgotPasswordBodyType> = {
  [ErrorCode.AUTH_ERROR_OTP_INVALID_OR_EXPIRED]: [
    ['otp', { type: 'manual', message: 'Mã OTP không tồn tại hoặc đã hết hạn' }]
  ]
};

export const accountErrorMaps: ErrorMaps<UpdateProfileBodyType> = {
  [ErrorCode.ACCOUNT_ERROR_PHONE_EXISTED]: [
    ['phone', { type: 'manual', message: 'Số điện thoại đã tồn tại' }]
  ]
};
