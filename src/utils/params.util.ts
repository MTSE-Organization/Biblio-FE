import { z } from 'zod';

export function validateParams<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  params: URLSearchParams
) {
  const obj: Record<string, string> = {};
  for (const [key, value] of params.entries()) obj[key] = value;

  const parsed = schema.safeParse(obj);

  if (parsed.success) return { valid: parsed.data, invalidKeys: [] };

  const invalidKeys = parsed.error.issues.map(
    (issue) => issue.path[0] as string
  );

  return { valid: {}, invalidKeys };
}
