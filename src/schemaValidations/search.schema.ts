import z from 'zod';

export const baseSearchParamSchema = z.object({
  page: z.union([z.number(), z.string()]).optional(),
  size: z.union([z.number(), z.string()]).optional()
});

export const headerSearchSchema = z.object({
  name: z.string()
});
