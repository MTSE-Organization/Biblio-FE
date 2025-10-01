import { logo } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { RiFacebookLine, RiMailLine, RiUserLocationLine } from 'react-icons/ri';
import { PhoneIcon, SendIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='relative bg-white pt-24 shadow-[0px_0px_10px_2px] shadow-gray-200'>
      <div className='mx-auto max-w-[1320px]'>
        <div className='flex gap-6 pb-24'>
          {/* Logo + About */}
          <div className='w-1/2'>
            <div className='mb-6'>
              <div className='pb-4'>
                <Image src={logo} alt='Biblio Logo' width={100} />
              </div>
              <p className='text-justify text-sm leading-7 text-gray-700'>
                Chào mừng bạn đến với <b>Biblio</b> – cửa hàng sách trực tuyến
                dành cho những người yêu sách! Chúng tôi cung cấp một kho tàng
                sách phong phú từ nhiều thể loại khác nhau như văn học, kinh tế,
                khoa học, tự truyện, sách thiếu nhi và nhiều hơn nữa, từ các tác
                giả trong nước và quốc tế.
              </p>
            </div>

            <ul className='list-none space-y-3 text-sm text-gray-600'>
              <li className='flex items-center gap-2'>
                <RiUserLocationLine className='text-green-primary h-5 w-5' />
                <span>
                  1 Vo Van Ngan, Linh Chieu Ward, Thu Duc City, Ho Chi Minh
                  City.
                </span>
              </li>
              <li className='flex items-center gap-2'>
                <RiMailLine className='text-green-primary h-5 w-5' />
                <span>example@gmail.com</span>
              </li>
              <li className='flex items-center gap-2'>
                <PhoneIcon className='text-green-primary h-5 w-5' />
                <span>+91 123 4567890</span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className='w-1/6'>
            <div>
              <h4 className='mb-4 text-lg font-bold text-black'>Company</h4>
              <ul className='list-none space-y-3 text-sm text-gray-600'>
                <li className='hover:text-green-primary'>
                  <Link href='/about'>Giới thiệu Biblio</Link>
                </li>
                <li className='hover:text-green-primary'>
                  <a href='track-order.html'>Delivery Information</a>
                </li>
                <li className='hover:text-green-primary'>
                  <Link href='/policy'>Chính sách bảo mật</Link>
                </li>
                <li className='hover:text-green-primary'>
                  <Link href='/terms'>Điều khoản và điều kiện</Link>
                </li>
                <li className='hover:text-green-primary'>
                  <Link href='/contact-us'>Liên hệ</Link>
                </li>
                <li className='hover:text-green-primary'>
                  <Link href='/faq'>Thắc mắc và giải đáp</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='w-1/3'>
            <div>
              <h4 className='mb-4 text-lg font-bold text-black'>
                Subscribe Our Newsletter
              </h4>
              <form className='relative mb-6'>
                <input
                  type='text'
                  placeholder='Tìm kiếm tại đây...'
                  className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none'
                />
                <button
                  type='submit'
                  className='absolute top-0 right-0 bottom-0 flex w-12 items-center justify-center'
                >
                  <SendIcon />
                </button>
              </form>

              {/* Social */}
              <div className='mb-6 flex flex-wrap gap-2'>
                <a
                  href='#'
                  className='hover:text-green-primary flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700'
                >
                  <RiFacebookLine />
                </a>
                <a
                  href='#'
                  className='hover:text-green-primary flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700'
                >
                  <TwitterLogoIcon />
                </a>
                <a
                  href='#'
                  className='hover:text-green-primary flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700'
                >
                  <InstagramLogoIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-gray-200 py-4 text-center'>
          <p className='text-sm text-black'>
            &copy; <span id='copyright_year'>{new Date().getFullYear()}</span>{' '}
            <Link href='/' className='text-green-primary'>
              Biblio
            </Link>
            , All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
