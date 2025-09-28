import { addressSchema } from '@/schemaValidations';
import z from 'zod';

export type AddressResType = {
  id: string;
  detail: string;
  city: string;
  district: string;
  ward: string;
  hamlet: string;
  longitude: number;
  latitude: number;
  isDefault: boolean;
  accountId: string;
};

export type AddressBodyType = z.infer<typeof addressSchema>;

type OldProvinceType = {
  id: number;
  name: string;
};

export type PublicAddressProvinceResType = {
  id: number;
  name: string;
  type: number;
  region: number;
  is_picked: number;
  is_delivered: number;
  district_id: any;
  parent_id: any;
  lat: string;
  lng: string;
  is_disable: boolean;
  old_provinces: OldProvinceType[];
};

type DistrictType = {
  id: string;
  name: string;
};

type OldWardType = {
  id: string;
  name: string;
};

export type PublicAddressWardResType = {
  id: number;
  name: string;
  type: number;
  region: any;
  is_picked: number;
  is_delivered: number;
  district_id: any;
  parent_id: number;
  district: DistrictType;
  old_wards: OldWardType[];
};

export type PublicAddressHamletResType = {
  id: number;
  name: string;
  type: number;
  region: any;
  is_picked: number;
  is_delivered: number;
  district_id: any;
  parent_id: number;
  lat: string;
  lng: string;
  is_disable: boolean;
};
