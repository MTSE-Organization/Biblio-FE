import { logo } from '@/assets';
import Navbar from '@/components/app/header/navbar';
import SearchForm from '@/components/app/header/search-form';
import { Container } from '@/components/layout';
import route from '@/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='relative z-9 border-b border-solid border-gray-100 bg-white shadow-[0px_0px_8px_2px] shadow-gray-200'>
      <Container className='mx-auto max-w-[1320px]'>
        <div className='z-4 flex flex-row justify-between gap-2.5 px-0 py-5'>
          <Link href={route.home}>
            <Image
              src={logo.src}
              alt='Biblio Logo'
              width={150}
              height={80}
              className='h-full'
            />
          </Link>
          <SearchForm />
          <Navbar />
        </div>
      </Container>
    </header>
  );
}
