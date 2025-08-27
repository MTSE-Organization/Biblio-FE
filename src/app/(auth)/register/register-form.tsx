'use client';
import { whiteLogo } from '@/assets';
import { Breadcrumb, Button, Col, InputField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import PasswordField from '@/components/form/password-field';
import route from '@/routes';
import { registerSchema } from '@/schemaValidations';
import { RegisterBodyType } from '@/types/auth.type';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterForm() {
  const defaultValues: RegisterBodyType = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  const onSubmit = (values: RegisterBodyType) => {
    console.log('🚀 ~ onSubmit ~ values:', values);
  };
  return (
    <div>
      <Breadcrumb
        items={[{ label: 'Trang chủ', href: route.home }, { label: 'Đăng ký' }]}
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
              schema={registerSchema}
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
                  <Button className='bg-green-primary block w-full hover:bg-emerald-700'>
                    Đăng ký
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
      </div>
    </div>
  );
}
