'use client';

import { whiteLogo } from '@/assets';
import { Breadcrumb, Button, Col, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import OtpField from '@/components/form/otp-input';
import ButtonLoading from '@/components/loading/button-loading';
import { storageKeys } from '@/constants';
import { cn } from '@/lib';
import { logger } from '@/logger';
import { useVerifyOtpMutation } from '@/queries';
import route from '@/routes';
import { otpSchema } from '@/schemaValidations';
import { OtpBodyType } from '@/types/auth.type';
import { getData, notify, removeData } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';

export default function VerifyOTPForm() {
  const verifyOtpMutation = useVerifyOtpMutation();
  const router = useRouter();
  const loader = useTopLoader();
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
          router.push(route.login);
          loader.start();
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
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: route.home },
          { label: 'Xác thực OTP' }
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
              schema={otpSchema}
            >
              {(form) => (
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
                    className={cn(
                      'bg-green-primary block w-full hover:bg-emerald-700',
                      {
                        'pointer-events-none': verifyOtpMutation.isPending
                      }
                    )}
                  >
                    {verifyOtpMutation.isPending ? (
                      <ButtonLoading />
                    ) : (
                      'Xác thực'
                    )}
                  </Button>
                </>
              )}
            </BaseForm>
          </div>
        </div>
      </div>
    </div>
  );
}
