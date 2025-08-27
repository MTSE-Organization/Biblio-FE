import { baseSearchParamSchema, headerSearchSchema } from '@/schemaValidations';
import z from 'zod';

export type BaseSearchParamType = z.infer<typeof baseSearchParamSchema>;

export type HeaderSearchType = z.infer<typeof headerSearchSchema>;
