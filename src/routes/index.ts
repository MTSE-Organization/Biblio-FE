const defineRoute = <T>(routes: T): T => routes;

const route = defineRoute({
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  verifyOtp: '/verify-otp',
  user: {
    profile: '/user/profile',
    changePassword: '/user/change-password',
    order: '/user/order',
    notification: '/user/notification',
    address: '/user/address'
  },
  book: '/book',
  cart: '/cart',
  category: '/category',
  order: {
    place: '/order/place'
  }
});

export default route;
