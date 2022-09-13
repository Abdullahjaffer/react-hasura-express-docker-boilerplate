const noMenuProps = {
  hideMenu: true,
  hideNav: true,
  hideFooter: false,
  hideInMenu: true,
  hideChildrenInMenu: true,
};

export default [
  {
    path: '/join',
    layout: {
      ...noMenuProps,
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
    name: 'Projects',
    icon: 'crown',
    path: '/projects',
    wrappers: ['@/wrappers/auth'],
    component: '@/layouts/pageContainer',
    routes: [
      {
        name: 'My Projects',
        path: '/projects/my-projects',
        wrappers: ['@/wrappers/auth'],
        component: './projects/myProjects',
      },
      {
        name: 'Create Project',
        path: '/projects/start-new-project',
        wrappers: ['@/wrappers/auth'],
        component: './projects/createProject',
      },
      {
        path: '/projects/my-projects/:projectId',
        wrappers: ['@/wrappers/auth'],
        component: '@/layouts/index',
        routes: [
          {
            name: 'Boards',
            path: '/projects/my-projects/:projectId/boards',
            wrappers: ['@/wrappers/auth'],
            component: './boards',
          },
        ],
      },
    ],
  },
  {
    layout: {
      ...noMenuProps,
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
