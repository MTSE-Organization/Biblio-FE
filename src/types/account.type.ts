import {
  profileSchema,
  updateProfileSchema
} from '@/schemaValidations/account.schema';
import z from 'zod';
import { GroupResType } from './group.type';

export type ProfileType = z.infer<typeof profileSchema>;
export type UpdateProfileType = z.infer<typeof updateProfileSchema>;

export type ProfileResType = ProfileType;
export type UpdateProfileBodyType = UpdateProfileType;

export type AccountResType = {
  id: string;
  email: string;
  fullName: string;
  avatarPath: string;
  phone: string;
  kind: number;
  isSuperAdmin: boolean;
  group: GroupResType;
  createdDate: string;
  modifiedDate: string;
  status: number;
};

export type AccountAutoType = {
  id: string;
  fullName: string;
  avatarPath: string;
  kind: number;
  isSuperAdmin: boolean;
};
