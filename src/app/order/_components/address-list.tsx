'use client';

import AddressModal from '@/app/order/_components/address-modal';
import ChangeAddressModal from '@/app/order/_components/change-address-modal';
import { Button } from '@/components/form';
import useDisclosure from '@/hooks/use-disclosure';
import { useAddressListQuery } from '@/queries';
import { useOrderStore } from '@/store';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';

export default function AddressList() {
  const changeModal = useDisclosure();
  const addModal = useDisclosure();
  const { addressId, setAddressId } = useOrderStore();

  const { data } = useAddressListQuery();
  const addressList = data?.data.content ?? [];

  const defaultAddress =
    addressList.find((a) => a.id === addressId) || addressList[0];

  useEffect(() => {
    if (defaultAddress) setAddressId(defaultAddress.id);
  }, [defaultAddress]);

  return (
    <>
      <div className='flex w-full flex-col rounded-md bg-white px-6 py-4 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]'>
        <h2 className='text-green-primary mb-3 font-medium'>
          Địa chỉ nhận hàng
        </h2>
        <div className='flex items-center justify-between'>
          {defaultAddress ? (
            <div className='flex flex-wrap gap-3 text-sm'>
              <span className='font-bold'>Lê Tấn Trụ | 099999999</span>
              <p className='text-gray-700'>
                {defaultAddress.detail}, {defaultAddress.hamlet}, &nbsp;
                {defaultAddress.ward}, {defaultAddress.district}, &nbsp;
                {defaultAddress.city}
              </p>
            </div>
          ) : (
            <p className='text-gray-500'>Chưa có địa chỉ nào</p>
          )}

          <Button
            variant='primary'
            onClick={addressList.length > 0 ? changeModal.open : addModal.open}
          >
            {addressList.length > 0 ? (
              'Thay đổi'
            ) : (
              <>
                <Plus /> Thêm địa chỉ
              </>
            )}
          </Button>
        </div>
      </div>

      <ChangeAddressModal
        open={changeModal.opened}
        onClose={changeModal.close}
        addressList={addressList}
      />

      <AddressModal opened={addModal.opened} onClose={addModal.close} />
    </>
  );
}
