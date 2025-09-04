'use client';

import { whiteLogo } from '@/assets';
import {
  Breadcrumb,
  Button,
  Col,
  InputField,
  Row,
  UploadImageField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { accountErrorMaps, AppConstants, storageKeys } from '@/constants';
import { cn } from '@/lib';
import { logger } from '@/logger';
import route from '@/routes';
import { profileSchema } from '@/schemaValidations/account.schema';
import { useAuthStore } from '@/store';
import { useProfileMutation } from '@/queries/account.query';
import {
  ProfileResType,
  UpdateProfileBodyType,
  UpdateProfileType
} from '@/types';
import { applyFormErrors, notify, setData } from '@/utils';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Link from 'next/link';
import { useForgotPasswordMutation, useUploadImageMutation } from '@/queries';
import ButtonLoading from '@/components/loading/button-loading';

export default function ProfileForm() {
  const [avatarPath, setAvatarPath] = useState<string>('');
  const [isFormChanged, setIsFormChanged] = useState(false);
  const { profile } = useAuthStore();
  const profileMutation = useProfileMutation();
  const fileMutation = useUploadImageMutation();
  const forgotPasswordMutation = useForgotPasswordMutation();
  const defaultValues: UpdateProfileType = {
    fullName: '',
    email: '',
    phone: '',
    avatarPath: ''
  };

  const initialValues = useMemo<ProfileResType>(
    () => ({
      fullName: profile?.fullName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      avatarPath: profile?.avatarPath || ''
    }),
    [profile?.avatarPath, profile?.email, profile?.fullName, profile?.phone]
  );

  useEffect(() => {
    if (profile?.avatarPath) setAvatarPath(profile?.avatarPath);
  }, [profile?.avatarPath]);

  const onSubmit = async (
    values: UpdateProfileBodyType,
    form: UseFormReturn<UpdateProfileBodyType>
  ) => {
    await profileMutation.mutateAsync(
      { ...values, avatarPath },
      {
        onSuccess: (res) => {
          if (res.result) {
            notify.success('Cập nhật hồ sơ thành công');
            setIsFormChanged(false);
          } else {
            const errCode = res.code;
            if (errCode) {
              applyFormErrors(form, errCode, accountErrorMaps);
            } else {
              notify.error('Cập nhật hồ sơ thất bại');
            }
          }
        },
        onError: (error) => {
          logger.error('Error while updating profile', error);
          notify.error('Có lỗi xảy ra khi cập nhật hồ sơ');
        }
      }
    );
  };

  const handleChangePassword = async () => {
    const email = profile?.email!;
    await forgotPasswordMutation.mutateAsync(
      { email },
      {
        onError: (error) => {
          logger.error('Error while sending otp: ', error);
        }
      }
    );
    setData(storageKeys.EMAIL, email);
  };

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
              initialValues={initialValues}
              onChange={() => setIsFormChanged(true)}
            >
              {(form) => (
                <>
                  <Row>
                    <Col>
                      <UploadImageField
                        value={
                          avatarPath
                            ? `${AppConstants.contentRootUrl}${avatarPath}`
                            : ''
                        }
                        loading={fileMutation.isPending}
                        onChange={(url) => {
                          setAvatarPath(url);
                          setIsFormChanged(true);
                        }}
                        size={100}
                        uploadImageFn={async (file: Blob) => {
                          const res = await fileMutation.mutateAsync(file);
                          return res.data?.filePath ?? '';
                        }}
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
                        className='text-md!'
                        labelClassName='text-md!'
                      />
                    </Col>
                    <Col span={12}>
                      <InputField
                        control={form.control}
                        name='email'
                        label='Email'
                        required
                        placeholder='Nhập email'
                        className='text-md!'
                        labelClassName='text-md!'
                        disabled
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <InputField
                        control={form.control}
                        name='phone'
                        label='Số điện thoại'
                        required
                        placeholder='Nhập số điện thoại'
                        className='text-md!'
                        labelClassName='text-md!'
                      />
                    </Col>
                    <Col span={12}></Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        type='button'
                        className={cn(
                          'text-md bg-orange-500 hover:bg-orange-500'
                        )}
                        onClick={handleChangePassword}
                      >
                        <Link
                          href={route.user.changePassword}
                          className='block w-full'
                        >
                          Đổi mật khẩu
                        </Link>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type='submit'
                        className={cn(
                          'bg-green-primary hover:bg-green-primary text-md',
                          {
                            'cursor-not-allowed opacity-50': !isFormChanged
                          }
                        )}
                      >
                        {profileMutation.isPending ? (
                          <ButtonLoading />
                        ) : (
                          'Cập nhật'
                        )}
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
