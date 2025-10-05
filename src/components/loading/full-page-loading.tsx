'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib';

export default function FullPageLoading({
  show = false,
  className
}: {
  show?: boolean;
  className?: string;
}) {
  if (!show) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-white/40',
        className
      )}
    >
      <Loader2 className='text-green-primary h-10 w-10 animate-spin' />
    </div>
  );
}
