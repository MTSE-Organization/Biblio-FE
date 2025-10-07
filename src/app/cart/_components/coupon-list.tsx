'use client';

import CouponModal from '@/app/cart/_components/coupon-modal';
import { Button, Col, Row, ToolTip } from '@/components/form';
import { CircleLoading } from '@/components/loading';
import { Separator } from '@/components/ui/separator';
import { storageKeys } from '@/constants';
import { useNavigate } from '@/hooks';
import useDisclosure from '@/hooks/use-disclosure';
import { logger } from '@/logger';
import { useCartCheckMutation, useCouponListQuery } from '@/queries';
import route from '@/routes';
import { useCartStore } from '@/store';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { CartCheckoutBodyType } from '@/types';
import { formatPrice, notify, setData } from '@/utils';
import { ChevronRight, Info, Ticket, X } from 'lucide-react';

export default function CouponList({
  totalPrice,
  isSelected
}: {
  totalPrice: number;
  isSelected: boolean;
}) {
  const { withLoading } = useAppLoadingStore();
  const navigate = useNavigate();
  const { opened, open, close } = useDisclosure();
  const {
    selectedCartItems,
    selectedFreeShipCoupon,
    selectedDiscountCoupon,
    setSelectedFreeShipCoupon,
    setSelectedDiscountCoupon
  } = useCartStore();
  const couponListQuery = useCouponListQuery({
    params: {},
    enabled: true
  });
  const cartCheckoutMutation = useCartCheckMutation();
  const couponList = couponListQuery.data?.data?.content || [];

  const validCouponList = couponList.filter(
    (coupon) => +coupon.minOrderAmount <= totalPrice
  );

  const handleOpenCouponModal = () => {
    open();
  };

  const handleCartCheckout = async () => {
    const payload: CartCheckoutBodyType = {
      cartItemIds: selectedCartItems,
      couponIds: [
        selectedFreeShipCoupon?.id ?? '',
        selectedDiscountCoupon?.id ?? ''
      ].filter(Boolean)
    };
    await withLoading(
      cartCheckoutMutation.mutateAsync(payload, {
        onSuccess: (res) => {
          if (res.result) {
            const orderId = res.data?.orderId;
            if (orderId) {
              setData(storageKeys.ORDER_ID, orderId);
              navigate(`${route.order.place}`);
            }
          } else {
            notify.error('Tạo đơn hàng thất bại');
          }
        },
        onError: (error) => {
          logger.error('Error while creating cart checkout:', error);
          notify.error('Có lỗi xảy ra');
        }
      })
    );
  };

  return (
    <>
      <div className='rounded-lg bg-white px-4 py-2'>
        <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
          <div className='flex items-center gap-x-2 text-[#2F80ED]'>
            <Ticket />
            <h3>Khuyến mãi</h3>
          </div>
          <Button
            variant={'ghost'}
            onClick={handleOpenCouponModal}
            className='flex items-center gap-x-2 p-0! text-[#2F80ED] hover:text-[#2f80ed]/80'
          >
            <p>Xem thêm</p>
            <ChevronRight />
          </Button>
        </div>
        {isSelected && validCouponList.length > 0 && (
          <div className='flex flex-wrap'>
            <div className='mt-2 flex w-full items-center justify-between rounded bg-[#2F80ED33] p-2 text-[#2F80ED]'>
              <span>Có {validCouponList.length} khuyến mãi đủ điều kiện</span>
              <Button
                variant={'ghost'}
                onClick={handleOpenCouponModal}
                className='flex h-3 items-center gap-x-2 p-0! text-[#2F80ED] hover:text-[#2f80ed]/80'
              >
                <ChevronRight />
              </Button>
            </div>
            <Row className='mb-0 flex w-full justify-between'>
              {selectedDiscountCoupon && (
                <Col
                  span={12}
                  className='mt-4 flex-row items-center justify-between bg-[url(https://cdn1.fahasa.com/media/fahasa_web_image/discount_image_final.png)] bg-contain bg-no-repeat text-yellow-900'
                >
                  <h3
                    title={selectedDiscountCoupon.name}
                    className='block truncate px-4 py-2'
                  >
                    {selectedDiscountCoupon.name}
                  </h3>
                  <X
                    onClick={() => setSelectedDiscountCoupon(null)}
                    className='mr-2 cursor-pointer transition-all duration-200 ease-linear hover:opacity-50'
                  />
                </Col>
              )}
              {selectedFreeShipCoupon && (
                <Col
                  span={12}
                  className='mt-4 flex-row items-center justify-between bg-[url(https://cdn1.fahasa.com/media/fahasa_web_image/freeship_image_final.png)] bg-contain bg-no-repeat text-green-900'
                >
                  <h3
                    title={selectedFreeShipCoupon.name}
                    className='block truncate px-4 py-2'
                  >
                    {selectedFreeShipCoupon.name}
                  </h3>
                  <X
                    onClick={() => setSelectedFreeShipCoupon(null)}
                    className='mr-2 cursor-pointer transition-all duration-200 ease-linear hover:opacity-50'
                  />
                </Col>
              )}
            </Row>
          </div>
        )}
        <div className='mt-2 flex items-center justify-between py-2'>
          Có thể áp dụng nhiều mã
          <ToolTip
            title={
              <p className='text-center'>
                Áp dụng tối đa 1 mã giảm giá và 1 mã freeship
              </p>
            }
          >
            <Info />
          </ToolTip>
        </div>
      </div>

      <div className='mt-4 rounded-lg bg-white p-4'>
        <div className='flex justify-between'>
          <span>Thành tiền</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        {selectedFreeShipCoupon && (
          <div className='mt-4 flex justify-between'>
            <span>Giảm giá vận chuyển ({selectedFreeShipCoupon.name})</span>
            <span className='whitespace-nowrap'>
              -
              {formatPrice(
                +selectedFreeShipCoupon.value > 0 &&
                  +selectedFreeShipCoupon.value <= 100
                  ? (+selectedFreeShipCoupon.value * +totalPrice) / 100
                  : +selectedFreeShipCoupon.value
              )}
            </span>
          </div>
        )}
        {selectedDiscountCoupon && (
          <div className='mt-4 flex justify-between'>
            <span>Giảm giá theo % ({selectedDiscountCoupon.name})</span>
            <span>
              -
              {formatPrice(
                +selectedDiscountCoupon.value > 0 &&
                  +selectedDiscountCoupon.value <= 100
                  ? (+selectedDiscountCoupon.value * +totalPrice) / 100
                  : +selectedDiscountCoupon.value
              )}
            </span>
          </div>
        )}
        <Separator className='my-4' />
        <Button
          onClick={handleCartCheckout}
          variant='primary'
          className='w-full'
          disabled={selectedCartItems.length === 0}
        >
          {cartCheckoutMutation.isPending ? <CircleLoading /> : 'Thanh toán'}
        </Button>
      </div>
      <CouponModal
        onClose={close}
        opened={opened}
        totalPrice={totalPrice}
        couponList={couponList}
      />
    </>
  );
}
