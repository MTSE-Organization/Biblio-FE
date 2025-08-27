import CartSidebar from '@/components/app/header/cart-sidebar';
import DropdownAccount from '@/components/app/header/dropdown-account';
import DropdownNotification from '@/components/app/header/dropdown-notification';

export default function Navbar() {
  return (
    <div className='flex items-center gap-x-8'>
      <DropdownAccount />
      <DropdownNotification />
      <CartSidebar />
    </div>
  );
}
