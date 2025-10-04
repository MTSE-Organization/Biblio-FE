'use client';

import { Button } from '@/components/form';
import { List, ListItem } from '@/components/list';
import { Modal } from '@/components/modal';
import { Badge } from '@/components/ui/badge';
import { useOrderStore } from '@/store';
import { AddressResType } from '@/types';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ChangeAddressModal({
  open,
  onClose,
  addressList
}: {
  open: boolean;
  onClose: () => void;
  addressList: AddressResType[];
}) {
  const { addressId, setAddressId } = useOrderStore();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  useEffect(() => {
    if (addressId) setSelectedAddress(addressId);
  }, [addressId]);
  return (
    <Modal
      variants={{
        initial: { scale: 0.8, opacity: 0.8 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0.8 }
      }}
      open={open}
      onClose={onClose}
    >
      <div className='flex min-h-[60dvh] w-150 flex-col p-4'>
        <div className='flex items-center justify-between border-b pb-2'>
          <h3 className='text-base font-semibold'>Chọn địa chỉ</h3>
          <Button
            onClick={onClose}
            className='text-destructive hover:text-destructive/80 h-5 h-fit px-0! pt-0!'
            variant={'ghost'}
          >
            <X className='size-5' />
          </Button>
        </div>

        <div className='flex-1 overflow-y-auto pt-2'>
          <List>
            {addressList.map((address) => (
              <ListItem
                key={address.id}
                className='flex flex-wrap items-start justify-between gap-x-2 not-last:mb-4'
              >
                <label className='relative flex cursor-pointer items-start gap-x-2 rounded-md border border-transparent p-2 transition-all peer-checked:border-blue-500'>
                  <input
                    type='radio'
                    checked={address.id === selectedAddress}
                    onChange={() => setSelectedAddress(address.id)}
                    className='peer mt-0.5 h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 ease-in-out checked:border-blue-500 checked:bg-blue-500 hover:scale-105 hover:border-blue-400 focus:ring-blue-200 focus:outline-none'
                  />
                  <span className="absolute top-2 left-2 mt-0.5 flex h-4 w-4 items-center justify-center before:block before:h-1.5 before:w-1.5 before:scale-0 before:rounded-full before:bg-white before:transition-transform before:duration-200 before:content-[''] peer-checked:before:scale-100"></span>

                  <div className='ml-1'>
                    <p className='leading-tight'>
                      {address.detail}, {address.hamlet},<br />
                      {address.ward}, {address.district}, {address.city}
                    </p>
                    {address.isDefault && (
                      <Badge className='bg-green-primary hover:bg-green-primary mt-2 py-1 font-medium'>
                        Mặc định
                      </Badge>
                    )}
                  </div>
                </label>
                <Button
                  className='text-blue-500 hover:text-blue-500/80'
                  variant={'ghost'}
                >
                  Cập nhật
                </Button>
              </ListItem>
            ))}
          </List>
        </div>

        <div className='mt-4 flex justify-end gap-3 border-t pt-3'>
          <Button variant='outline' onClick={onClose}>
            Trở lại
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              setAddressId(selectedAddress);
              onClose();
            }}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
  );
}
