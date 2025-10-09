import { itemNotFound } from '@/assets';
import NotFound from '@/components/not-found/not-found';

export default function PlaceOrderNotFound() {
  return (
    <NotFound
      title='Vui lòng chọn sản phẩm để thanh toán'
      icon={itemNotFound.src}
      width={150}
      height={150}
    />
  );
}
