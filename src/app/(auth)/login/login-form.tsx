'use client';

import { whiteLogo } from '@/assets';
import { Breadcrumb, Button, Col, InputField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import PasswordField from '@/components/form/password-field';
import { ErrorCode, storageKeys } from '@/constants';
import { cn } from '@/lib';
import { logger } from '@/logger';
import { useLoginMutation, useProfileQuery } from '@/queries';
import route from '@/routes';
import { loginSchema } from '@/schemaValidations';
import { useAuthStore } from '@/store';
import { LoginBodyType } from '@/types/auth.type';
import { notify, setData } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ButtonLoginGoogle from './button-login-google';
import { CircleLoading } from '@/components/loading';

export default function LoginForm() {
  const profileQuery = useProfileQuery();
  const loginMutation = useLoginMutation();
  const router = useRouter();
  const { setProfile } = useAuthStore();
  const defaultValues: LoginBodyType = {
    email: '',
    password: ''
  };
  const onSubmit = async (values: LoginBodyType) => {
    await loginMutation.mutateAsync(values, {
      onSuccess: async (res) => {
        if (res.result) {
          const accessToken = res.data?.token!;
          setData(storageKeys.ACCESS_TOKEN, accessToken);
          notify.success('Đăng nhập thành công');
          const profileRes = await profileQuery.refetch();
          const profile = profileRes.data?.data!;
          setProfile(profile);
          router.push(route.home);
        } else {
          const errorCode = res.code;
          if (errorCode === ErrorCode.NETWORK_ECONNREFUSED) {
            notify.error('Có lỗi kết nối đến server');
          } else {
            notify.error('Email hoặc mật khẩu không chính xác');
          }
        }
      },
      onError: (error) => {
        logger.error('Error while logging in: ', error);
        notify.error('Có lỗi xảy ra khi đăng nhập');
      }
    });
  };
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: route.home },
          { label: 'Đăng nhập' }
        ]}
        separator='/'
      />
      <div className='py-25 max-[1600px]:py-20'>
        <div className='container mx-auto'>
          <div className='mx-auto max-w-120 rounded border border-solid border-gray-100 bg-white p-7.5'>
            <div className='mb-7.5 flex h-full w-full items-center justify-center'>
              <Image
                src={whiteLogo.src}
                alt='Biblio Logo'
                width={338}
                height={101.11}
                className='h-auto w-full object-cover'
              />
            </div>
            <BaseForm
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              schema={loginSchema}
            >
              {(form) => (
                <>
                  <Row>
                    <Col>
                      <InputField
                        name='email'
                        className='text-md! focus-visible:ring-green-primary h-10! py-2!'
                        labelClassName='text-md'
                        control={form.control}
                        label='Email'
                        placeholder='Nhập email...'
                        type='text'
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <PasswordField
                        className='text-md! focus-visible:ring-green-primary h-10! py-2!'
                        labelClassName='text-md'
                        name='password'
                        control={form.control}
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu...'
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className='items-end'>
                      <Link
                        href={route.forgotPassword}
                        className='text-green-primary font-medium transition-all ease-linear hover:opacity-80'
                      >
                        Quên mật khẩu?
                      </Link>
                    </Col>
                  </Row>
                  <Button
                    className={cn(
                      'bg-green-primary w-full hover:bg-emerald-700',
                      {
                        'pointer-events-none': loginMutation.isPending
                      }
                    )}
                  >
                    {loginMutation.isPending ? <CircleLoading /> : 'Đăng nhập'}
                  </Button>
                </>
              )}
            </BaseForm>
            <div className='my-4 flex items-center gap-3'>
              <div className='bg-border h-px flex-1'></div>
              <span className='text-muted-foreground text-sm'>Hoặc</span>
              <div className='bg-border h-px flex-1'></div>
            </div>
            <ButtonLoginGoogle />
            <div className='mt-6 space-x-1 text-center text-sm'>
              <span>Bạn chưa có tài khoản?</span>
              <Link
                href={route.register}
                className='hover:text-green-primary underline'
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
