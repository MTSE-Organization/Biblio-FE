import { itemNotFound } from '@/assets';
import NotFound from '@/components/not-found/not-found';

export default function ProductNotFound() {
  return <NotFound title='Không tìm thấy sách' icon={itemNotFound.src} />;
}
