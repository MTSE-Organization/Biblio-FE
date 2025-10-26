'use client';

import { useState, useEffect } from 'react';
import { whiteLogo } from '@/assets';
import { Button, Col, InputField, OtpField, Row } from '@/components/form';
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
  useForgotPasswordMutation,
  useResendOtpMutation
} from '@/queries';
import { logger } from '@/logger';
import { applyFormErrors, getData, notify, removeData, setData } from '@/utils';
import { ErrorCode, formatPasswordErrorMaps, storageKeys } from '@/constants';
import { UseFormReturn } from 'react-hook-form';
import { CircleLoading } from '@/components/loading';
import { useNavigate } from '@/hooks';
import { ForgotPasswordBodyType } from '@/types';

type ForgotPasswordStepType = 1 | 2;

const MAX_RESEND = 3;
const RESEND_INTERVAL = 10 * 60 * 1000;

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<ForgotPasswordStepType>(1);
  const forgotPasswordMutation = useForgotPasswordMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const resendOtpMutation = useResendOtpMutation();
  const navigate = useNavigate();

  const [resendData, setResendDataState] = useState<{
    count: number;
    timestamp: number;
  }>({ count: 0, timestamp: 0 });

  const [countdown, setCountdown] = useState(0);

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

  useEffect(() => {
    if (getData(storageKeys.EMAIL)) setStep(2);
  }, []);

  useEffect(() => {
    const data = getResendData();
    setResendDataState(data);
  }, []);

  const getResendData = () => {
    const data = getData(storageKeys.RESEND_OTP);
    if (!data) return { count: 0, timestamp: 0 };
    return JSON.parse(data);
  };

  const setResendData = (count: number, timestamp: number) => {
    setData(storageKeys.RESEND_OTP, JSON.stringify({ count, timestamp }));
  };

  const handleResendOtp = async () => {
    const email = getData(storageKeys.EMAIL);
    if (!email) return;

    const now = Date.now();
    let { count, timestamp } = getResendData();

    if (now - timestamp > RESEND_INTERVAL) {
      count = 0;
      timestamp = now;
    }

    if (count >= MAX_RESEND) {
      notify.error('Bạn đã gửi OTP quá 3 lần, vui lòng thử lại sau 10 phút');
      return;
    }

    await resendOtpMutation.mutateAsync(email, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success('Gửi lại OTP thành công');
          count += 1;
          timestamp = now;
          setResendData(count, timestamp);
          setResendDataState({ count, timestamp });
        }
      },
      onError: (error) => {
        logger.error('Error whiling re-send OTP', error);
        notify.error('Có lỗi xảy ra');
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const { timestamp } = getResendData();
      const remaining = RESEND_INTERVAL - (now - timestamp);
      setCountdown(remaining > 0 ? remaining : 0);

      if (remaining <= 0 && resendData.count > 0) {
        setResendData(0, 0);
        setResendDataState({ count: 0, timestamp: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendData.count]);

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  return (
    <div>
      <div className='mx-auto max-w-120 rounded-lg bg-white p-7.5 shadow-[0px_0px_10px_2px] shadow-gray-200'>
        <div className='mb-7.5 flex h-full w-full items-center justify-center'>
          <Image
            src={whiteLogo.src}
            alt='Biblio Logo'
            width={300}
            height={100}
            className='object-cover'
          />
        </div>

        <BaseForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          schema={
            step === 1 ? forgotPasswordStep1Schema : forgotPasswordStep2Schema
          }
        >
          {(form) => (
            <>
              {step === 1 && (
                <Row className='flex-col gap-y-6'>
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
                </Row>
              )}

              {step === 2 && (
                <>
                  <Row className='mb-2'>
                    <Col>
                      <OtpField
                        className='w-full!'
                        name='otp'
                        control={form.control}
                        label='Nhập OTP'
                        required
                        description={
                          <>
                            <span className='text-center text-sm'>
                              Mã OTP đã được gửi đến email của bạn.
                            </span>
                            <br />
                            <span className='text-center text-sm'>
                              Mã có thời gian sử dụng trong vòng 5 phút
                            </span>
                          </>
                        }
                      />
                    </Col>
                  </Row>

                  <Row className='mt-6 mb-4 flex-col gap-y-2'>
                    <Col>
                      <span className='mt-2 block text-center text-sm text-gray-500'>
                        Số lần đã gửi: {resendData.count} / {MAX_RESEND}
                        {countdown > 0 && resendData.count >= MAX_RESEND && (
                          <>
                            <br />
                            Bạn có thể gửi lại sau: {formatCountdown(countdown)}
                          </>
                        )}
                      </span>
                    </Col>
                    <Col>
                      <Button
                        type='button'
                        variant='primary'
                        className='mx-auto'
                        onClick={handleResendOtp}
                        disabled={
                          resendData.count >= MAX_RESEND && countdown > 0
                        }
                      >
                        {resendOtpMutation.isPending ? (
                          <CircleLoading />
                        ) : (
                          'Gửi lại OTP'
                        )}
                      </Button>
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
                        disabled={
                          changePasswordMutation.isPending ||
                          form.getValues('otp').length < 6
                        }
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
  );
}
