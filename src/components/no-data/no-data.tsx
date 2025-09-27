import { emptyData } from '@/assets';
import Image from 'next/image';

export default function NoData() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 py-4'>
      <Image
        src={emptyData.src}
        width={200}
        height={80}
        alt='Không có dữ liệu'
      />
      <p>Không có dữ liệu</p>
    </div>
  );
}
