import MainLayout from '@/layouts/MainLayout'

const supportRouter = {
  path: '/support',
  component: MainLayout,
  redirect: 'noRedirect',
  name: 'Support',
  meta: {
    module: true,
    title: '辅助系统',
    icon: 'medical_services',
    color: 'text-positive'
  },
  children: [
    {
      path: 'keyword',
      component: () => import('@/pages/support/keyword'),
      name: 'Keyword',
      meta: {
        roles: ['admin'],
        title: '关键字管理',
        icon: 'vpn_key'
      }
    },
    {
      path: 'hotword',
      component: () => import('@/pages/support/hotword'),
      name: 'Hotword',
      meta: {
        roles: ['admin'],
        title: '热字管理',
        icon: 'local_fire_department'
      }
    },
    {
      path: 'sensitiveword',
      component: () => import('@/pages/support/sensitiveword'),
      name: 'Sensitiveword',
      meta: {
        roles: ['admin'],
        title: '敏感字管理',
        icon: 'new_releases'
      }
    }
  ]
}

export default supportRouter
