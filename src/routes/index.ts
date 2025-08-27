const defineRoute = <T>(routes: T): T => routes;

const route = defineRoute({
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  user: {
    profile: '/user/profile'
  }
});

export default route;
