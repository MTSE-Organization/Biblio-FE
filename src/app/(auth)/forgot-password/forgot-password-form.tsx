'use client';

import { useState } from 'react';
import { whiteLogo } from '@/assets';
import {
  Breadcrumb,
  Button,
  Col,
  InputField,
  OtpField,
  Row
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import PasswordField from '@/components/form/password-field';
import route from '@/routes';
import Image from 'next/image';
import {
  forgotPasswordStep1Schema,
  forgotPasswordStep2Schema
} from '@/schemaValidations';
import {
  useChangePasswordMutation,
  useForgotPasswordMutation
} from '@/queries';
import { logger } from '@/logger';
import { applyFormErrors, getData, notify, removeData, setData } from '@/utils';
import { ErrorCode, formatPasswordErrorMaps, storageKeys } from '@/constants';
import { UseFormReturn } from 'react-hook-form';
import { CircleLoading } from '@/components/loading';
import { useNavigate } from '@/hooks';
import { ForgotPasswordBodyType } from '@/types';

type ForgotPasswordStepType = 1 | 2;

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<ForgotPasswordStepType>(1);
  const forgotPasswordMutation = useForgotPasswordMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const navigate = useNavigate();

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
    if (step === 1) {
      await forgotPasswordMutation.mutateAsync(values, {
        onSuccess: (res) => {
          setData(storageKeys.EMAIL, values.email);
          if (res.result) {
            notify.success('Mã OTP đã được gửi đến email của bạn');
            setStep(2);
          } else {
            const errorCode = res.code;
            if (errorCode === ErrorCode.ACCOUNT_ERROR_NOT_FOUND) {
              notify.error('Email không tồn tại');
            } else {
              notify.error('Có lỗi xảy ra khi gửi OTP');
            }
          }
        },
        onError: (error) => {
          logger.error('Error while sending otp: ', error);
          notify.error('Có lỗi xảy ra khi gửi OTP');
        }
      });
    } else if (step === 2) {
      await changePasswordMutation.mutateAsync(
        {
          ...values,
          email: getData(storageKeys.EMAIL)!
        },
        {
          onSuccess: (res) => {
            if (res.result) {
              notify.success('Đặt lại mật khẩu thành công');
              removeData(storageKeys.EMAIL);
              navigate(route.login);
            } else {
              const errorCode = res.code;
              if (errorCode === ErrorCode.AUTH_ERROR_OTP_INVALID_OR_EXPIRED) {
                notify.error('Mã OTP không hợp lệ hoặc đã hết hạn');
                applyFormErrors(form, errorCode, formatPasswordErrorMaps);
              }
            }
          },
          onError: (error) => {
            logger.error('Error while changing password: ', error);
            notify.error('Có lỗi xảy ra khi đặt lại mật khẩu');
          }
        }
      );
    }
  };

  return (
    <div>
      {/* <Breadcrumb
        items={[
          { label: 'Trang chủ', href: route.home },
          { label: 'Quên mật khẩu' }
        ]}
        separator='/'
      /> */}
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
              schema={
                step === 1
                  ? forgotPasswordStep1Schema
                  : forgotPasswordStep2Schema
              }
            >
              {(form) => (
                <>
                  {step === 1 && (
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
                      <Button
                        disabled={forgotPasswordMutation.isPending}
                        variant={'primary'}
                        className={'w-full'}
                      >
                        {forgotPasswordMutation.isPending ? (
                          <CircleLoading />
                        ) : (
                          'Gửi OTP'
                        )}
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Row>
                        <Col>
                          <OtpField
                            className='w-full!'
                            name='otp'
                            control={form.control}
                            label='Nhập OTP'
                            required
                            description={
                              <p className='text-center text-sm'>
                                Mã OTP đã được gửi đến email của bạn. <br /> Mã
                                có thời gian sử dụng trong vòng 5 phút
                              </p>
                            }
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
                      <Row>
                        <Col>
                          <Button
                            disabled={changePasswordMutation.isPending}
                            variant={'primary'}
                            className={'w-full'}
                          >
                            {changePasswordMutation.isPending ? (
                              <CircleLoading />
                            ) : (
                              'Đặt lại mật khẩu'
                            )}
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button
                            type='button'
                            variant='outline'
                            className='w-full'
                            onClick={() => setStep(1)}
                          >
                            Quay lại
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                </>
              )}
            </BaseForm>
          </div>
        </div>
      </div>
    </div>
  );
}
