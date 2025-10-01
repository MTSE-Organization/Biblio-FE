import { apiConfig } from '@/constants';
import {
  AddressBodyType,
  AddressGeoCoordsResType,
  AddressResType,
  ApiResponse,
  ApiResponseList,
  PublicAddressDetailResType,
  PublicAddressProvinceResType,
  PublicAddressWardResType
} from '@/types';
import { http } from '@/utils';

const addressApiRequest = {
  getPublicProvinceList: async () =>
    await http.get<ApiResponse<PublicAddressProvinceResType[]>>(
      apiConfig.publicAddress.province
    ),
  getPublicDistrictList: async (division_id: string) =>
    await http.get<ApiResponse<PublicAddressProvinceResType[]>>(
      apiConfig.publicAddress.district,
      {
        params: {
          division_id
        }
      }
    ),
  getPublicWardList: async (division_id: string) =>
    await http.get<ApiResponse<PublicAddressWardResType[]>>(
      apiConfig.publicAddress.ward,
      {
        params: {
          division_id
        }
      }
    ),
  getPublicDetail: async ({
    city,
    district,
    input,
    sessiontoken = '51bdf842-d3b2-48fc-b267-c399cdd420f5',
    state
  }: {
    city: string;
    district: string;
    input: string;
    state: string;
    sessiontoken?: string;
  }) =>
    await http.get<ApiResponseList<PublicAddressDetailResType>>(
      apiConfig.publicAddress.detail,
      {
        params: {
          city,
          district,
          input,
          sessiontoken,
          state
        }
      }
    ),
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
  getGeoCoords: async ({
    placeid,
    sessiontoken = '51bdf842-d3b2-48fc-b267-c399cdd420f5'
  }: {
    placeid: string;
    sessiontoken?: string;
  }) =>
    await http.get<ApiResponse<AddressGeoCoordsResType>>(
      apiConfig.publicAddress.getGeoCoords,
      {
        params: {
          placeid,
          sessiontoken
        }
      }
    )
};

export default addressApiRequest;
