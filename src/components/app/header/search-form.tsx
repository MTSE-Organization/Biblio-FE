'use client';

import { Button, Col, InputField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { cn } from '@/lib';
import { logger } from '@/logger';
import { headerSearchSchema } from '@/schemaValidations';
import { HeaderSearchType } from '@/types';
import { Search } from 'lucide-react';

export default function SearchForm() {
  const defaultValues: HeaderSearchType = {
    name: ''
  };

  const onSubmit = (values: HeaderSearchType) => {
    logger.info(values);
  };

  return (
    <BaseForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      schema={headerSearchSchema}
      className='h-search-form relative w-150 p-0'
    >
      {(form) => (
        <>
          <InputField
            formItemClassName='h-full'
            className='border-green-primary focus-visible:border-green-primary text-md! h-full border border-solid py-2 pr-0! pl-4'
            suffixIcon={
              <Button
                aria-label='Search icon'
                variant='ghost'
                className={cn(
                  'bg-green-primary! hover:bg-green-primary -mr-3 h-full! rounded-tl-none rounded-bl-none px-4! transition-all duration-300 ease-linear hover:opacity-80'
                )}
              >
                <Search size={16} className='stroke-white' />
              </Button>
            }
            control={form.control}
            name='name'
            placeholder='Tìm kiếm sách...'
          />
        </>
      )}
    </BaseForm>
  );
}
