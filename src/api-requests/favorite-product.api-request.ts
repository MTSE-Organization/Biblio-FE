import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  FavoriteProductResType,
  FavoriteProductSearchType
} from '@/types';
import { http } from '@/utils';

const favoriteApiRequest = {
  getList: (params?: FavoriteProductSearchType) =>
    http.get<ApiResponseList<FavoriteProductResType>>(
      apiConfig.favorite.getList,
      {
        params
      }
    ),
  addFavoriteProduct: (body: { productId: string }) =>
    http.post<ApiResponse<any>>(apiConfig.favorite.create, {
      body
    }),
  deleteFavoriteProduct: (id: string) =>
    http.post<ApiResponse<any>>(apiConfig.favorite.delete, {
      pathParams: { id }
    })
};

export default favoriteApiRequest;
