'use client';

import { Button } from '@/components/form';
import { List, ListItem } from '@/components/list';
import { StarRating } from '@/components/star-rating';
import { Separator } from '@/components/ui/separator';
import {
  ageRatings,
  CONTRIBUTOR_AUTHOR,
  languageOptions,
  productVariantConditions,
  productVariantFormats,
  storageKeys
} from '@/constants';
import { useNavigate } from '@/hooks';
import { cn } from '@/lib';
import { logger } from '@/logger';
import {
  useAddFavoriteProductMutation,
  useCreateOrderMutation,
  useDeleteFavoriteProductMutation,
  useFavoriteProductListQuery
} from '@/queries';
import { useAddItemMutation } from '@/queries/cart.query';
import { useProductVariantListQuery } from '@/queries/product-variant.query';
import route from '@/routes';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { ProductResType } from '@/types';
import { formatDate, formatPrice, getData, notify, setData } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Eye, Heart, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function BookDetailInfo({ book }: { book?: ProductResType }) {
  const navigate = useNavigate();
  const { withLoading } = useAppLoadingStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [productVariantId, setProductVariantId] = useState<string | null>(null);
  const [isSelectedProductVariant, setIsSelectedProductVariant] =
    useState<boolean>(true);
  const bookVariantListQuery = useProductVariantListQuery({
    params: { productId: book?.id }
  });
  const bookVariants = bookVariantListQuery.data?.data.content;

  const accessToken = getData(storageKeys.ACCESS_TOKEN);

  const addItemMutation = useAddItemMutation();
  const createOrderMutation = useCreateOrderMutation();
  const queryClient = useQueryClient();

  const addFavoriteProductMutation = useAddFavoriteProductMutation();
  const deleteFavoriteProductMutation = useDeleteFavoriteProductMutation();
  const getFavoriteProduct = useFavoriteProductListQuery({
    params: { productId: book?.id },
    enabled: !!book?.id
  });

  const favoriteProduct = getFavoriteProduct?.data?.data?.content[0] || null;

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

  const handleAddToCart = async () => {
    if (!productVariantId) {
      notify.error('Vui lòng chọn phân loại sách');
      setIsSelectedProductVariant(false);
      return;
    }

    if (!accessToken) {
      notify.error(
        <p>
          Vui lòng&nbsp;
          <Link
            href={route.login}
            className='text-green-primary hover:text-green-primary/70 transition-all duration-200 ease-linear'
          >
            đăng nhập
          </Link>
          &nbsp; để thêm sách vào giỏ hàng
        </p>
      );
      return;
    }
    await withLoading(
      addItemMutation.mutateAsync(
        { productVariantId, quantity },
        {
          onSuccess: () => {
            notify.success('Thêm sách vào giỏ hàng thành công');
            queryClient.invalidateQueries({ queryKey: ['cart'] });
          },
          onError: (error) => {
            notify.error('Đã có lỗi xảy ra');
            logger.error('Error while adding to cart:', error);
          }
        }
      )
    );
  };

  const getPrice = (price: string | number, discount: number = 0) => {
    const modifiedPrice =
      bookVariants?.find((book) => book.id === productVariantId)
        ?.modifiedPrice ?? 0;
    return formatPrice(((+price + +modifiedPrice) * (100 - discount)) / 100);
  };

  const handleBuyNow = async () => {
    if (!productVariantId) {
      notify.error('Vui lòng chọn phân loại sách');
      setIsSelectedProductVariant(false);
      return;
    }

    await withLoading(
      createOrderMutation.mutateAsync(
        { productVariantId, quantity },
        {
          onSuccess: (res) => {
            if (res.result) {
              const orderId = res.data?.orderId;
              if (orderId) {
                setData(storageKeys.ORDER_ID, orderId);
                navigate(route.order.place);
              }
            }
          },
          onError: (error) => {
            logger.error('Error while buying now', error);
            notify.error('Có lỗi xảy ra');
          }
        }
      )
    );
  };

  const handleAddAndRemoveFavorite = async () => {
    if (!book?.id) return;
    if (favoriteProduct) {
      await deleteFavoriteProductMutation.mutateAsync(favoriteProduct?.id, {
        onSuccess: (res) => {
          if (res.result) {
            queryClient.invalidateQueries({
              queryKey: ['favorite-product-list', { productId: book?.id }]
            });
          }
        },
        onError: (error) => {
          notify.error('Đã có lỗi xảy ra');
          logger.error('Error while adding to cart:', error);
        }
      });
    } else {
      await addFavoriteProductMutation.mutateAsync(
        { productId: book?.id },
        {
          onSuccess: (res) => {
            if (res.result) {
              queryClient.invalidateQueries({
                queryKey: ['favorite-product-list', { productId: book?.id }]
              });
            }
          },
          onError: (error) => {
            notify.error('Đã có lỗi xảy ra');
            logger.error('Error while adding to cart:', error);
          }
        }
      );
    }
  };

  return (
    <>
      <div className='border-b border-solid border-b-gray-200 pb-5'>
        <h2 className='block text-2xl leading-[1.5] font-semibold text-slate-800'>
          {book?.name}
        </h2>
      </div>
      <div className='mt-5 flex items-center gap-4'>
        <div className='flex items-center gap-1'>
          <StarRating value={book?.averageReview || 0} />
        </div>
        <p>({book?.totalReviews} đánh giá)</p>
        <Separator orientation='vertical' />
        <div className='flex items-center gap-1 text-gray-600'>
          <Eye />
          <span>{book?.totalViews} lượt xem</span>
        </div>
        <Separator orientation='vertical' />
        <div
          onClick={handleAddAndRemoveFavorite}
          className='flex cursor-pointer items-center gap-1 text-gray-600'
        >
          <Heart
            className={`transition-all duration-300 ${
              favoriteProduct
                ? 'scale-100 fill-red-500 text-red-500'
                : 'scale-100 text-gray-600'
            }`}
          />
          <span>Yêu thích</span>
        </div>
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
            {getPrice(book?.price)}
          </p>
        )}
        {book?.discount !== 0 && book?.price && (
          <div className='flex items-center gap-2'>
            <p className='text-green-primary text-2xl leading-[1.167] font-bold'>
              {getPrice(book.price, book.discount)}
            </p>
            <p className='text-lg leading-[1.167] font-semibold text-gray-300 line-through'>
              {getPrice(book.price)}
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
                    productVariantFormats.find((pvf) => pvf.value === bv.format)
                      ?.label
                  }
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className='flex pt-5'>
        <div className='mt-[5px] flex h-[25px] w-[90px] items-center justify-between rounded-sm border'>
          <Button
            onClick={handleDecreaseQuantity}
            variant={'ghost'}
            className='hover:text-green-primary ml-1 flex h-full w-5 cursor-pointer items-center justify-center p-0! transition-all duration-200 ease-linear'
          >
            <Minus />
          </Button>
          <input
            type='text'
            value={quantity}
            onChange={handleChangeQuantity}
            minLength={1}
            className='w-[40px] text-center'
          />
          <Button
            onClick={handleIncreaseQuantity}
            variant={'ghost'}
            className='hover:text-green-primary mr-1 flex h-full w-5 cursor-pointer items-center justify-center p-0! transition-all duration-200 ease-linear'
          >
            <Plus />
          </Button>
        </div>
        <div className='ml-[15px]'>
          <Button
            className='text-green-primary border-green-primary hover:bg-green-primary flex items-center justify-center rounded-[5px] border border-solid bg-white px-[22px] py-2 leading-[1.2] font-semibold capitalize hover:text-white'
            variant={'outline'}
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
        <div className='ml-[15px]'>
          <Button
            onClick={handleBuyNow}
            className='text-green-primary border-green-primary bg-green-primary hover:bg-green-primary/80 flex items-center justify-center rounded-[5px] border border-solid px-[22px] py-2 leading-[1.2] font-semibold text-white capitalize'
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </>
  );
}
