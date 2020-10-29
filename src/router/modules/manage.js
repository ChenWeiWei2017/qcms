import MainLayout from '@/layouts/MainLayout'

const manageRouter = {
  path: '/manage',
  component: MainLayout,
  redirect: 'noRedirect',
  name: 'Manage',
  meta: {
    module: true,
    title: '管理中心',
    icon: 'desktop_windows',
    color: 'text-primary'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/pages/manage/user/index'),
      name: 'UserManage',
      meta: {
        roles: ['admin'],
        title: '用户管理',
        icon: 'person'
      }
    },
    {
      path: 'role',
      component: () => import('@/pages/manage/role/index'),
      name: 'RoleManage',
      meta: {
        roles: ['admin'],
        title: '角色管理',
        icon: 'admin_panel_settings'
      }
    },
    {
      path: 'department',
      component: () => import('@/pages/manage/department/index'),
      name: 'DepartmentManage',
      meta: {
        roles: ['admin'],
        title: '部门管理',
        icon: 'supervisor_account'
      }
    }
  ]
}

export default manageRouter
