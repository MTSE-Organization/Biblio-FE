import Image from 'next/image';

export default function NotFound({
  title,
  icon,
  width = 200,
  height = 200
}: {
  title: string;
  icon: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className='flex h-[calc(90dvh_-_32px)] flex-col items-center justify-center rounded-lg bg-white'>
      <Image src={icon} alt={title} width={width} height={height} />
      <span className='mt-4 text-center text-base font-medium'>{title}</span>
    </div>
  );
}
