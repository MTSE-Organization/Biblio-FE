import Link from 'next/link';
import {
  Breadcrumb as OriginBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';
import Row from '@/components/form/row';
import { ReusableBreadcrumbProps } from '@/types';

export default function Breadcrumb({
  items,
  separator = <BreadcrumbSeparator />
}: ReusableBreadcrumbProps) {
  return (
    <OriginBreadcrumb className='block'>
      <BreadcrumbList className='bg-breadcrumb relative flex h-17.5 w-full items-center'>
        <div className='mx-auto min-[1200px]:w-285 min-[1440px]:w-330'>
          <Row className='my-0 gap-x-2'>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {item.href && !isLast ? (
                      <BreadcrumbLink asChild>
                        <Link
                          className='text-green-primary hover:text-green-primary font-semibold transition-all duration-200 ease-linear hover:opacity-80!'
                          href={item.href}
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLast && separator}
                </Fragment>
              );
            })}
          </Row>
        </div>
      </BreadcrumbList>
    </OriginBreadcrumb>
  );
}
