import { baseSearchSchema, headerSearchSchema } from '@/schemaValidations';
import z from 'zod';

export type BaseSearchParamType = z.infer<typeof baseSearchSchema>;

export type HeaderSearchType = z.infer<typeof headerSearchSchema>;
