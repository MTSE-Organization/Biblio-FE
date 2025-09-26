import { categorySearchSchema } from '@/schemaValidations';
import { BaseSearchParamType } from '@/types/search.type';
import z from 'zod';

export type CategoryAutoType = {
  id: string;
  name: string;
  slug: string;
  status: number;
};

export type CategoryResType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  ordering: number;
  status: number;
  createdDate: string;
  modifiedDate: string;
};

export type CategorySearchType = z.infer<typeof categorySearchSchema> &
  BaseSearchParamType;
