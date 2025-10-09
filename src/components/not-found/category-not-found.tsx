import { itemNotFound } from '@/assets';
import NotFound from '@/components/not-found/not-found';

export default function CategoryNotFound() {
  return <NotFound title='Không tìm thấy danh mục' icon={itemNotFound.src} />;
}
