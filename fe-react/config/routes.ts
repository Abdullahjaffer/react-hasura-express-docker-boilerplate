export default [
  {
    path: '/join',
    layout: {
      hideMenu: true,
      hideNav: true,
      hideFooter: false,
      hideInMenu: true,
      hideChildrenInMenu: true,
    },
    component: './join',
  },
  {
    name: 'Home',
    icon: 'crown',
    path: '/dashboard',
    wrappers: ['@/wrappers/auth'],
    component: './dashboard',
  },
  {
    layout: {
      hideMenu: true,
      hideNav: true,
      hideFooter: false,
      hideInMenu: true,
      hideChildrenInMenu: true,
    },
    wrappers: ['@/wrappers/auth'],
    path: '/404',
    component: './404',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    wrappers: ['@/wrappers/auth'],
    redirect: '/404',
  },
];
