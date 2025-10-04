import ChangeAddressModal from '@/app/order/_components/change-address-modal';
import { Button } from '@/components/form';
import useDisclosure from '@/hooks/use-disclosure';
import { useAddressListQuery } from '@/queries';
import { useOrderStore } from '@/store';
import { Plus } from 'lucide-react';
import React, { useEffect } from 'react';

export default function AddressList() {
  const {
    opened: openedChange,
    open: openChange,
    close: closeChange
  } = useDisclosure();
  const { addressId, setAddressId } = useOrderStore();
  const addressListQuery = useAddressListQuery();
  const addressList = addressListQuery.data?.data.content || [];
  const defaultAddress =
    addressList.find((address) => address.id === addressId) || addressList?.[0];

  const handleOpenChangeAddress = () => {
    openChange();
  };

  useEffect(() => {
    if (defaultAddress) {
      setAddressId(defaultAddress.id);
    }
  }, [defaultAddress]);

  return (
    <>
      <div className='flex w-full flex-col rounded-md bg-white px-6 py-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
        <h2 className='text-green-primary mb-3 font-medium'>
          Địa chỉ nhận hàng
        </h2>
        <div className='flex items-center justify-between'>
          {defaultAddress ? (
            <div className='flex gap-10'>
              <span className='font-bold'>Le Van A | 0901234561</span>
              <p>
                {defaultAddress.detail}, {defaultAddress.hamlet},&nbsp;
                {defaultAddress.ward}, {defaultAddress.district},&nbsp;
                {defaultAddress.city}
              </p>
            </div>
          ) : (
            'Không có địa chỉ nào'
          )}

          {addressList.length > 0 ? (
            <Button variant={'primary'} onClick={handleOpenChangeAddress}>
              Thay đổi
            </Button>
          ) : (
            <Button variant={'primary'}>
              <Plus />
              Thêm địa mới
            </Button>
          )}
        </div>
      </div>
      <ChangeAddressModal
        open={openedChange}
        onClose={closeChange}
        addressList={addressList}
      />
    </>
  );
}
