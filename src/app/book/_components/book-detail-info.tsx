'use client';

import { Button } from '@/components/form';
import List from '@/components/list';
import ListItem from '@/components/list/ListItem';
import {
  ageRatings,
  CONTRIBUTOR_AUTHOR,
  languageOptions,
  productVariantConditions,
  productVariantFormats
} from '@/constants';
import { cn } from '@/lib';
import { logger } from '@/logger';
import { useProductVariantListQuery } from '@/queries/product-variant.query';
import { ProductResType } from '@/types';
import { formatDate, formatPrice, notify } from '@/utils';
import { useState } from 'react';
import { RiStarFill } from 'react-icons/ri';

export default function BookDetailInfo({ book }: { book?: ProductResType }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [productVariantId, setProductVariantId] = useState<string | null>(null);
  const [isSelectedProductVariant, setIsSelectedProductVariant] =
    useState<boolean>(true);
  const bookVariantListQuery = useProductVariantListQuery({
    params: { productId: book?.id }
  });
  const bookVariants = bookVariantListQuery.data?.data.content;

  const authors = book?.contributors
    .filter((contr) => contr.kind === CONTRIBUTOR_AUTHOR)
    .map((auth) => auth.name)
    .join(', ');
  const publisher = book?.publisher.name;

  const parseMetadataToObject = (metaData: string) => {
    if (!metaData)
      return { height: 0, length: 0, weight: 0, width: 0, numPage: 0 };
    try {
      const json = JSON.parse(metaData) as {
        height: number;
        width: number;
        length: number;
        weight: number;
        numPage: number;
      };
      return json;
    } catch (error) {
      logger.error('Error whiling parsing metaData json: ', error);
    }
  };

  const metaData = parseMetadataToObject(book?.metaData!);

  const handleIncreaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((quantity) => quantity - 1);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(+value);
  };

  const handleSelectProductVariant = (bookVariantId: string) => {
    setProductVariantId((productVariantId) =>
      productVariantId === bookVariantId ? null : bookVariantId
    );
    setIsSelectedProductVariant(true);
  };

  const handleAddToCart = () => {
    if (!productVariantId) {
      notify.error('Vui lòng chọn phân loại sách');
      setIsSelectedProductVariant(false);
      return;
    }

    // TODO: ADD TO CART
  };

  return (
    <>
      <div className='border-b border-solid border-b-gray-200 pb-5'>
        <h2 className='block text-2xl leading-[1.5] font-semibold text-slate-800'>
          {book?.name}
        </h2>
      </div>
      <div className='mt-5 flex items-center'>
        <div className='mr-2.5 flex items-center gap-1'>
          <RiStarFill className='text-[#f5885f]' />
          <RiStarFill className='text-[#f5885f]' />
          <RiStarFill className='text-[#f5885f]' />
          <RiStarFill className='text-[#f5885f]' />
          <RiStarFill className='text-[#f5885f]' />
        </div>
        <p>( 2 Reviews)</p>
      </div>
      <List className='mt-[15px]'>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            Độ tuổi
            <span>:</span>
          </label>
          {ageRatings.find((age) => age.value === book?.ageRating)?.label}
        </ListItem>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            Danh mục
            <span>:</span>
          </label>
          {book?.category.name}
        </ListItem>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            Kích thước
            <span>:</span>
          </label>
          {metaData?.length}cm x {metaData?.width}cm x {metaData?.height}cm
        </ListItem>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            Trọng lượng
            <span>:</span>
          </label>
          {metaData?.weight} g
        </ListItem>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            Số trang
            <span>:</span>
          </label>
          {metaData?.numPage} trang
        </ListItem>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            Tác giả
            <span>:</span>
          </label>
          {authors}
        </ListItem>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            NXB
            <span>:</span>
          </label>
          {publisher}
        </ListItem>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            Ngày XB
            <span>:</span>
          </label>
          {formatDate(book?.releaseDate ?? '')}
        </ListItem>
        <ListItem className='flex py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
            Ngôn ngữ
            <span>:</span>
          </label>
          {languageOptions.find((lang) => lang.value === book?.language)?.label}
        </ListItem>
      </List>
      <div className='pt-5'>
        {book?.discount === 0 && (
          <p className='text-green-primary text-2xl leading-[1.167] font-bold'>
            {formatPrice(book?.price ?? 0)} ₫
          </p>
        )}
        {book?.discount !== 0 && book?.price && (
          <div className='flex items-center gap-2'>
            <p className='text-green-primary text-2xl leading-[1.167] font-bold'>
              {formatPrice((book.price * (100 - book.discount)) / 100)} ₫
            </p>
            <p className='text-xl leading-[1.167] font-semibold text-gray-400 line-through'>
              {formatPrice(book.price)} ₫
            </p>
            <p className='bg-green-primary rounded p-1 text-xs text-white'>
              -{book?.discount} %
            </p>
          </div>
        )}
      </div>
      <div className='flex items-center pt-5'>
        <h5
          className={cn('mb-0 leading-[1.556] text-[#2b2b2d]', {
            'text-red-500': !productVariantId && !isSelectedProductVariant
          })}
        >
          Phân loại <span>:</span>
        </h5>
        <div className='pl-2.5'>
          <List className='flex w-full flex-wrap'>
            {bookVariants?.map((bv) => (
              <ListItem
                key={bv.id}
                className='m-0.5 text-sm leading-none text-white'
              >
                <Button
                  variant={'primary'}
                  className={cn('border text-black hover:text-white', {
                    'text-white': productVariantId === bv.id,
                    'bg-transparent': productVariantId !== bv.id
                  })}
                  onClick={() => handleSelectProductVariant(bv.id)}
                >
                  {
                    productVariantConditions.find(
                      (pvc) => pvc.value === bv.condition
                    )?.label
                  }
                  &nbsp; & &nbsp;
                  {
                    productVariantFormats.find((pvc) => pvc.value === bv.format)
                      ?.label
                  }
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className='flex pt-5'>
        <div className='relative flex h-full'>
          <input
            type='text'
            value={quantity}
            onChange={handleChangeQuantity}
            minLength={1}
            className='mr-2 h-10 w-10 rounded-[5px] border border-solid border-[#e9e9e9] text-center'
          />
          <div className='flex flex-col justify-between'>
            <Button
              onClick={handleIncreaseQuantity}
              variant={'ghost'}
              className='flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-[5px] border border-solid border-[#e9e9e9] bg-white p-0 pb-[2.5px] leading-0'
            >
              +
            </Button>
            <Button
              onClick={handleDecreaseQuantity}
              variant={'ghost'}
              className='flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-[5px] border border-solid border-[#e9e9e9] bg-white p-0 pb-[2.5px] leading-0'
            >
              -
            </Button>
          </div>
        </div>
        <div className='ml-[15px]'>
          <Button
            className='text-green-primary border-green-primary hover:bg-green-primary flex items-center justify-center rounded-[5px] border border-solid bg-white px-[22px] py-2 leading-[1.2] font-bold capitalize hover:text-white'
            variant={'outline'}
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
        <div className='ml-[15px]'>
          <Button className='text-green-primary border-green-primary bg-green-primary hover:bg-green-primary/80 flex items-center justify-center rounded-[5px] border border-solid px-[22px] py-2 leading-[1.2] font-bold text-white capitalize'>
            Mua ngay
          </Button>
        </div>
      </div>
    </>
  );
}
