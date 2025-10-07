'use client';

import { FullPageLoading } from '@/components/loading';
import { cn } from '@/lib';
import { useAppLoadingStore } from '@/store/use-app-loading-store';

export default function Container({
  children,
  contentClassName,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  contentClassName?: string;
}) {
  const { loading } = useAppLoadingStore();
  return (
    <div
      className={cn('relative bg-gray-100 py-4', {
        'min-h-[90dvh]': !contentClassName
      })}
      {...props}
    >
      <div className={cn('content mx-auto max-w-[1320px]', contentClassName)}>
        {children}
      </div>

      <FullPageLoading show={loading} />
    </div>
  );
}
