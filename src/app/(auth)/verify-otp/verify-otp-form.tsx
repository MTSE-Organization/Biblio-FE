'use client';

import { whiteLogo } from '@/assets';
import { Button, Col, OtpField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { CircleLoading } from '@/components/loading';
import { storageKeys } from '@/constants';
import { useNavigate } from '@/hooks';
import { logger } from '@/logger';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/queries';
import route from '@/routes';
import { otpSchema } from '@/schemaValidations';
import { OtpBodyType } from '@/types';
import { getData, notify, removeData, setData } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MAX_RESEND = 3;
const RESEND_INTERVAL = 10 * 60 * 1000;

export default function VerifyOTPForm() {
  const verifyOtpMutation = useVerifyOtpMutation();
  const resendOtpMutation = useResendOtpMutation();
  const [resendData, setResendDataState] = useState<{
    count: number;
    timestamp: number;
  }>({ count: 0, timestamp: 0 });

  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();
  const defaultValues: OtpBodyType = {
    email: getData(storageKeys.EMAIL) ?? '',
    otp: ''
  };
  const onSubmit = async (values: OtpBodyType) => {
    await verifyOtpMutation.mutateAsync(values, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success('Xác thực OTP thành công');
          removeData(storageKeys.EMAIL);
          navigate(route.login);
        } else {
          notify.error('Mã OTP không hợp lệ');
        }
      },
      onError: (error) => {
        logger.error('Error while verifying otp: ', error);
        notify.error('Có lỗi xảy ra khi xác thực OTP');
      }
    });
  };

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
      {/* <Breadcrumb
        items={[
          { label: 'Trang chủ', href: route.home },
          { label: 'Xác thực OTP' }
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
              schema={otpSchema}
            >
              {(form) => (
                <>
                  <Row className='mb-4'>
                    <Col>
                      <OtpField
                        className='w-full!'
                        name='otp'
                        control={form.control}
                        label='Nhập OTP'
                        required
                        description={
                          <span className='block text-center text-sm'>
                            Mã OTP đã được gửi đến email của bạn.
                            <br />
                            Mã có thời hạn sử dụng trong vòng 5 phút
                          </span>
                        }
                      />
                    </Col>
                  </Row>

                  <Button
                    type='submit'
                    disabled={verifyOtpMutation.isPending}
                    variant={'primary'}
                    className={'w-full'}
                  >
                    {verifyOtpMutation.isPending ? (
                      <CircleLoading />
                    ) : (
                      'Xác thực'
                    )}
                  </Button>
                  <Row className='mt-2 mb-0 flex-col gap-y-2'>
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
                </>
              )}
            </BaseForm>
          </div>
        </div>
      </div>
    </div>
  );
}
