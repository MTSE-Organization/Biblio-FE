'use client';

import { Button } from '@/components/form';

export default function RefundButton() {
  return (
    <Button className='bg-amber-500 hover:bg-amber-500/80' variant={'primary'}>
      Yêu cầu trả hàng/hoàn tiền
    </Button>
  );
}
