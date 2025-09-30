import { List, ListItem } from '@/components/list';

export default function BookDetailInfoSkeleton() {
  return (
    <div>
      <div className='border-b border-solid border-b-gray-200 pb-5'>
        <h2 className='skeleton h-5'></h2>
      </div>
      <div className='mt-5 flex items-center'>
        <div className='skeleton mr-2.5 flex h-5 w-50 items-center gap-1'></div>
        <p className='skeleton h-5 w-20'></p>
      </div>
      <div className='mt-5 flex items-center'>
        <div className='skeleton mr-2.5 flex h-5 w-50 items-center gap-1'></div>
        <p className='skeleton h-5 w-20'></p>
      </div>
      <div className='mt-5 flex items-center'>
        <div className='skeleton mr-2.5 flex h-5 w-50 items-center gap-1'></div>
        <p className='skeleton h-5 w-20'></p>
      </div>
      <div className='mt-5 flex items-center'>
        <div className='skeleton mr-2.5 flex h-5 w-50 items-center gap-1'></div>
        <p className='skeleton h-5 w-20'></p>
      </div>
      <List className='mt-[15px]'>
        <ListItem className='flex h-8 py-[5px] text-[#777]'>
          <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
          <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
        </ListItem>
        <ListItem className='flex h-8 py-[5px] text-[#777]'>
          <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
          <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
        </ListItem>
        <ListItem className='flex h-8 py-[5px] text-[#777]'>
          <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
          <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
        </ListItem>
        <ListItem className='flex h-8 py-[5px] text-[#777]'>
          <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
          <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
        </ListItem>
      </List>
      <div className='flex gap-3 pt-5'>
        <p className='skeleton text-green-primary h-8 w-25 text-2xl leading-[1.167] font-bold'></p>
        <p className='skeleton text-green-primary h-8 w-25 text-2xl leading-[1.167] font-bold'></p>
      </div>
      <div className='flex items-center pt-5'>
        <h5 className='skeleton mb-0 h-5 w-30 leading-[1.556] text-[#2b2b2d]'></h5>
        <div className='pl-2.5'>
          <List className='flex w-full flex-wrap'>
            <ListItem className='bg-green-primary skeleton m-0.5 h-5 w-8 rounded-[5px] border border-solid border-[#e9e9e9] px-2.5 py-[5px] text-sm leading-none text-white'></ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}
