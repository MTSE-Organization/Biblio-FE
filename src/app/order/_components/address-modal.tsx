'use client';

import { addressApiRequest } from '@/api-requests';
import {
  Button,
  Col,
  InputField,
  Row,
  SelectField,
  TextAreaField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { CircleLoading } from '@/components/loading';
import { Modal } from '@/components/modal';
import {
  useCreateAddressMutation,
  usePublicAddressDistrictListQuery,
  usePublicAddressHamletListQuery,
  usePublicAddressProvinceListQuery,
  usePublicAddressWardListQuery,
  useUpdateAddressMutation
} from '@/queries';
import { addressSchema } from '@/schemaValidations';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { AddressBodyType, AddressResType } from '@/types';
import { notify } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { ArrowLeftFromLine, Save } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

const AddressModal = ({
  opened,
  onClose,
  address
}: {
  opened: boolean;
  onClose: () => void;
  address?: AddressResType | null;
}) => {
  const { withLoading } = useAppLoadingStore();
  const [provinceId, setProvinceId] = useState<
    string | number | (string | number)[] | null
  >(null);
  const [districtId, setDistrictId] = useState<
    string | number | (string | number)[] | null
  >(null);
  const [wardId, setWardId] = useState<
    string | number | (string | number)[] | null
  >(null);
  const [detailSearch, setDetailSearch] = useState('');
  const publicAddressProvinceListQuery = usePublicAddressProvinceListQuery();
  const publicAddressDistrictListQuery = usePublicAddressDistrictListQuery(
    provinceId as string
  );
  const publicAddressWardListQuery = usePublicAddressWardListQuery(
    districtId as string
  );
  const queryClient = useQueryClient();

  const createAddressMutation = useCreateAddressMutation();
  const updateAddressMutation = useUpdateAddressMutation();

  const provinceList = publicAddressProvinceListQuery.data?.data;
  const districtList = publicAddressDistrictListQuery.data?.data;
  const wardList = publicAddressWardListQuery.data?.data;

  const province = provinceList?.find(
    (province) => province.id.toString() === provinceId
  );
  const district = districtList?.find(
    (district) => district.id.toString() === districtId
  );
  const ward = wardList?.find((ward) => ward.id.toString() === wardId);

  const publicAddressHamletListQuery = usePublicAddressHamletListQuery({
    city: district?.name ?? '',
    district: ward?.name ?? '',
    input: detailSearch,
    state: province?.name ?? '',
    enabled:
      !!detailSearch && !!province?.name && !!district?.name && !!ward?.name
  });

  const loading =
    publicAddressProvinceListQuery.isLoading ||
    publicAddressDistrictListQuery.isLoading ||
    publicAddressWardListQuery.isLoading;

  const hamletList = useMemo(
    () => publicAddressHamletListQuery.data?.data.content || [],
    [publicAddressHamletListQuery.data?.data.content]
  );

  const debouncedSetDetailSearch = useMemo(
    () => debounce((val: string) => setDetailSearch(val), 400),
    []
  );

  const defaultValues: AddressBodyType = {
    city: '',
    detail: '',
    district: '',
    hamlet: '',
    ward: '',
    latitude: 0,
    longitude: 0,
    isDefault: false,
    phoneNumber: '',
    receiverName: ''
  };

  const initialValues: AddressBodyType = useMemo(
    () => ({
      city: (provinceId as string) ?? '',
      district: (districtId as string) ?? '',
      ward: (wardId as string) ?? '',
      hamlet:
        hamletList.find((hamlet) => hamlet.name === address?.hamlet)?.id ?? '',
      detail: address?.detail ?? '',
      isDefault: address?.isDefault ?? false,
      latitude: address?.latitude ?? 0,
      longitude: address?.longitude ?? 0,
      phoneNumber: address?.phoneNumber ?? '',
      receiverName: address?.receiverName ?? ''
    }),
    [address, districtId, hamletList, provinceId, wardId]
  );

  useEffect(() => {
    if (address) {
      setProvinceId(
        provinceList
          ?.find((province) => province.name === address?.city)
          ?.id?.toString() ?? ''
      );
    }
  }, [address, address?.city, provinceList]);

  useEffect(() => {
    if (address) {
      setDistrictId(
        districtList
          ?.find((district) => district.name === address?.district)
          ?.id?.toString() ?? ''
      );
    }
  }, [address?.district, districtList, address]);

  useEffect(() => {
    if (address) {
      setWardId(
        wardList?.find((ward) => ward.name === address?.ward)?.id?.toString() ??
          ''
      );
    }
  }, [address, address?.ward, wardList]);

  useEffect(() => {
    if (address?.hamlet) {
      setDetailSearch(address?.hamlet ?? '');
    } else {
      setDetailSearch('');
    }
  }, [address?.hamlet]);

  const mutation = address ? updateAddressMutation : createAddressMutation;
  const onSubmit = async (values: AddressBodyType) => {
    const hamlet = hamletList?.find((h) => h.id === values.hamlet);

    const coords = await addressApiRequest.getGeoCoords({
      placeid: hamlet?.place_id ?? ''
    });

    const payload: AddressBodyType = {
      ...values,
      city: province?.name ?? '',
      ward: ward?.name ?? '',
      hamlet: hamlet?.name ?? '',
      district: district?.name ?? '',
      isDefault: address?.isDefault ?? false,
      latitude: coords.data?.lat ?? 0,
      longitude: coords.data?.lng ?? 0
    };
    await withLoading(
      mutation.mutateAsync(address ? { ...payload, id: address?.id } : payload)
    );
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['address-list'] })
    ]);
    notify.success(`${address ? 'Cập nhật' : 'Thêm mới'} địa chỉ thành công`);
    onClose();
  };

  return (
    <Modal open={opened} onClose={onClose}>
      <h2 className='border-b p-4 text-lg font-semibold'>
        Thêm địa chỉ mới (Dùng địa chỉ trước sáp nhập)
      </h2>
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
                <InputField
                  control={form.control}
                  name='receiverName'
                  label='Tên người nhận'
                  placeholder='Tên người nhận'
                  required
                />
              </Col>
              <Col span={12}>
                <InputField
                  control={form.control}
                  name='phoneNumber'
                  label='Số điện thoại người nhận'
                  placeholder='Số điện thoại người nhận'
                  required
                />
              </Col>
            </Row>
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
                  disabled={!provinceId}
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
                  disabled={!districtId}
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
                  disabled={!wardId}
                  label='Tòa nhà, hẻm, đường'
                  loading={
                    publicAddressHamletListQuery.isLoading ||
                    publicAddressHamletListQuery.isFetching
                  }
                  placeholder='Chọn tòa nhà, hẻm, đường'
                  required
                  options={hamletList?.map((hamlet) => ({
                    label: hamlet.name,
                    value: hamlet.id.toString()
                  }))}
                  getLabel={(opt) => opt.label}
                  getValue={(opt) => opt.value}
                  onChange={(value) =>
                    debouncedSetDetailSearch(value as string)
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
                  onClick={onClose}
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
                      {address ? 'Cập nhật' : 'Thêm'}
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
  );
};

export default React.memo(AddressModal);
