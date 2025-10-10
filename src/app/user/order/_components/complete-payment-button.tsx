'use client';

import { Button } from '@/components/form';
import { storageKeys } from '@/constants';
import { useNavigate } from '@/hooks';
import route from '@/routes';
import { setData } from '@/utils';

export default function CompletePaymentButton({
  orderId
}: {
  orderId: string;
}) {
  const navigate = useNavigate();
  const handlePayment = () => {
    setData(storageKeys.ORDER_ID, orderId);
    navigate(route.order.place);
  };
  return (
    <Button onClick={handlePayment} variant={'primary'}>
      Thanh toán
    </Button>
  );
}
