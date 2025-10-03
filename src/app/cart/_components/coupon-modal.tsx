'use client';

import { bgCoupon } from '@/assets';
import { Button, ToolTip } from '@/components/form';
import { Modal } from '@/components/modal';
import { Separator } from '@/components/ui/separator';
import { COUPON_KIND_DISCOUNT, COUPON_KIND_FREESHIP } from '@/constants';
import { cn } from '@/lib';
import { useCartStore } from '@/store';
import { CouponResType } from '@/types';
import { formatDate } from '@/utils';
import { Check, Info, Ticket, X } from 'lucide-react';
import Image from 'next/image';

export default function CouponModal({
  opened,
  totalPrice,
  onClose,
  couponList
}: {
  opened: boolean;
  totalPrice: number;
  onClose: () => void;
  couponList: CouponResType[];
}) {
  const {
    selectedFreeShipCoupon,
    selectedDiscountCoupon,
    setSelectedDiscountCoupon,
    setSelectedFreeShipCoupon
  } = useCartStore();
  const freeShipList = couponList
    .filter((coupon) => coupon.kind === COUPON_KIND_FREESHIP)
    .sort((a, b) => +a.minOrderAmount - +b.minOrderAmount);
  const discountList = couponList
    .filter((coupon) => coupon.kind === COUPON_KIND_DISCOUNT)
    .sort((a, b) => +a.minOrderAmount - +b.minOrderAmount);
  return (
    <Modal open={opened} onClose={onClose} className='p-4'>
      <div className='flex max-h-[90vh] w-140 flex-col pr-0.5'>
        <div className='flex items-center gap-x-4'>
          <div className='flex items-center gap-x-2 pl-4 text-[#2F80ED]'>
            <Ticket />
            <h3>Khuyến mãi</h3>
          </div>
          <div className='flex items-center justify-between gap-x-2 p-2'>
            Có thể áp dụng nhiều mã
            <ToolTip
              title={
                <p className='text-center'>
                  Áp dụng tối đa một mã giảm giá và một mã freeship
                </p>
              }
            >
              <Info />
            </ToolTip>
          </div>
          <Button
            onClick={onClose}
            className='text-destructive ml-auto pr-2! hover:bg-transparent'
            variant={'ghost'}
          >
            <X />
          </Button>
        </div>
        <Separator />
        <div className='h-full flex-1 overflow-auto pl-4'>
          <div className='py-4'>
            {freeShipList.length > 0 && (
              <>
                <div className='mb-2 flex items-center justify-between'>
                  <span>Mã vận chuyển</span>
                  <span className='text-xs text-gray-500'>
                    Áp dụng tối đa: 1
                  </span>
                </div>
                <div className='flex flex-col gap-y-1'>
                  {freeShipList.map((freeShip) => (
                    <div
                      key={freeShip.id}
                      className='relative z-1 flex h-[125px]'
                    >
                      <div
                        className={cn(
                          'm-3 flex basis-[calc(26%_-_25px)] flex-col items-center justify-center rounded-sm bg-orange-100',
                          {
                            'bg-green-100':
                              totalPrice >= +freeShip.minOrderAmount,
                            'bg-gray-100': totalPrice < +freeShip.minOrderAmount
                          }
                        )}
                      >
                        <div
                          className={cn(
                            'h-1/2 w-1/2 bg-contain bg-center bg-no-repeat',
                            {
                              'bg-[url(https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_freeship.svg)]':
                                totalPrice >= +freeShip.minOrderAmount,
                              'bg-[url(https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_freeship_gray.svg)]':
                                totalPrice < +freeShip.minOrderAmount
                            }
                          )}
                        ></div>
                        <span className='mt-2 text-xs'>Freeship</span>
                      </div>
                      <div className='flex w-[74%] flex-col px-3 py-4'>
                        <h4 className='font-medium'>{freeShip.name}</h4>
                        <p
                          className='line-clamp-2 truncate text-[13px] whitespace-pre-wrap text-gray-500'
                          dangerouslySetInnerHTML={{
                            __html: freeShip.description
                          }}
                        />
                        <div className='mt-auto flex items-end justify-between'>
                          <span className='text-[13px] text-gray-600'>
                            HSD:&nbsp;
                            {formatDate(
                              freeShip.validTo.toString(),
                              'HH:mm:ss dd/MM/yyyy'
                            )}
                          </span>
                          {totalPrice >= +freeShip.minOrderAmount ? (
                            <Button
                              onClick={() => {
                                if (
                                  selectedFreeShipCoupon?.id === freeShip.id
                                ) {
                                  setSelectedFreeShipCoupon(null);
                                } else {
                                  setSelectedFreeShipCoupon(freeShip);
                                }
                              }}
                              className={`h-7 text-xs ${
                                selectedFreeShipCoupon?.id === freeShip.id
                                  ? 'w-28 border border-blue-500 bg-transparent text-blue-500 hover:bg-transparent'
                                  : 'w-20 bg-blue-500 hover:bg-blue-500/80'
                              } `}
                            >
                              {selectedFreeShipCoupon?.id === freeShip.id ? (
                                <>
                                  Đã áp dụng
                                  <Check />
                                </>
                              ) : (
                                'Áp dụng'
                              )}
                            </Button>
                          ) : (
                            <Button
                              className={
                                'h-7 w-20 bg-blue-500 text-xs hover:bg-blue-500/80'
                              }
                            >
                              Mua thêm
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className='absolute -z-1 h-full w-full'>
                        <Image
                          src={bgCoupon.src}
                          width={200}
                          height={128}
                          alt={freeShip.name}
                          className='h-full w-full rounded-lg'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className='py-4'>
            {discountList.length > 0 && (
              <>
                <div className='mb-2 flex items-center justify-between'>
                  <span>Mã giảm giá theo phần trăm</span>
                  <span className='text-xs text-gray-500'>
                    Áp dụng tối đa: 1
                  </span>
                </div>
                <div className='flex flex-col gap-y-1'>
                  {discountList.map((discount) => (
                    <div
                      key={discount.id}
                      className='relative z-1 flex h-[125px]'
                    >
                      <div
                        className={cn(
                          'm-3 flex basis-[calc(26%_-_25px)] flex-col items-center justify-center rounded-sm bg-orange-100',
                          {
                            'bg-orange-100':
                              totalPrice >= +discount.minOrderAmount,
                            'bg-gray-100': totalPrice < +discount.minOrderAmount
                          }
                        )}
                      >
                        <div
                          className={cn(
                            'h-1/2 w-1/2 bg-contain bg-center bg-no-repeat',
                            {
                              'bg-[url(https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg)]':
                                totalPrice >= +discount.minOrderAmount,
                              'bg-[url(https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion_gray.svg)]':
                                totalPrice < +discount.minOrderAmount
                            }
                          )}
                        ></div>
                        <span className='mt-2 text-xs'>Mã giảm giá</span>
                      </div>
                      <div className='flex w-[74%] flex-col px-3 py-4'>
                        <h4 className='font-medium'>{discount.name}</h4>
                        <p
                          className='line-clamp-2 truncate text-[13px] whitespace-pre-wrap text-gray-500'
                          dangerouslySetInnerHTML={{
                            __html: discount.description
                          }}
                        />
                        <div className='mt-auto flex items-end justify-between'>
                          <span className='text-[13px] text-gray-600'>
                            HSD:&nbsp;
                            {formatDate(
                              discount.validTo.toString(),
                              'HH:mm:ss dd/MM/yyyy'
                            )}
                          </span>
                          <Button
                            onClick={() => {
                              if (selectedDiscountCoupon?.id === discount.id) {
                                setSelectedDiscountCoupon(null);
                              } else {
                                setSelectedDiscountCoupon(discount);
                              }
                            }}
                            className={`h-7 text-xs ${
                              selectedDiscountCoupon?.id === discount.id
                                ? 'w-28 border border-blue-500 bg-transparent text-blue-500 hover:bg-transparent'
                                : 'w-20 bg-blue-500 hover:bg-blue-500/80'
                            } `}
                          >
                            {selectedDiscountCoupon?.id === discount.id ? (
                              <>
                                Đã áp dụng
                                <Check />
                              </>
                            ) : (
                              'Áp dụng'
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className='absolute -z-1 h-full w-full'>
                        <Image
                          src={bgCoupon.src}
                          width={200}
                          height={128}
                          alt={discount.name}
                          className='h-full w-full rounded-lg'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
