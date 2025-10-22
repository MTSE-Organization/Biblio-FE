'use client';

import AddressList from '@/app/order/_components/address-list';
import CompleteCheckout from '@/app/order/_components/complete-checkout';
import OrderList from '@/app/order/_components/order-list';
import OrderNote from '@/app/order/_components/order-note';
import PaymentMethod from '@/app/order/_components/payment-method';
import { Col, Row } from '@/components/form';
import { PlaceOrderNotFound } from '@/components/not-found';
import { ErrorCode, storageKeys } from '@/constants';
import { useOrderQuery } from '@/queries';
import { useOrderStore } from '@/store';
import { getData } from '@/utils';
import { useEffect } from 'react';

export default function Checkout() {
  const orderId = getData(storageKeys.ORDER_ID);
  const orderQuery = useOrderQuery(orderId as string);
  const { setLoading } = useOrderStore();
  const order = orderQuery.data?.data;
  const code = orderQuery.data?.code;

  useEffect(
    () => setLoading(orderQuery.isLoading || orderQuery.isFetching),
    [orderQuery.isFetching, orderQuery.isLoading]
  );

  if (code === ErrorCode.ORDER_ERROR_NOT_FOUND) return <PlaceOrderNotFound />;

  return (
    <div className='flex flex-col gap-5'>
      <AddressList />
      <OrderList order={order} />
      <Row className='mb-0 flex-col gap-4'>
        <Col
          className='rounded-md border bg-white px-6 py-4 shadow-[0px_0px_10px_2px] shadow-gray-200'
          gutter={0}
        >
          <PaymentMethod />
        </Col>
        <Col
          className='flex flex-row-reverse rounded-lg bg-white px-6 py-4 shadow-[0px_0px_10px_2px] shadow-gray-200'
          gutter={0}
        >
          <Row className='mb-0 gap-x-4'>
            <Col span={16}>
              <OrderNote />
            </Col>
            <Col span={8} gutter={0}>
              <CompleteCheckout order={order} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
