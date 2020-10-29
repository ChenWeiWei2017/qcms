import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Toast } from '@/boot/swal'
import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  color: 'primary',
  position: 'top'
})

// 不需要拦截的白名单
const whiteList = ['/login', '/forget', '/404']

router.beforeEach(async (to, from, next) => {
  // start progress bar
  // LoadingBar.start()

  // set page title
  document.title = `中国日报内容管理系统 - ${to.meta.title}`

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      LoadingBar.stop()
    } else {
      const hasRoles =
        store.state.auth.roles && store.state.auth.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('auth/getInfo')
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (err) {
          await store.dispatch('auth/resetToken')
          Toast.fire({
            icon: 'error',
            title: err || '访问失败'
          })
          next(`/login?redirect=${to.path}`)
          LoadingBar.stop()
        }
      }
    }
  } else {
    /* 没有token */

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      LoadingBar.stop()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  LoadingBar.stop()
})
