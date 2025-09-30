import { CategoryAutoType } from '@/types/category.type';
import { ContributorAutoType } from '@/types/contributor.type';
import {
  ProductImageAutoType,
  ProductImageResType
} from '@/types/product-image.type';
import { PublisherAutoType } from '@/types/publisher.type';
import { BaseSearchType } from '@/types/search.type';

export type ProductResType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  releaseDate: string;
  ageRating: number;
  language: string;
  isFeatured: boolean;
  metaData: string;
  discount: number;
  category: CategoryAutoType;
  images: ProductImageResType[];
  publisher: PublisherAutoType;
  contributors: ContributorAutoType[];
  createdDate: string;
  modifiedDate: string;
  totalViews: number;
  status: number;
};

export type ProductSearchType = {
  ageRating?: number;
  language?: string;
  isFeatured?: true;
  categoryId?: string;
  publisherId?: string;
  status?: number;
} & BaseSearchType;

export type ProductAutoType = {
  id: string;
  name: string;
  image: ProductImageAutoType;
  category: CategoryAutoType;
  price: number;
  slug: string;
  quantity: number;
  discount: number;
  totalViews: number;
  status: number;
};
