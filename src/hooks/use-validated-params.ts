'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { validateParams } from '@/utils/params.util';

export function useValidatedParams<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramsObj = useMemo(() => {
    const obj: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) obj[key] = value;
    return obj;
  }, [searchParams]);

  useEffect(() => {
    const { valid, invalidKeys } = validateParams(schema, searchParams);

    if (invalidKeys.length > 0) {
      const cleaned = new URLSearchParams(searchParams);
      invalidKeys.forEach((key) => cleaned.delete(key));
      router.replace(`?${cleaned.toString()}`, { scroll: false });
    }
  }, [searchParams, router, schema]);

  const { valid } = validateParams(schema, searchParams);
  return valid as z.infer<typeof schema>;
}
