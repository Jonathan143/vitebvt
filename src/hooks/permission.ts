import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export function useRouterPermission() {
  const userStore = useUserStore()

  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      // '*' 表示所有身份都能访问
      const { ignoreAuth = false, roles = ['*'] } = route.meta || {}
      // 判断当前用户是否有该路由的权限
      return ignoreAuth || roles.includes('*') || roles.includes(userStore.role)
    },
  }
}
