import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { SORT_OPTIONS } from '@/constants';

export default function SortSelect({
  defaultOption,
  onChange
}: {
  defaultOption: any;
  onChange: (sortBy: string, sortOrder: string) => void;
}) {
  const handleChange = (value: string) => {
    const option = SORT_OPTIONS.find((opt) => opt.value === value);
    if (option) onChange(option.sortBy, option.sortOrder);
  };

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm text-gray-600'>Sắp xếp:</span>
      <Select defaultValue={defaultOption.value} onValueChange={handleChange}>
        <SelectTrigger className='w-48'>
          <SelectValue placeholder='Sắp xếp theo' />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
