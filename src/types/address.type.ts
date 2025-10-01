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
  pid: any;
  type: number;
  region: number;
  alias: string;
  is_picked: number;
  is_delivered: number;
  lat: string;
  lng: string;
};

export type PublicAddressDistrictResType = {
  id: number;
  name: string;
  pid: number;
  type: number;
  region: any;
  alias: string;
  is_picked: number;
  is_delivered: number;
  lat: string;
  lng: string;
};

export type PublicAddressWardResType = {
  id: number;
  name: string;
  pid: number;
  type: number;
  region: any;
  alias: string;
  is_picked: number;
  is_delivered: number;
  lat: string;
  lng: string;
};

export type PublicAddressHamletResType = {
  id: number;
  name: string;
  pid: number;
  is_delivered: number;
  alias: string;
  lat: string;
  lng: string;
};

export type AddressGeoCoordsResType = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
};
