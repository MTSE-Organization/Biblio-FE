'use client';
import { StarRating } from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/utils';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function FilterSidebar() {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categories = [
    { id: '1', name: 'Văn học' },
    { id: '2', name: 'Đời sống' }
  ];

  const languages = [
    { id: 'vi', name: 'Tiếng Việt' },
    { id: 'en', name: 'Tiếng Anh' }
  ];

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleLanguage = (languageId: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((c) => c !== languageId)
        : [...prev, languageId]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleClearAll = () => {
    setMinPrice(0);
    setMaxPrice(10000000);
    setSelectedCategories([]);
    setSelectedRatings([]);
  };

  const handleApplyFilters = () => {};

  return (
    <div className='w-72 flex-shrink-0'>
      <div className='sticky top-24 flex flex-col gap-4 rounded-lg bg-white p-5 shadow-sm'>
        <div className='flex items-center justify-between'>
          <h2 className='flex items-center gap-2 text-lg font-semibold'>
            <SlidersHorizontal className='h-5 w-5' />
            Bộ lọc
          </h2>
          <button
            onClick={handleClearAll}
            className='text-green-primary cursor-pointer text-sm hover:underline'
          >
            Xóa tất cả
          </button>
        </div>

        <Separator />

        <div>
          <h3 className='mb-3 font-medium'>Danh mục</h3>
          <div className='space-y-2.5'>
            {categories?.map((category) => (
              <label
                key={category.id}
                className='group flex cursor-pointer items-center gap-2'
              >
                <label className='relative flex cursor-pointer items-center'>
                  <input
                    checked={selectedCategories.includes(category.id)}
                    type='checkbox'
                    onChange={() => toggleCategory(category.id)}
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
                  {category.name}
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
                    left: `${(minPrice / 10000000) * 100}%`,
                    right: `${100 - (maxPrice / 10000000) * 100}%`
                  }}
                ></div>
              </div>
              <input
                type='range'
                min='0'
                max='10000000'
                step='100000'
                value={minPrice}
                onChange={handleMinChange}
                className='pointer-events-none absolute top-1 h-2 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-green-700 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-700'
              />
              <input
                type='range'
                min='0'
                max='10000000'
                step='100000'
                value={maxPrice}
                onChange={handleMaxChange}
                className='pointer-events-none absolute top-1 h-2 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-green-700 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-700'
              />
            </div>
            <div className='mt-6 flex items-center gap-2 text-sm'>
              <Input
                type='text'
                value={formatPrice(minPrice)}
                readOnly
                className='flex-1 rounded border bg-gray-50 px-2 py-1.5 text-center'
              />
              <span>-</span>
              <Input
                type='text'
                value={formatPrice(maxPrice)}
                readOnly
                className='flex-1 rounded border bg-gray-50 px-2 py-1.5 text-center'
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-3 font-medium'>Ngôn ngữ</h3>
          <div className='space-y-2.5'>
            {languages?.map((language) => (
              <label
                key={language.id}
                className='group flex cursor-pointer items-center gap-2'
              >
                <label className='relative flex cursor-pointer items-center'>
                  <input
                    checked={selectedLanguages.includes(language.id)}
                    type='checkbox'
                    onChange={() => toggleLanguage(language.id)}
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
                  {language.name}
                </span>
              </label>
            ))}
          </div>
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
                    checked={selectedRatings.includes(5 - index)}
                    type='checkbox'
                    onChange={() => toggleRating(5 - index)}
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

        <Button className='bg-green-primary w-full cursor-pointer rounded-lg py-2.5 font-medium text-white transition'>
          Áp dụng bộ lọc
        </Button>
      </div>
    </div>
  );
}
