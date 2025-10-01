import envConfig from '@/config';
import { apiConfig } from '@/constants';
import {
  AddressBodyType,
  AddressGeoCoordsResType,
  AddressResType,
  ApiResponse,
  ApiResponseList,
  PublicAddressHamletResType,
  PublicAddressProvinceResType,
  PublicAddressWardResType
} from '@/types';
import { http } from '@/utils';

const addressApiRequest = {
  getPublicProvinceList: async () =>
    await http.get<ApiResponse<PublicAddressProvinceResType[]>>(
      apiConfig.publicAddress.province
    ),
  getPublicDistrictList: async (parentId: string) =>
    await http.get<ApiResponse<PublicAddressProvinceResType[]>>(
      apiConfig.publicAddress.district,
      {
        params: {
          parentId,
          type: 3
        }
      }
    ),
  getPublicWardList: async (parentId: string) =>
    await http.get<ApiResponse<PublicAddressWardResType[]>>(
      apiConfig.publicAddress.ward,
      {
        params: {
          parentId,
          type: 1
        }
      }
    ),
  getPublicHamletList: async (parentId: string) =>
    await http.get<
      ApiResponse<{ hamlet_address: PublicAddressHamletResType[] }>
    >(apiConfig.publicAddress.hamlet, {
      params: {
        parentId
      }
    }),
  getList: async () =>
    await http.get<ApiResponseList<AddressResType>>(apiConfig.address.getList),
  getById: async (id: string) =>
    await http.get<ApiResponse<AddressResType>>(apiConfig.address.getById, {
      pathParams: {
        id
      }
    }),
  create: async (body: AddressBodyType) =>
    await http.post<ApiResponse<any>>(apiConfig.address.create, {
      body
    }),
  update: async (body: AddressBodyType) =>
    await http.put<ApiResponse<any>>(apiConfig.address.update, {
      body
    }),
  delete: async (id: string) =>
    await http.delete<ApiResponse<any>>(apiConfig.address.delete, {
      pathParams: { id }
    }),
  setDefault: async (id: string) =>
    await http.put<ApiResponse<any>>(apiConfig.address.setDefault, {
      pathParams: { id }
    }),
  getGeoCoords: async (address: string) =>
    await http.get<ApiResponse<AddressGeoCoordsResType[]>>(
      apiConfig.publicAddress.getGeoCoords,
      {
        params: {
          q: address,
          api_key: envConfig.NEXT_PUBLIC_API_ADDRESS_GEO_API_KEY
        }
      }
    )
};

export default addressApiRequest;
