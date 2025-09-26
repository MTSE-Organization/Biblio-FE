import z from 'zod';

export const categorySearchSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.number().optional()
});
