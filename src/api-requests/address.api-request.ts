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
  getPublicProvinceList: () =>
    http.get<ApiResponse<PublicAddressProvinceResType[]>>(
      apiConfig.publicAddress.province
    ),
  getPublicDistrictList: (division_id: string) =>
    http.get<ApiResponse<PublicAddressProvinceResType[]>>(
      apiConfig.publicAddress.district,
      {
        params: {
          division_id
        }
      }
    ),
  getPublicWardList: (division_id: string) =>
    http.get<ApiResponse<PublicAddressWardResType[]>>(
      apiConfig.publicAddress.ward,
      {
        params: {
          division_id
        }
      }
    ),
  getPublicDetail: ({
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
    http.get<ApiResponseList<PublicAddressDetailResType>>(
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
  getList: () =>
    http.get<ApiResponseList<AddressResType>>(apiConfig.address.getList),
  getById: (id: string) =>
    http.get<ApiResponse<AddressResType>>(apiConfig.address.getById, {
      pathParams: {
        id
      }
    }),
  create: (body: AddressBodyType) =>
    http.post<ApiResponse<any>>(apiConfig.address.create, {
      body
    }),
  update: (body: AddressBodyType) =>
    http.put<ApiResponse<any>>(apiConfig.address.update, {
      body
    }),
  delete: (id: string) =>
    http.delete<ApiResponse<any>>(apiConfig.address.delete, {
      pathParams: { id }
    }),
  setDefault: (id: string) =>
    http.put<ApiResponse<any>>(apiConfig.address.setDefault, {
      pathParams: { id }
    }),
  getGeoCoords: ({
    placeid,
    sessiontoken = '51bdf842-d3b2-48fc-b267-c399cdd420f5'
  }: {
    placeid: string;
    sessiontoken?: string;
  }) =>
    http.get<ApiResponse<AddressGeoCoordsResType>>(
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
