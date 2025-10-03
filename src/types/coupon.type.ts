import { BaseSearchType } from '@/types/search.type';

export type CouponResType = {
  id: string;
  code: string;
  kind: number;
  name: string;
  description: string;
  type: number;
  value: string;
  minOrderAmount: string;
  quantity: number;
  validFrom: Date;
  validTo: Date;
  status: number;
};

export type CouponSearchType = {
  id?: string;
  code?: string;
  kind?: number;
  name?: string;
  type?: number;
  minOrderAmount?: string;
} & BaseSearchType;
