'use client';
import { StarRating } from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ageRatings, languageOptions } from '@/constants';
import { useCategoryListQuery } from '@/queries';
import { FiltersType } from '@/types';
import { formatPrice } from '@/utils';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import ExpandableList from './expandable-list';

export default function FilterSidebar({
  defaultFilters,
  onApply
}: {
  defaultFilters: any;
  onApply: (filters: any) => void;
}) {
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);

  const categoryAutoComplete = useCategoryListQuery({ enabled: true });
  const categories = categoryAutoComplete?.data?.data?.content || [];

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= filters.maxPrice) {
      setFilters((prev) => ({ ...prev, minPrice: value }));
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= filters.minPrice) {
      setFilters((prev) => ({ ...prev, maxPrice: value }));
    }
  };

  const toggleCategory = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: prev.categoryId === categoryId ? null : categoryId
    }));
  };

  const toggleLanguage = (language: string) => {
    setFilters((prev) => ({
      ...prev,
      language: prev.language === language ? null : language
    }));
  };

  const toggleAgeRating = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      ageRating: prev.ageRating === rating ? null : rating
    }));
  };

  const handleClearAll = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 0,
      categoryId: null,
      language: null,
      ageRating: null
    });
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className='w-72 flex-shrink-0'>
      <div className='flex flex-col gap-4 rounded-lg bg-white p-5 shadow-sm'>
        <div className='flex items-center justify-between'>
          <h2 className='flex items-center gap-2 text-lg font-semibold'>
            <SlidersHorizontal className='h-5 w-5' />
            Bộ lọc
          </h2>
          <button
            onClick={handleClearAll}
            className='text-green-primary cursor-pointer text-sm'
          >
            Xóa tất cả
          </button>
        </div>

        <Separator />

        <div>
          <h3 className='mb-3 font-medium'>Danh mục</h3>
          <ExpandableList
            items={categories}
            renderItem={(cat) => (
              <label
                key={cat.id}
                className='group flex cursor-pointer items-center gap-2'
              >
                <label className='relative flex cursor-pointer items-center'>
                  <input
                    checked={filters.categoryId === cat.id}
                    type='checkbox'
                    onChange={() => toggleCategory(cat.id)}
                    className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                  />
                  <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3.5 w-3.5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      />
                    </svg>
                  </span>
                </label>
                <span className='hover:text-green-primary text-sm'>
                  {cat.name}
                </span>
              </label>
            )}
          />
        </div>
        <Separator />

        <div>
          <h3 className='mb-3 font-medium'>Lứa tuổi</h3>
          <div className='space-y-2.5'>
            {ageRatings?.map((ar) => (
              <label
                key={ar.value}
                className='group flex cursor-pointer items-center gap-2'
              >
                <label className='relative flex cursor-pointer items-center'>
                  <input
                    checked={filters.ageRating === ar.value}
                    type='checkbox'
                    onChange={() => toggleAgeRating(ar.value)}
                    className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                  />
                  <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3.5 w-3.5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      />
                    </svg>
                  </span>
                </label>
                <span className='hover:text-green-primary text-sm'>
                  {ar.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-3 font-medium'>Khoảng giá</h3>
          <div className='space-y-3'>
            <div className='relative pt-1'>
              <div className='relative h-2 rounded-full bg-gray-200'>
                <div
                  className='bg-green-primary absolute h-2 rounded-full'
                  style={{
                    left: `${(filters.minPrice / 5000000) * 100}%`,
                    right: `${100 - (filters.maxPrice / 5000000) * 100}%`
                  }}
                ></div>
              </div>
              <input
                type='range'
                min='0'
                max='5000000'
                step='50000'
                value={filters.minPrice}
                onChange={handleMinChange}
                className='pointer-events-none absolute top-1 h-2 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-green-700 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-700'
              />
              <input
                type='range'
                min='0'
                max='5000000'
                step='50000'
                value={filters.maxPrice}
                onChange={handleMaxChange}
                className='pointer-events-none absolute top-1 h-2 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-green-700 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-700'
              />
            </div>
            <div className='mt-6 flex items-center gap-2 text-sm'>
              <Input
                type='text'
                value={formatPrice(filters.minPrice)}
                readOnly
                className='flex-1 rounded border bg-gray-50 px-2 py-1.5 text-center'
              />
              <span>-</span>
              <Input
                type='text'
                value={formatPrice(filters.maxPrice)}
                readOnly
                className='flex-1 rounded border bg-gray-50 px-2 py-1.5 text-center'
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-3 font-medium'>Ngôn ngữ</h3>
          <ExpandableList
            items={languageOptions}
            renderItem={(language) => (
              <label
                key={language.value}
                className='group flex cursor-pointer items-center gap-2'
              >
                <label className='relative flex cursor-pointer items-center'>
                  <input
                    checked={filters.language === language.value}
                    type='checkbox'
                    onChange={() => toggleLanguage(language.value)}
                    className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                  />
                  <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3.5 w-3.5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      />
                    </svg>
                  </span>
                </label>
                <span className='hover:text-green-primary text-sm'>
                  {language.label}
                </span>
              </label>
            )}
          />
        </div>

        <Separator />

        <div>
          <h3 className='mb-3 font-medium'>Đánh giá</h3>
          <div className='space-y-2.5'>
            {[...Array(5)].map((_, index) => (
              <label
                key={5 - index}
                className='group flex cursor-pointer items-center gap-2'
              >
                <label className='relative flex cursor-pointer items-center'>
                  <input
                    checked={filters.ageRating === 5 - index}
                    type='checkbox'
                    onChange={() => toggleAgeRating(5 - index)}
                    className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                  />
                  <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3.5 w-3.5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      />
                    </svg>
                  </span>
                </label>
                <StarRating value={5 - index} size={16} />
              </label>
            ))}
          </div>
        </div>

        <Separator />

        <Button
          onClick={handleApply}
          className='bg-green-primary w-full cursor-pointer rounded-lg py-2.5 font-medium text-white transition'
        >
          Áp dụng bộ lọc
        </Button>
      </div>
    </div>
  );
}
