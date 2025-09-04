'use client';

import { whiteLogo } from '@/assets';
import { Breadcrumb, Button, Col, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import OTPField from '@/components/form/otp-input';
import PasswordField from '@/components/form/password-field';
import route from '@/routes';
import Image from 'next/image';
import { forgotPasswordStep2Schema } from '@/schemaValidations';
import { ForgotPasswordBodyType } from '@/types/auth.type';
import { useChangePasswordMutation } from '@/queries';
import { logger } from '@/logger';
import { applyFormErrors, getData, notify, removeData } from '@/utils';
import { ErrorCode, formatPasswordErrorMaps, storageKeys } from '@/constants';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib';
import ButtonLoading from '@/components/loading/button-loading';

export default function ChangePasswordForm() {
  const changePasswordMutation = useChangePasswordMutation();
  const router = useRouter();

  const defaultValues: ForgotPasswordBodyType = {
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  };

  const onSubmit = async (
    values: ForgotPasswordBodyType,
    form: UseFormReturn<ForgotPasswordBodyType>
  ) => {
    try {
      const res = await changePasswordMutation.mutateAsync({
        ...values,
        email: getData(storageKeys.EMAIL)!
      });

      if (res.result) {
        notify.success('Đổi mật khẩu thành công');
        removeData(storageKeys.EMAIL);
        router.push(route.login);
      } else {
        const errorCode = res.code;
        if (errorCode === ErrorCode.AUTH_ERROR_OTP_INVALID_OR_EXPIRED) {
          notify.error('Mã OTP không hợp lệ hoặc đã hết hạn');
          applyFormErrors(form, errorCode, formatPasswordErrorMaps);
        }
      }
    } catch (error) {
      logger.error('Error while changing password: ', error);
      notify.error('Có lỗi xảy ra khi đổi mật khẩu');
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: route.home },
          { label: 'Đổi mật khẩu' }
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
              schema={forgotPasswordStep2Schema}
            >
              {(form) => (
                <>
                  <Row>
                    <Col>
                      <OTPField
                        labelClassName='text-md'
                        className='w-full!'
                        name='otp'
                        control={form.control}
                        label='Nhập OTP'
                        required
                        description={
                          <span className='tex-sm block text-center'>
                            Mã OTP đã được gửi đến email của bạn. <br /> Mã có
                            thời gian sử dụng trong vòng 5 phút
                          </span>
                        }
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
                    <Col>
                      <PasswordField
                        className='text-md! focus-visible:ring-green-primary h-10! py-2!'
                        labelClassName='text-md'
                        name='confirmPassword'
                        control={form.control}
                        label='Nhập lại mật khẩu'
                        placeholder='Nhập lại mật khẩu...'
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        className={cn(
                          'bg-green-primary block w-full hover:bg-emerald-700',
                          {
                            'pointer-events-none':
                              changePasswordMutation.isPending
                          }
                        )}
                      >
                        {changePasswordMutation.isPending ? (
                          <ButtonLoading />
                        ) : (
                          'Đổi mật khẩu'
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
