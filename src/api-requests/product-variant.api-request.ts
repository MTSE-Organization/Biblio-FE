import { apiConfig } from '@/constants';
import {
  ApiResponseList,
  ProductVariantResType,
  ProductVariantSearchType
} from '@/types';
import { http } from '@/utils';

const productVariantApiRequest = {
  getList: async (params?: ProductVariantSearchType) =>
    await http.get<ApiResponseList<ProductVariantResType>>(
      apiConfig.productVariant.getList,
      {
        params
      }
    )
};

export default productVariantApiRequest;
