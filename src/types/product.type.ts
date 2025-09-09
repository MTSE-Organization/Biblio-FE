import { CategoryAutoType } from '@/types/category.type';
import { BaseSearchParamType } from '@/types/search.type';

export type ProductResType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  releaseDate: string;
  length: number;
  width: number;
  height: number;
  ageRating: number;
  isFeatured: boolean;
  quantity: number;
  category: CategoryAutoType;
  createdDate: Date;
  modifiedDate: Date;
  status: number;
};

export type ProductSearchParamType = BaseSearchParamType;
