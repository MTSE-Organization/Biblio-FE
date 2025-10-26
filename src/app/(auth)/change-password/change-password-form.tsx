'use client';

import { whiteLogo } from '@/assets';
import { Button, Col, OtpField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import PasswordField from '@/components/form/password-field';
import route from '@/routes';
import Image from 'next/image';
import { forgotPasswordStep2Schema } from '@/schemaValidations';
import { useChangePasswordMutation, useResendOtpMutation } from '@/queries';
import { logger } from '@/logger';
import { applyFormErrors, getData, notify, removeData, setData } from '@/utils';
import { ErrorCode, formatPasswordErrorMaps, storageKeys } from '@/constants';
import { UseFormReturn } from 'react-hook-form';
import { CircleLoading } from '@/components/loading';
import { useNavigate } from '@/hooks';
import { ForgotPasswordBodyType } from '@/types';
import { useEffect, useState } from 'react';

const MAX_RESEND = 3;
const RESEND_INTERVAL = 10 * 60 * 1000;

export default function ChangePasswordForm() {
  const changePasswordMutation = useChangePasswordMutation();
  const navigate = useNavigate();
  const resendOtpMutation = useResendOtpMutation();

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
    await changePasswordMutation.mutateAsync(
      {
        ...values,
        email: getData(storageKeys.EMAIL)!
      },
      {
        onSuccess: (res) => {
          if (res.result) {
            notify.success('Đổi mật khẩu thành công');
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
          notify.error('Có lỗi xảy ra khi đổi mật khẩu');
        }
      }
    );
  };

  const [resendData, setResendDataState] = useState<{
    count: number;
    timestamp: number;
  }>({ count: 0, timestamp: 0 });

  const [countdown, setCountdown] = useState(0);

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

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {/* <Breadcrumb
        items={[
          { label: 'Trang chủ', href: route.home },
          { label: 'Đổi mật khẩu' }
        ]}
        separator='/'
      /> */}
      <div className=''>
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
                  <Row className='mb-2'>
                    <Col>
                      <OtpField
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
                  {isClient && (
                    <Row className='mb-4 flex-col gap-y-2'>
                      <Col>
                        <span className='mt-2 block text-center text-sm text-gray-500'>
                          Số lần đã gửi: {resendData.count} / {MAX_RESEND}
                          {countdown > 0 && resendData.count >= MAX_RESEND && (
                            <>
                              <br />
                              Bạn có thể gửi lại sau:{' '}
                              {formatCountdown(countdown)}
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
                  )}
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
                        className={
                          'bg-green-primary block w-full hover:opacity-80'
                        }
                      >
                        {changePasswordMutation.isPending ? (
                          <CircleLoading />
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
