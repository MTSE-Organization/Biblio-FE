'use client';

import { Button } from '@/components/form';
import { useNavigate } from '@/hooks';
import { logger } from '@/logger';
import { useAddItemMutation } from '@/queries';
import route from '@/routes';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { OrderItemResType } from '@/types';
import { notify } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';

export default function ReOrderButton({
  orderItems
}: {
  orderItems: OrderItemResType[];
}) {
  const navigate = useNavigate();
  const { withLoading } = useAppLoadingStore();
  const addItemMutation = useAddItemMutation();
  const queryClient = useQueryClient();

  const handleReOrder = async () => {
    const items = orderItems.map((orderItem) => ({
      productVariantId: orderItem.productVariant.id,
      quantity: orderItem.quantity
    }));
    items.forEach(async (item) => {
      await withLoading(
        addItemMutation.mutateAsync(
          { productVariantId: item.productVariantId, quantity: item.quantity },
          {
            onSuccess: () => {
              navigate(route.cart);
              queryClient.invalidateQueries({ queryKey: ['cart'] });
            },
            onError: (error) => {
              logger.error('Error while adding to cart:', error);
              notify.error('Có lỗi xảy ra');
            }
          }
        )
      );
    });
  };
  return (
    <Button onClick={handleReOrder} variant={'outline'}>
      Mua lại
    </Button>
  );
}
