import { baseSearchParamSchema } from '@/schemaValidations';
import z from 'zod';

export type BaseSearchParamType = z.infer<typeof baseSearchParamSchema>;
