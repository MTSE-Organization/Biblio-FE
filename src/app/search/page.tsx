import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import FilterSidebar from './_components/FilterSidebar';

export default function SearchPage() {
  return (
    <div className='flex gap-4'>
      <FilterSidebar />
      <div className='flex-1'>
        <div className='mb-4 rounded-lg bg-white p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-600'>
              Tìm thấy <span className='font-semibold text-gray-900'>128</span>{' '}
              sản phẩm
            </p>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-600'>Sắp xếp:</span>
              <Select defaultValue='relevance'>
                <SelectTrigger className='w-48'>
                  <SelectValue placeholder='Sắp xếp theo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='relevance'>Liên quan nhất</SelectItem>
                  <SelectItem value='price_asc'>Giá thấp đến cao</SelectItem>
                  <SelectItem value='price_desc'>Giá cao đến thấp</SelectItem>
                  <SelectItem value='rating'>Đánh giá cao nhất</SelectItem>
                  <SelectItem value='newest'>Mới nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>Books</div>
      </div>
    </div>
  );
}
