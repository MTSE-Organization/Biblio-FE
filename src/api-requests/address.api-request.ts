import { apiConfig } from '@/constants';
import {
  AddressBodyType,
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
  getPublicWardList: async (province_id: string) =>
    await http.get<ApiResponse<PublicAddressWardResType[]>>(
      apiConfig.publicAddress.ward,
      {
        params: {
          province_id
        }
      }
    ),
  getPublicHamlet: async (parent_id: string) =>
    await http.get<
      ApiResponse<{ hamlet_address: PublicAddressHamletResType[] }>
    >(apiConfig.publicAddress.hamlet, {
      params: {
        parent_id
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
    })
};

export default addressApiRequest;
