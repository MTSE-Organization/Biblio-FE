import { ageValues, languageValues } from '@/constants';
import z from 'zod';

export const baseSearchSchema = z.object({
  page: z.union([z.number(), z.string()]).optional(),
  size: z.union([z.number(), z.string()]).optional()
});

export const headerSearchSchema = z.object({
  name: z.string()
});

export const searchSchema = z.object({
  keyword: z.string().trim().optional(),
  minPrice: z.coerce.number().min(0).max(5000000).optional(),
  maxPrice: z.coerce.number().min(0).max(5000000).optional(),
  categoryId: z.string().optional(),
  language: z.enum(languageValues as [string, ...string[]]).optional(),
  ageRating: z
    .enum(ageValues.map(String) as [string, ...string[]])
    .transform(Number)
    .optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});
