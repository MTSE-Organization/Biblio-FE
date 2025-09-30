import { List, ListItem } from '@/components/list';

export default function Filters() {
  return (
    <div className='flex w-1/4 flex-col rounded-md bg-white'>
      <div className='border-b px-5 py-4'>
        <h1 className='text-green-primary text-xl font-semibold uppercase'>
          Lọc theo
        </h1>
      </div>
      <div className='flex flex-col px-5 py-4'>
        <List className='flex flex-col gap-3'>
          <ListItem className='mb-2'>
            <span className='font-semibold uppercase'>Danh mục</span>
          </ListItem>
          <ListItem className='flex gap-2'>
            <div className='inline-flex items-center'>
              <label className='relative flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  id='check'
                  className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                />
                <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3.5 w-3.5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    stroke='currentColor'
                    strokeWidth='1'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    />
                  </svg>
                </span>
              </label>
            </div>
            <p>Tiểu thuyết</p>
          </ListItem>
          <ListItem className='flex gap-2'>
            <div className='inline-flex items-center'>
              <label className='relative flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  id='check'
                  className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                />
                <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3.5 w-3.5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    stroke='currentColor'
                    strokeWidth='1'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    />
                  </svg>
                </span>
              </label>
            </div>
            <p>Tiểu thuyết</p>
          </ListItem>
          <ListItem className='flex gap-2'>
            <div className='inline-flex items-center'>
              <label className='relative flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  id='check'
                  className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                />
                <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3.5 w-3.5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    stroke='currentColor'
                    strokeWidth='1'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    />
                  </svg>
                </span>
              </label>
            </div>
            <p>Tiểu thuyết</p>
          </ListItem>
          <ListItem className='flex gap-2'>
            <div className='inline-flex items-center'>
              <label className='relative flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  id='check'
                  className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                />
                <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3.5 w-3.5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    stroke='currentColor'
                    strokeWidth='1'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    />
                  </svg>
                </span>
              </label>
            </div>
            <p>Tiểu thuyết</p>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
