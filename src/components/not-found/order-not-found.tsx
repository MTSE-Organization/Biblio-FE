import { orderNotFound } from '@/assets';
import NotFound from '@/components/not-found/not-found';

export default function OrderNotFound() {
  return <NotFound title='Không tìm thấy đơn hàng' icon={orderNotFound.src} />;
}
