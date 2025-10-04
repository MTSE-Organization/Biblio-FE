import envConfig from '@/config';

const apiUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT_URL;
const mediaUrl = envConfig.NEXT_PUBLIC_API_MEDIA_URL;
const shopeeAddressUrl = envConfig.NEXT_PUBLIC_API_SHOPEE_ADDRESS_URL;

const AppConstants = {
  apiUrl: `${apiUrl}/api/`,
  mediaUrl: `${mediaUrl}/api/`,
  contentRootUrl: `${mediaUrl}/api/v1/file/download`,
  shopeeAddressUrl: `${shopeeAddressUrl}/api/`
};

export default AppConstants;
