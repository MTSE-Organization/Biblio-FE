import { cn } from '@/lib';

export default function Container({
  children,
  contentClassName,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  contentClassName?: string;
}) {
  return (
    <div
      className={cn('bg-gray-100 py-4', {
        'min-h-[90vh]': !contentClassName
      })}
      {...props}
    >
      <div className={cn('content mx-auto max-w-[1320px]', contentClassName)}>
        {children}
      </div>
    </div>
  );
}
