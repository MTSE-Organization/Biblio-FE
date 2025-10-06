'use client';

import AddressModal from '@/app/order/_components/address-modal';
import { Button } from '@/components/form';
import { List, ListItem } from '@/components/list';
import { Modal } from '@/components/modal';
import { Badge } from '@/components/ui/badge';
import useDisclosure from '@/hooks/use-disclosure';
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
  const updateModal = useDisclosure();
  const { addressId, setAddressId } = useOrderStore();
  const [selectedAddress, setSelectedAddress] = useState<AddressResType | null>(
    null
  );
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    if (addressId) setSelectedId(addressId);
  }, [addressId]);

  const handleUpdate = (addr: AddressResType) => {
    setSelectedAddress(addr);
    updateModal.open();
  };

  const handleConfirm = () => {
    setAddressId(selectedId);
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className='flex min-h-[60dvh] w-150 flex-col p-4'>
          <div className='flex items-center justify-between border-b pb-2'>
            <h3 className='text-base font-semibold'>Chọn địa chỉ</h3>
            <Button
              variant='ghost'
              onClick={onClose}
              className='text-destructive h-fit px-1'
            >
              <X className='size-5' />
            </Button>
          </div>

          <div className='flex-1 overflow-y-auto pt-2'>
            <List>
              {addressList.map((address) => (
                <ListItem
                  key={address.id}
                  className='flex flex-wrap items-start justify-between gap-2 not-last:mb-3'
                >
                  <label className='flex flex-1 cursor-pointer gap-2 rounded-md border p-2 transition-all hover:bg-gray-50'>
                    <input
                      type='radio'
                      checked={address.id === selectedId}
                      onChange={() => setSelectedId(address.id)}
                      className='peer h-4 w-4 cursor-pointer accent-blue-500'
                    />
                    <div>
                      <p className='text-sm leading-tight'>
                        {address.detail}, {address.hamlet}, {address.ward},{' '}
                        {address.district}, {address.city}
                      </p>
                      {address.isDefault && (
                        <Badge className='bg-green-primary mt-2 py-0.5 text-xs font-medium'>
                          Mặc định
                        </Badge>
                      )}
                    </div>
                  </label>

                  <Button
                    variant='ghost'
                    onClick={() => handleUpdate(address)}
                    className='text-blue-500 hover:text-blue-400'
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
            <Button variant='primary' onClick={handleConfirm}>
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>

      <AddressModal
        opened={updateModal.opened}
        onClose={updateModal.close}
        address={selectedAddress}
      />
    </>
  );
}
