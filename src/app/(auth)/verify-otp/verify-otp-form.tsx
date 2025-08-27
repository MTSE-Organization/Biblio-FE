'use client';

import { whiteLogo } from '@/assets';
import { Breadcrumb, Button, Col, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import OtpField from '@/components/form/otp-input';
import route from '@/routes';
import { otpSchema } from '@/schemaValidations';
import { OtpBodyType } from '@/types/auth.type';
import Image from 'next/image';

export default function VerifyOTPForm() {
  const defaultValues: OtpBodyType = {
    email: '',
    otp: ''
  };
  const onSubmit = (values: OtpBodyType) => {
    console.log('🚀 ~ onSubmit ~ values:', values);
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
                      />
                    </Col>
                  </Row>
                  <Button
                    type='submit'
                    className='bg-green-primary block w-full hover:bg-emerald-700'
                  >
                    Xác thực
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
