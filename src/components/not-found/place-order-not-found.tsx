import { itemNotFound } from '@/assets';
import NotFound from '@/components/not-found/not-found';

export default function PlaceOrderNotFound() {
  return (
    <NotFound
      title='Có lỗi xảy ra khi đặt hàng'
      icon={itemNotFound.src}
      width={150}
      height={150}
    />
  );
}
