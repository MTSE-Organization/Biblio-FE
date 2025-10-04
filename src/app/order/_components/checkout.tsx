'use client';

import AddressList from '@/app/order/_components/address-list';
import CompleteCheckout from '@/app/order/_components/complete-checkout';
import OrderList from '@/app/order/_components/order-list';
import OrderNote from '@/app/order/_components/order-note';
import PaymentMethod from '@/app/order/_components/payment-method';
import { Col, Row } from '@/components/form';
import { storageKeys } from '@/constants';
import { useOrderQuery } from '@/queries';
import { getData } from '@/utils';

export default function Checkout() {
  const orderId = getData(storageKeys.ORDER_ID);
  const orderQuery = useOrderQuery(orderId as string);
  const order = orderQuery.data?.data;
  return (
    <div className='flex flex-col gap-5'>
      <AddressList />
      <OrderList order={order} />
      <Row className='mb-0 flex-col gap-4'>
        <Col className='rounded-md border bg-white px-6 py-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
          <PaymentMethod />
        </Col>
        <Col className='flex flex-row-reverse rounded-lg bg-white px-6 py-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
          <Row className='gap-x-4'>
            <Col span={16}>
              <OrderNote />
            </Col>
            <Col span={8}>
              <CompleteCheckout order={order} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
