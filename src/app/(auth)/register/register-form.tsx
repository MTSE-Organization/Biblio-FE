'use client';

import { whiteLogo } from '@/assets';
import { Breadcrumb, Button, Col, InputField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import PasswordField from '@/components/form/password-field';
import { CircleLoading } from '@/components/loading';
import { registerErrorMaps, storageKeys } from '@/constants';
import { useNavigate } from '@/hooks';
import { logger } from '@/logger';
import { useRegisterMutation } from '@/queries';
import route from '@/routes';
import { registerSchema } from '@/schemaValidations';
import { RegisterBodyType } from '@/types';
import { applyFormErrors, notify, setData } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';

export default function RegisterForm() {
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();
  const defaultValues: RegisterBodyType = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  const onSubmit = async (
    values: RegisterBodyType,
    form: UseFormReturn<RegisterBodyType>
  ) => {
    await registerMutation.mutateAsync(values, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success(
            'Đăng ký thành công.\nMã OTP đã được gửi đến email của bạn',
            {
              style: { whiteSpace: 'pre-line' }
            }
          );
          setData(storageKeys.EMAIL, values.email);
          navigate(route.verifyOtp);
        } else {
          if (res.code) {
            applyFormErrors(form, res.code, registerErrorMaps);
          } else {
            notify.error('Đăng ký thất bại');
          }
        }
      },
      onError: (error) => {
        logger.error('Error while registering: ', error);
        notify.error('Có lỗi xảy ra khi đăng ký');
      }
    });
  };
  return (
    <div>
      {/* <Breadcrumb
        items={[{ label: 'Trang chủ', href: route.home }, { label: 'Đăng ký' }]}
        separator='/'
      /> */}
      <div className='mx-auto max-w-120 rounded-lg bg-white p-7.5 shadow-[0px_0px_10px_2px] shadow-gray-200'>
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
          schema={registerSchema}
        >
          {(form) => (
            <>
              <Row>
                <Col>
                  <InputField
                    name='email'
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
                    name='password'
                    control={form.control}
                    label='Mật khẩu'
                    placeholder='Nhập mật khẩu...'
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <PasswordField
                    name='confirmPassword'
                    control={form.control}
                    label='Nhập lại mật khẩu'
                    placeholder='Nhập lại mật khẩu...'
                    required
                  />
                </Col>
              </Row>
              <Button
                disabled={registerMutation.isPending}
                variant={'primary'}
                className={'w-full'}
              >
                {registerMutation.isPending ? <CircleLoading /> : 'Đăng ký'}
              </Button>
            </>
          )}
        </BaseForm>
        <div className='my-4 flex items-center gap-3'>
          <div className='bg-border h-px flex-1'></div>
          <span className='text-muted-foreground text-sm'>Hoặc</span>
          <div className='bg-border h-px flex-1'></div>
        </div>
        <Button className='block w-full border bg-white text-black hover:bg-slate-100'>
          <Link className='block w-full' href={route.login}>
            Đăng nhập
          </Link>
        </Button>
      </div>
    </div>
  );
}
