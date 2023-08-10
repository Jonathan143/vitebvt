import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const appTitle = useTitle()
const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  async function crossroads() {
    const Permission = useRouterPermission()
    if (Permission.accessRouter(to)) {
      await next()
    }
    else {
      await next({
        name: 'notFound',
      })
    }
  }
  const { ignoreAuth = false } = to.meta

  if (ignoreAuth) {
    next()
  }
  else if (userStore.token) {
    crossroads()
  }
  else {
    next({
      name: 'login',
      query: { redirect: encodeURIComponent(to.fullPath) },
    })
  }
})

router.afterEach((to) => {
  const { title } = to.meta

  // 设置页面标题
  title && (appTitle.value = title)
})

export default router
