import route from '@/routes';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ orderId?: string; paymentStatus?: string }>;
}) {
  const { orderId, paymentStatus } = await searchParams;

  if (paymentStatus === '00' && orderId) {
    redirect(`${route.user.order}/${orderId}`);
  }
}
