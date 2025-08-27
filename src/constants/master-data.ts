import { GENDER_FEMALE, GENDER_MALE, GENDER_OTHER } from '@/constants/constant';

export const masterData = {};

export type OptionType = {
  value: string | number;
  label: string;
  [key: string]: string | number;
};

export const genderOptions: OptionType[] = [
  { value: GENDER_MALE, label: 'Nam' },
  { value: GENDER_FEMALE, label: 'Nữ' },
  { value: GENDER_OTHER, label: 'Khác' }
];
