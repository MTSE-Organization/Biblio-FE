import {
  profileSchema,
  updateProfileSchema
} from '@/schemaValidations/account.schema';
import z from 'zod';

export type ProfileType = z.infer<typeof profileSchema>;
export type UpdateProfileType = z.infer<typeof updateProfileSchema>;

export type ProfileResType = ProfileType;
export type UpdateProfileBodyType = UpdateProfileType;
