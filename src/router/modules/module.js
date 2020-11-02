import MainLayout from '@/layouts/MainLayout'

const moduleRouter = {
  path: '/module',
  component: MainLayout,
  redirect: 'noRedirect',
  name: 'Module',
  meta: {
    module: true,
    title: '模块管理',
    icon: 'web',
    color: 'text-blue-grey'
  },
  children: [
    {
      path: 'struct',
      component: () => import('@/pages/module/struct'),
      name: 'StructManage',
      meta: {
        roles: ['admin'],
        title: '网站结构',
        icon: 'miscellaneous_services'
      }
    },
    {
      path: 'site',
      component: () => import('@/pages/manage/site/index'),
      name: 'SiteManage',
      meta: {
        roles: ['admin'],
        title: '站点管理',
        icon: 'language'
      }
    },
    {
      path: 'node',
      component: () => import('@/pages/module/node'),
      name: 'NodeManage',
      meta: {
        roles: ['admin'],
        title: '栏目管理',
        icon: 'vertical_split'
      }
    },
    {
      path: 'template',
      component: () => import('@/pages/module/template'),
      name: 'TemplateManage',
      meta: {
        roles: ['admin'],
        title: '模板管理',
        icon: 'wysiwyg'
      }
    }
  ]
}

export default moduleRouter
