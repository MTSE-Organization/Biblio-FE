'use client';
import FilterSidebar from './_components/filter-sidebar';
import { useRouter } from 'next/navigation';
import { useSearchProductQuery } from '@/queries';
import { FiltersType } from '@/types';
import SearchResult from './_components/search-result';
import Pagination from '@/components/pagination';
import SortSelect from './_components/sort-select';
import { SORT_OPTIONS } from '@/constants';
import { searchSchema } from '@/schemaValidations';
import { useValidatedParams } from '@/hooks/use-validated-params';

export default function SearchPage() {
  const router = useRouter();
  const paramsObj = useValidatedParams(searchSchema);

  const {
    keyword = '',
    sortBy = '',
    sortOrder = '',
    minPrice = 0,
    maxPrice = 0,
    categoryId = null,
    language = null,
    ageRating = null,
    rating = null
  } = paramsObj;

  const defaultSelectOption = SORT_OPTIONS.find(
    (o) => o.sortBy === sortBy && o.sortOrder === sortOrder
  );

  const filters = { minPrice, maxPrice, categoryId, language, ageRating };

  function formatSearchParams(rawParams: Record<string, any>) {
    const params: Record<string, any> = { ...rawParams };
    if (params.page) params.page = params.page - 1;

    if (params.minPrice === 0 && params.maxPrice === 0) {
      delete params.minPrice;
      delete params.maxPrice;
    }

    Object.keys(params).forEach((key) => {
      if (
        params[key] === '' ||
        params[key] == null ||
        Number.isNaN(params[key])
      ) {
        delete params[key];
      }
    });

    return params;
  }

  const { data, isLoading } = useSearchProductQuery({
    enabled: !!paramsObj,
    params: formatSearchParams(paramsObj)
  });

  const books = data?.data?.content || [];

  const handleApplyFilters = (newFilters: FiltersType) => {
    const nextParams = formatSearchParams({
      keyword,
      ...newFilters,
      sortBy,
      sortOrder
    });
    router.push(`/search?${new URLSearchParams(nextParams).toString()}`);
  };

  const handleSort = (sortBy: string, sortOrder: string) => {
    const nextParams = formatSearchParams({
      keyword,
      ...paramsObj,
      sortBy,
      sortOrder
    });
    router.push(`/search?${new URLSearchParams(nextParams).toString()}`);
  };

  return (
    <div className='flex gap-4'>
      <FilterSidebar defaultFilters={filters} onApply={handleApplyFilters} />
      <div className='flex-1'>
        <div className='mb-4 rounded-lg bg-white p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-600'>
              Tìm thấy{' '}
              <span className='font-semibold text-gray-900'>
                {data?.data?.totalElements}
              </span>{' '}
              sản phẩm
            </p>
            <SortSelect
              defaultOption={defaultSelectOption}
              onChange={handleSort}
            />
          </div>
        </div>
        <div>
          <SearchResult books={books} loading={isLoading} />
          <Pagination totalPages={data?.data?.totalPages || 1} />
        </div>
      </div>
    </div>
  );
}
