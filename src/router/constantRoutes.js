import MainLayout from 'layouts/MainLayout.vue'

const constantRoutes = [
  {
    path: '/redirect',
    component: MainLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/auth/Login.vue'),
    hidden: true,
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/forget-password',
    component: () => import('@/pages/auth/Forget.vue'),
    hidden: true,
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/404',
    component: () => import('@/pages/Error404.vue'),
    hidden: true,
    meta: {
      title: '404 NOT FOUND'
    }
  },
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        hidden: true,
        component: () => import('@/pages/home/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true
        }
      }
    ]
  }
]

export default constantRoutes
