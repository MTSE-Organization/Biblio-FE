'use client';

import { addressApiRequest } from '@/api-requests';
import {
  Button,
  Col,
  Row,
  SelectField,
  TextAreaField,
  ToolTip
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { List, ListItem } from '@/components/list';
import { CircleLoading } from '@/components/loading';
import { Modal } from '@/components/modal';
import { NoData } from '@/components/no-data';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import useDisclosure from '@/hooks/use-disclosure';
import { cn } from '@/lib';
import { logger } from '@/logger';
import {
  useAddressListQuery,
  useAddressQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  usePublicAddressDistrictListQuery,
  usePublicAddressHamletListQuery,
  usePublicAddressProvinceListQuery,
  usePublicAddressWardListQuery,
  useSetDefaultAddressMutation,
  useUpdateAddressMutation
} from '@/queries';
import { addressSchema } from '@/schemaValidations';
import { AddressBodyType, AddressGeoCoordsResType } from '@/types';
import { notify } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeftFromLine,
  Check,
  Info,
  Pencil,
  Save,
  Trash
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function AddressList() {
  const { opened, open, close } = useDisclosure();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [provinceId, setProvinceId] = useState<
    string | number | (string | number)[] | null
  >(null);
  const [districtId, setDistrictId] = useState<
    string | number | (string | number)[] | null
  >(null);
  const [wardId, setWardId] = useState<
    string | number | (string | number)[] | null
  >(null);
  const publicAddressProvinceListQuery = usePublicAddressProvinceListQuery();
  const publicAddressDistrictListQuery = usePublicAddressDistrictListQuery(
    provinceId as string
  );
  const publicAddressWardListQuery = usePublicAddressWardListQuery(
    districtId as string
  );
  const publicAddressHamletListQuery = usePublicAddressHamletListQuery(
    wardId as string
  );

  const addressListQuery = useAddressListQuery();
  const addressQuery = useAddressQuery(selectedAddress);
  const createAddressMutation = useCreateAddressMutation();
  const updateAddressMutation = useUpdateAddressMutation();
  const deleteAddressMutation = useDeleteAddressMutation();
  const setDefaultAddressMutation = useSetDefaultAddressMutation();

  const queryClient = useQueryClient();
  const provinceList = publicAddressProvinceListQuery.data?.data;
  const districtList = publicAddressDistrictListQuery.data?.data;
  const wardList = publicAddressWardListQuery.data?.data;
  const hamletList = publicAddressHamletListQuery.data?.data?.hamlet_address;

  const addressList = addressListQuery.data?.data.content || [];
  const address = addressQuery.data?.data;

  const loading =
    addressQuery.isLoading ||
    addressQuery.isFetching ||
    publicAddressProvinceListQuery.isLoading ||
    publicAddressDistrictListQuery.isLoading ||
    publicAddressWardListQuery.isLoading ||
    publicAddressHamletListQuery.isLoading;

  const handleOpen = () => {
    open();
    setSelectedAddress('');
    setProvinceId('');
    setWardId('');
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

  useEffect(() => {
    if (selectedAddress) {
      setProvinceId(
        provinceList
          ?.find((province) => province.name === address?.city)
          ?.id?.toString() ?? ''
      );
    }
  }, [selectedAddress, address?.city, provinceList]);

  useEffect(() => {
    if (selectedAddress) {
      setDistrictId(
        districtList
          ?.find((district) => district.name === address?.district)
          ?.id?.toString() ?? ''
      );
    }
  }, [address?.district, districtList, selectedAddress]);

  useEffect(() => {
    if (selectedAddress) {
      setWardId(
        wardList?.find((ward) => ward.name === address?.ward)?.id?.toString() ??
          ''
      );
    }
  }, [selectedAddress, address?.ward, wardList]);

  const city =
    provinceList
      ?.find((province) => province.name === address?.city)
      ?.id?.toString() ?? '';

  const district =
    districtList
      ?.find((district) => district.name === address?.district)
      ?.id?.toString() ?? '';

  const ward =
    wardList?.find((ward) => ward.name === address?.ward)?.id?.toString() ?? '';

  const hamlet =
    hamletList
      ?.find((hamlet) => hamlet.name === address?.hamlet)
      ?.id?.toString() ?? '';

  const initialValues: AddressBodyType = useMemo(
    () => ({
      city: city,
      district: district,
      ward: ward,
      hamlet: hamlet,
      detail: address?.detail ?? '',
      isDefault: address?.isDefault ?? false,
      latitude: address?.latitude ?? 0,
      longitude: address?.longitude ?? 0
    }),
    [
      address?.detail,
      address?.isDefault,
      address?.latitude,
      address?.longitude,
      city,
      district,
      hamlet,
      ward
    ]
  );

  const getMinCoords = (arr: AddressGeoCoordsResType[]) => {
    if (arr.length === 0) return null;

    let minLat = Infinity;
    let minLon = Infinity;

    arr.forEach((item) => {
      const [latMin, latMax, lonMin, lonMax] = item.boundingbox.map(Number);

      if (latMin < minLat) minLat = latMin;
      if (lonMin < minLon) minLon = lonMin;
    });

    return { lat: minLat, lng: minLon };
  };

  const mutation = selectedAddress
    ? updateAddressMutation
    : createAddressMutation;
  const onSubmit = async (values: AddressBodyType) => {
    const province = provinceList?.find(
      (province) => province.id === +values.city
    );
    const district = districtList?.find(
      (district) => district.id === +values.district
    );
    const ward = wardList?.find((ward) => ward.id === +values.ward);
    const hamlet = hamletList?.find((hamlet) => hamlet.id === +values.hamlet);
    const coords = await addressApiRequest.getGeoCoords(
      `${ward?.name}, ${district?.name}, ${province?.name}`
    );
    const minCoords = getMinCoords(coords.data || []);

    const payload: AddressBodyType = {
      ...values,
      city: province?.name ?? '',
      ward: ward?.name ?? '',
      hamlet: hamlet?.name ?? '',
      district: district?.name ?? '',
      isDefault: false,
      latitude: +(minCoords?.lat ?? 0),
      longitude: +(minCoords?.lng ?? 0)
    };

    await mutation.mutateAsync(
      selectedAddress ? { ...payload, id: address?.id } : payload
    );
    queryClient.invalidateQueries({ queryKey: ['address'] });
    addressListQuery.refetch();
    notify.success(
      `${selectedAddress ? 'Cập nhật' : 'Thêm mới'} địa chỉ thành công`
    );
    close();
  };

  const handleEdit = (id: string) => {
    open();
    setSelectedAddress(id);
  };

  const handleDelete = async (id: string) => {
    await deleteAddressMutation.mutateAsync(id, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success('Xóa thành công');
          addressListQuery.refetch();
        }
      },
      onError: (error) => {
        notify.error('Có lỗi xảy ra');
        logger.error('Error while deleting address', error);
      }
    });
  };

  const handleSetDefault = async (id: string) => {
    await setDefaultAddressMutation.mutateAsync(id, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success('Đặt địa chỉ mặc định thành công');
          addressListQuery.refetch();
        }
      },
      onError: (error) => {
        notify.error('Có lẽ xảy ra');
        logger.error('Error while setting default address', error);
      }
    });
  };

  return (
    <>
      <div className='h-full bg-white py-4'>
        <div className='flex justify-end border-b-1 border-solid border-gray-100 pr-4 pb-4'>
          <Button variant={'primary'} onClick={handleOpen}>
            Thêm địa chỉ
          </Button>
        </div>
        <List className='px-4'>
          {addressList.length > 0 ? (
            addressList.map((address, index) => (
              <ListItem
                key={address.id}
                className={cn('flex items-center justify-between py-4', {
                  'border-b border-solid border-gray-100':
                    addressList.length > 1
                })}
              >
                <div className='flex items-center gap-x-2'>
                  Địa chỉ {index + 1}: {address.detail}, {address.hamlet},
                  &nbsp;
                  {address.ward}, &nbsp;
                  {address.district}, &nbsp;
                  {address.city}
                  {address.isDefault && (
                    <div className='bg-green-primary rounded-lg px-2 py-0.5 text-white'>
                      Mặc định
                    </div>
                  )}
                </div>
                <div className='flex h-5 gap-x-2'>
                  <ToolTip title='Sửa'>
                    <Button
                      onClick={() => handleEdit(address.id)}
                      variant={'ghost'}
                      className='size-5 p-0 hover:bg-transparent'
                    >
                      <Pencil className='size-5 stroke-blue-700/80' />
                    </Button>
                  </ToolTip>
                  <Separator orientation='vertical' />
                  <ToolTip title='Đặt làm mặc định'>
                    <Button
                      onClick={() => handleSetDefault(address.id)}
                      disabled={address.isDefault}
                      variant={'ghost'}
                      className='size-5 p-0 hover:bg-transparent'
                    >
                      <Check className='size-5 stroke-blue-700/80' />
                    </Button>
                  </ToolTip>
                  <Separator orientation='vertical' />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span>
                        <ToolTip title={`Xóa`}>
                          <Button className='h-5 border-none bg-transparent p-1! shadow-none hover:bg-transparent'>
                            <Trash className='size-5 stroke-red-600' />
                          </Button>
                        </ToolTip>
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-0! data-[state=closed]:slide-out-to-top-0! data-[state=open]:slide-in-from-left-0! data-[state=open]:slide-in-from-top-0! top-[30%] max-w-lg'>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-md content flex flex-nowrap items-center gap-2 font-normal'>
                          <Info className='size-8 fill-orange-500 stroke-white' />
                          Bạn có chắc chắn muốn xóa địa chỉ này không ?
                        </AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button
                            variant='outline'
                            className='border-red-500 text-red-500 transition-all duration-200 ease-linear hover:bg-transparent hover:text-red-500/80'
                          >
                            Không
                          </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(address.id)}
                          className='w-15 cursor-pointer bg-blue-700 transition-all duration-200 ease-linear hover:bg-blue-700/80'
                        >
                          {deleteAddressMutation.isPending ? (
                            <CircleLoading className='' />
                          ) : (
                            'Có'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </ListItem>
            ))
          ) : (
            <NoData />
          )}
        </List>
      </div>
      <Modal open={opened} onClose={close}>
        <BaseForm
          defaultValues={defaultValues}
          schema={addressSchema}
          onSubmit={onSubmit}
          className='relative min-h-60 w-200 rounded-lg p-4'
          initialValues={initialValues}
        >
          {(form) => (
            <>
              <Row>
                <Col span={12}>
                  <SelectField
                    control={form.control}
                    name='city'
                    loading={
                      publicAddressProvinceListQuery.isLoading ||
                      publicAddressProvinceListQuery.isFetching
                    }
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
                    onValueChange={(value) => {
                      setProvinceId(value);
                      setDistrictId('');
                      setWardId('');
                    }}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    control={form.control}
                    name='district'
                    label='Quận/Huyện'
                    loading={
                      publicAddressDistrictListQuery.isLoading ||
                      publicAddressDistrictListQuery.isFetching
                    }
                    placeholder='Quận/Huyện'
                    required
                    getLabel={(opt) => opt.label}
                    getValue={(opt) => opt.value}
                    options={
                      districtList?.map((district) => ({
                        label: district.name,
                        value: district.id.toString()
                      })) || []
                    }
                    onValueChange={(value) => {
                      setDistrictId(value);
                      setWardId('');
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <SelectField
                    control={form.control}
                    name='ward'
                    label='Phường, xã'
                    loading={
                      publicAddressWardListQuery.isLoading ||
                      publicAddressWardListQuery.isFetching
                    }
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
                <Col span={12}>
                  <SelectField
                    control={form.control}
                    name='hamlet'
                    loading={
                      publicAddressHamletListQuery.isLoading ||
                      publicAddressHamletListQuery.isFetching
                    }
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
              </Row>
              <Row>
                <Col span={24} gutter={0}>
                  <TextAreaField
                    control={form.control}
                    name='detail'
                    label='Địa chỉ chi tiết'
                    placeholder='Nhập địa chỉ chi tiết'
                    required
                  />
                </Col>
              </Row>
              <Row className='mb-0 justify-end'>
                <Col span={4}>
                  <Button
                    type='button'
                    onClick={close}
                    variant={'outline'}
                    className='text-destructive border-destructive hover:text-destructive/80 hover:bg-transparent'
                  >
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
                    {mutation.isPending ? (
                      <CircleLoading className='size-5' />
                    ) : (
                      <>
                        <Save />
                        {selectedAddress ? 'Cập nhật' : 'Thêm'}
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
              {loading && (
                <div className='absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-gray-50/50'>
                  <CircleLoading className='stroke-green-primary size-8' />
                </div>
              )}
            </>
          )}
        </BaseForm>
      </Modal>
    </>
  );
}
