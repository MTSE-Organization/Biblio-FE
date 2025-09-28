'use client';

import {
  Button,
  Col,
  InputField,
  Row,
  SelectField,
  ToolTip
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { List, ListItem } from '@/components/list';
import { Modal } from '@/components/modal';
import { Separator } from '@/components/ui/separator';
import useDisclosure from '@/hooks/use-disclosure';
import { cn } from '@/lib';
import {
  useAddressListQuery,
  useCreateAddressMutation,
  usePublicAddressHamletListQuery,
  usePublicAddressProvinceListQuery,
  usePublicAddressWardListQuery,
  useUpdateAddressMutation
} from '@/queries';
import { addressSchema } from '@/schemaValidations';
import { AddressBodyType } from '@/types';
import { ArrowLeftFromLine, Pencil, Save, Trash } from 'lucide-react';
import { useState } from 'react';

export default function AddressList() {
  const { opened, open, close } = useDisclosure();
  const [provinceId, setProvinceId] = useState<
    string | number | (string | number)[] | null
  >(null);
  const [wardId, setWardId] = useState<
    string | number | (string | number)[] | null
  >(null);
  const publicAddressProvinceListQuery = usePublicAddressProvinceListQuery();
  const publicAddressWardListQuery = usePublicAddressWardListQuery(
    provinceId as string
  );
  const publicAddressHamletListQuery = usePublicAddressHamletListQuery(
    wardId as string
  );

  const addressListQuery = useAddressListQuery();
  const createAddMutation = useCreateAddressMutation();
  const updateAddressMutation = useUpdateAddressMutation();

  const provinceList = publicAddressProvinceListQuery.data?.data;
  const wardList = publicAddressWardListQuery.data?.data;
  const hamletList = publicAddressHamletListQuery.data?.data?.hamlet_address;

  const addressList = addressListQuery.data?.data.content || [];

  const handleOpen = () => {
    open();
  };

  const defaultValues: AddressBodyType = {
    city: '',
    detail: '',
    district: '',
    hamlet: '',
    ward: '',
    latitude: 0,
    longitude: 0,
    isDefault: false
  };

  const onSubmit = async (values: AddressBodyType) => {
    const province = provinceList?.find(
      (province) => province.id === +values.city
    );
    const ward = wardList?.find((ward) => ward.id === +values.ward);
    const hamlet = hamletList?.find((hamlet) => hamlet.id === +values.hamlet);
    const payload: AddressBodyType = {
      ...values,
      city: province?.name ?? '',
      ward: ward?.name ?? '',
      hamlet: hamlet?.name ?? '',
      district: '',
      isDefault: false,
      latitude: +(province?.lat ?? 0),
      longitude: +(province?.lng ?? 0)
    };
    await createAddMutation.mutateAsync(payload);
  };

  return (
    <>
      <div className='h-full py-4'>
        <div className='flex justify-end border-b-1 border-solid border-gray-100 pr-4 pb-4'>
          <Button variant={'primary'} onClick={handleOpen}>
            Thêm địa chỉ
          </Button>
        </div>
        <List className='p-4'>
          {addressList.map((address, index) => (
            <ListItem
              key={address.id}
              className={cn('flex items-center justify-between py-4', {
                'border-b border-solid border-gray-100': addressList.length > 1
              })}
            >
              <div className='flex items-center gap-x-2'>
                Địa chỉ {index + 1}: {address.detail}, {address.hamlet}, &nbsp;
                {address.city}{' '}
                {address.isDefault && (
                  <div className='bg-green-primary rounded-lg px-2 py-0.5 text-white'>
                    Mặc định
                  </div>
                )}
              </div>
              <div className='flex gap-x-2'>
                <ToolTip title='Sửa'>
                  <Button
                    variant={'ghost'}
                    className='size-5 p-0 hover:bg-transparent'
                  >
                    <Pencil className='size-5 stroke-blue-700/80' />
                  </Button>
                </ToolTip>
                <div className='h-5 w-px bg-gray-200' />
                <ToolTip title='Xóa'>
                  <Button
                    variant={'ghost'}
                    className='size-5 p-0 hover:bg-transparent'
                  >
                    <Trash className='size-5 stroke-red-500' />
                  </Button>
                </ToolTip>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
      <Modal open={opened} onClose={close}>
        <BaseForm
          defaultValues={defaultValues}
          schema={addressSchema}
          onSubmit={onSubmit}
          className='h-100 w-200 rounded-lg p-4'
        >
          {(form) => (
            <>
              <Row>
                <Col span={12}>
                  <SelectField
                    control={form.control}
                    name='city'
                    label='Tỉnh, thành phố'
                    placeholder='Chọn tỉnh, thành phố'
                    required
                    getLabel={(opt) => opt.label}
                    getValue={(opt) => opt.value}
                    options={
                      provinceList?.map((province) => ({
                        label: province.name,
                        value: province.id.toString()
                      })) || []
                    }
                    onValueChange={(value) => setProvinceId(value)}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    control={form.control}
                    name='ward'
                    label='Phường, xã'
                    placeholder='Chọn phường, xã'
                    required
                    getLabel={(opt) => opt.label}
                    getValue={(opt) => opt.value}
                    options={
                      wardList?.map((ward) => ({
                        label: ward.name,
                        value: ward.id.toString()
                      })) || []
                    }
                    onValueChange={(value) => setWardId(value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <SelectField
                    control={form.control}
                    name='hamlet'
                    label='Tòa nhà, hẻm, đường'
                    placeholder='Chọn tòa nhà, hẻm, đường'
                    required
                    getLabel={(opt) => opt.label}
                    getValue={(opt) => opt.value}
                    options={
                      hamletList?.map((hamlet) => ({
                        label: hamlet.name,
                        value: hamlet.id.toString()
                      })) || []
                    }
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    control={form.control}
                    name='detail'
                    label='Địa chỉ chi tiết'
                    placeholder='Nhập địa chỉ chi tiết'
                    required
                  />
                </Col>
              </Row>
              <Row className='justify-end'>
                <Col span={4}>
                  <Button type='button' onClick={close} variant={'destructive'}>
                    <ArrowLeftFromLine />
                    Hủy
                  </Button>
                </Col>
                <Col span={4}>
                  <Button
                    disabled={!form.formState.isDirty}
                    type='submit'
                    variant={'primary'}
                  >
                    <Save />
                    Thêm
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </BaseForm>
      </Modal>
    </>
  );
}
