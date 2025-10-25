'use client';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function ExpandableList({
  items,
  renderItem,
  limit = 10
}: {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  limit?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, limit);
  return (
    <div>
      <div className='space-y-2.5'>
        {visibleItems.map((item) => renderItem(item))}
      </div>
      {items.length > limit && (
        <div className='flex justify-center'>
          <Button
            onClick={() => setShowAll(!showAll)}
            variant={'ghost'}
            className='text-green-primary hover:text-green-primary mt-3 cursor-pointer hover:bg-transparent'
          >
            {showAll ? 'Thu gọn' : 'Xem thêm'}
            {showAll ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      )}
    </div>
  );
}
