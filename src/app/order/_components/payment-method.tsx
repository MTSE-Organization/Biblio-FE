'use client';

import { List, ListItem } from '@/components/list';
import { paymentMethods } from '@/constants';
import { useOrderStore } from '@/store';
import Image from 'next/image';
import { useEffect } from 'react';

export default function PaymentMethod() {
  const { paymentMethod, setPaymentMethod, loading } = useOrderStore();

  useEffect(() => {
    if (!paymentMethods.find((payment) => payment.value === paymentMethod))
      setPaymentMethod(paymentMethods[0].value);
  }, [paymentMethod]);

  return loading ? (
    <>
      <p className='text-green-primary skeleton mx-auto h-6 w-50 text-center text-xl font-semibold'></p>
      <List className='mt-5 mb-5 flex h-10 items-center justify-center'>
        {paymentMethods.map((payment) => (
          <ListItem
            key={payment.label}
            className={
              'flex cursor-pointer rounded bg-white px-4 py-2 transition-all duration-300'
            }
          >
            <label className='relative flex cursor-pointer items-start gap-x-2 rounded-md border border-transparent p-2 transition-all peer-checked:border-blue-500'>
              <div className='peer skeleton my-auto h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 ease-in-out hover:scale-105' />
            </label>
            <div
              title={payment.label}
              className='skeleton h-12 w-20 object-contain object-center select-none'
            />
          </ListItem>
        ))}
      </List>
    </>
  ) : (
    <>
      <p className='text-green-primary text-center text-xl font-semibold'>
        Phương thức thanh toán
      </p>
      <List className='mt-5 mb-5 flex h-10 items-center justify-center'>
        {paymentMethods.map((payment) => (
          <ListItem
            key={payment.label}
            className={
              'flex cursor-pointer rounded bg-white px-4 py-2 transition-all duration-300'
            }
          >
            <label className='relative flex cursor-pointer items-start gap-x-2 rounded-md border border-transparent p-2 transition-all peer-checked:border-blue-500'>
              <input
                type='radio'
                checked={payment.value === paymentMethod}
                onChange={() => setPaymentMethod(payment.value)}
                className='peer my-auto h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 ease-in-out checked:border-blue-500 checked:bg-blue-500 hover:scale-105 hover:border-blue-400 focus:ring-blue-200 focus:outline-none'
              />
              <span className="absolute top-2 left-2 mt-[7px] flex h-4 w-4 items-center justify-center before:block before:h-1.5 before:w-1.5 before:scale-0 before:rounded-full before:bg-white before:transition-transform before:duration-200 before:content-[''] peer-checked:before:scale-100"></span>
            </label>
            <Image
              src={payment.icon}
              alt={payment.label}
              height={48}
              title={payment.label}
              onClick={() => setPaymentMethod(payment.value)}
              width={80}
              className='h-12 w-20 object-contain object-center select-none'
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
