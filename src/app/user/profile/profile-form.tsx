'use client';

import { whiteLogo } from '@/assets';
import {
  AutoCompleteField,
  Breadcrumb,
  Button,
  Col,
  InputField,
  Row,
  UploadImageField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { GENDER_MALE, genderOptions } from '@/constants';
import { cn } from '@/lib';
import route from '@/routes';
import { profileSchema } from '@/schemaValidations/account.schema';
import { ProfileResType } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfileForm() {
  const [avatarPath, setAvatarPath] = useState<string>('');
  const [isFormChanged, setIsFormChanged] = useState(false);
  const defaultValues: ProfileResType = {
    id: 0,
    fullName: '',
    email: '',
    phone: '',
    username: '',
    gender: GENDER_MALE,
    avatarPath: '',
    address: ''
  };
  const onSubmit = (values: ProfileResType) => {};
  return (
    <div>
      <Breadcrumb
        items={[{ label: 'Trang chủ', href: route.home }, { label: 'Hồ sơ' }]}
        separator='/'
      />
      <div className='py-25 max-[1600px]:py-20'>
        <div className='mx-auto min-[1200px]:w-180 min-[1440px]:w-200'>
          <div className='rounded-xl border border-solid border-gray-100 bg-white p-5'>
            <div className='mb-7.5 text-center'>
              <Image
                src={whiteLogo.src}
                width={200}
                alt='Biblio Logo'
                height={200}
                className='mx-auto block h-auto w-50'
              />
            </div>
            <BaseForm
              schema={profileSchema}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
            >
              {(form) => (
                <>
                  <Row>
                    <Col>
                      <UploadImageField
                        label='Ảnh đại diện'
                        value={avatarPath}
                        size={100}
                        onChange={(url) => {
                          setAvatarPath(url);
                          setIsFormChanged(true);
                        }}
                        uploadImageFn={async (blob) => {
                          return '';
                        }}
                        // loading={uploadImageMutation.isPending}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <InputField
                        control={form.control}
                        name='fullName'
                        label='Họ và tên'
                        required
                        placeholder='Nhập họ và tên'
                        className='text-sm'
                      />
                    </Col>
                    <Col span={12}>
                      <InputField
                        control={form.control}
                        name='email'
                        label='Email'
                        required
                        placeholder='Nhập email'
                        className='text-sm'
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <InputField
                        control={form.control}
                        name='username'
                        label='Tên đăng nhập'
                        required
                        placeholder='Nhập tên đăng nhập'
                        className='text-sm'
                      />
                    </Col>
                    <Col span={12}>
                      <InputField
                        control={form.control}
                        name='phone'
                        label='Số điện thoại'
                        required
                        placeholder='Nhập số điện thoại'
                        className='text-sm'
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <AutoCompleteField
                        control={form.control}
                        options={genderOptions}
                        name='gender'
                        label='Giới tính'
                        required
                        getLabel={(opt) => opt.label}
                        getValue={(opt) => opt.value}
                        placeholder='Chọn giới tính'
                        onValueChange={() => setIsFormChanged(true)}
                        className='text-sm'
                      />
                    </Col>
                    <Col>
                      <AutoCompleteField
                        control={form.control}
                        options={genderOptions}
                        name='address'
                        label='Địa chỉ'
                        required
                        getLabel={(opt) => opt.label}
                        getValue={(opt) => opt.value}
                        placeholder='Chọn địa chỉ'
                        onValueChange={() => setIsFormChanged(true)}
                        className='text-sm'
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        type='submit'
                        className={cn('ml-2 bg-orange-500 hover:bg-orange-500')}
                      >
                        Đổi mật khẩu
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type='submit'
                        className={cn(
                          'bg-green-primary hover:bg-green-primary ml-2',
                          {
                            'cursor-not-allowed opacity-50': !isFormChanged
                          }
                        )}
                      >
                        Cập nhật
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </BaseForm>
          </div>
        </div>
      </div>
    </div>
  );
}
