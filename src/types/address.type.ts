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

export type PublicAddressProvinceResType = {
  id: number;
  name: string;
};

export type PublicAddressDistrictResType = {
  id: number;
  name: string;
};

export type PublicAddressWardResType = {
  id: number;
  name: string;
};

export type PublicAddressDetailResType = {
  id: string;
  name: string;
  place_id: string;
};

export type AddressGeoCoordsResType = {
  lat: number;
  lng: number;
};
