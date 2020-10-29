import MainLayout from '@/layouts/MainLayout'

const controlRouter = {
  path: '/control',
  component: MainLayout,
  redirect: 'noRedirect',
  name: 'Control',
  meta: {
    module: true,
    title: '系统监控',
    icon: 'security',
    color: 'text-amber'
  },
  children: [
    {
      path: 'syslogs',
      component: () => import('@/pages/control/syslogs/index'),
      name: 'Syslogs',
      meta: {
        roles: ['admin'],
        title: '系统日志',
        icon: 'assignment'
      }
    }
  ]
}

export default controlRouter
