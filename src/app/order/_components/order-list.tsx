'use client';

import OrderItem from '@/app/order/_components/order-item';
import OrderListSkeleton from '@/app/order/_components/order-list-skeleton';
import { Col, Row } from '@/components/form';
import { OrderResType } from '@/types';

export default function OrderList({ order }: { order?: OrderResType }) {
  if (!order) return <OrderListSkeleton />;

  return (
    <Row className='mb-0 gap-x-4'>
      <Col span={24} gutter={0}>
        <div className='w-full overflow-hidden rounded-lg bg-white shadow-[0px_0px_10px_2px] shadow-gray-200'>
          <div className='flex items-center border-b bg-white pl-6'>
            <div className='flex-1 p-4'>Sách</div>
            <div className='w-22.5 py-4 text-center'>Số lượng</div>
            <div className='basis-[18%] p-4 text-center'>Tổng</div>
          </div>

          {order.orderItems.map((orderItem) => (
            <OrderItem key={orderItem.id} orderItem={orderItem} />
          ))}
        </div>
      </Col>
    </Row>
  );
}
