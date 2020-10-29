import MainLayout from '@/layouts/MainLayout'

const newsRouter = {
  path: '/news',
  component: MainLayout,
  redirect: 'noRedirect',
  name: 'News',
  meta: {
    module: true,
    title: '内容中心',
    icon: 'far fa-newspaper',
    color: 'text-secondary'
  },
  children: [
    {
      path: 'workspace',
      component: () => import('@/pages/news/workspace'),
      name: 'Workspace',
      meta: {
        roles: ['editor'],
        title: '工作区',
        icon: 'important_devices'
      },
      children: [
        {
          path: 'draft',
          component: () => import('@/pages/news/workspace/Draft'),
          name: 'WorkspaceDraft',
          meta: {
            title: '草稿区',
            icon: 'fas fa-inbox'
          }
        },
        {
          path: 'pending',
          component: () => import('@/pages/news/workspace/Pending'),
          name: 'WorkspacePending',
          meta: {
            title: '待处理',
            icon: 'hourglass_top'
          }
        },
        {
          path: 'done',
          component: () => import('@/pages/news/workspace/Done'),
          name: 'WorkspaceDone',
          meta: {
            title: '已处理',
            icon: 'done'
          }
        },
        {
          path: 'trash',
          component: () => import('@/pages/news/workspace/Trash'),
          name: 'WorkspaceTrash',
          meta: {
            title: '回收站',
            icon: 'delete'
          }
        }
      ]
    },
    {
      path: 'publish',
      component: () => import('@/pages/news/publish'),
      name: 'Publish',
      meta: {
        roles: ['editor'],
        title: '发布中心',
        icon: 'public'
      }
    },
    {
      path: 'forum',
      component: () => import('@/pages/news/social'),
      name: 'Social',
      meta: {
        roles: ['editor'],
        title: '社交媒体',
        icon: 'fas fa-comments'
      }
    }
  ]
}

export default newsRouter
