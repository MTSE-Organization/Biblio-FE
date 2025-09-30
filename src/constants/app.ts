import envConfig from '@/config';

const apiUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT_URL;
const mediaUrl = envConfig.NEXT_PUBLIC_API_MEDIA_URL;
const apiAddressUrl = envConfig.NEXT_PUBLIC_API_ADDRESS_GHTK;

const AppConstants = {
  apiUrl: `${apiUrl}/api/`,
  mediaUrl: `${mediaUrl}/api/`,
  contentRootUrl: `${mediaUrl}/api/v1/file/download`,
  addressApiUrl: `${apiAddressUrl}/api/`
};

export default AppConstants;
