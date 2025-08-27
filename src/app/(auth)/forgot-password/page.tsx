'use client';

import { useState } from 'react';
import { whiteLogo } from '@/assets';
import { Breadcrumb, Button, Col, InputField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import OTPField from '@/components/form/otp-input';
import PasswordField from '@/components/form/password-field';
import route from '@/routes';
import Image from 'next/image';
import {
  forgotPasswordStep1Schema,
  forgotPasswordStep2Schema,
  forgotPasswordStep3Schema
} from '@/schemaValidations';
import {
  ForgotPasswordStep1BodyType,
  ForgotPasswordStep2BodyType,
  ForgotPasswordStep3BodyType
} from '@/types/auth.type';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);

  const defaultValues = {
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  };

  const onSubmit = (
    values:
      | ForgotPasswordStep1BodyType
      | ForgotPasswordStep2BodyType
      | ForgotPasswordStep3BodyType
  ) => {
    console.log('🚀 ~ onSubmit ~ values:', values);

    if (step === 1) {
      // gọi API gửi OTP
      setStep(2);
    } else if (step === 2) {
      // gọi API cập nhật mật khẩu
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: route.home },
          { label: 'Quên mật khẩu' }
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
              schema={
                step === 1
                  ? forgotPasswordStep1Schema
                  : step === 2
                    ? forgotPasswordStep2Schema
                    : forgotPasswordStep3Schema
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
                      <Button
                        type='submit'
                        className='bg-green-primary block w-full hover:bg-emerald-700'
                      >
                        Gửi OTP
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Row>
                        <Col>
                          <OTPField
                            className='w-full!'
                            name='otp'
                            control={form.control}
                            label='Nhập OTP'
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
                            type='submit'
                            className='bg-green-primary w-full hover:bg-emerald-700'
                          >
                            Cập nhật mật khẩu
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button
                            type='button'
                            variant='outline'
                            className='w-full'
                            onClick={() => setStep(2)}
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
