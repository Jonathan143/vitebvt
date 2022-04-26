import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由注册
 */
export const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: 'Vitebvt',
    },
    component: () => import('~/pages/home/index.vue'),
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
      ignoreAuth: true,
    },
    component: () => import('~/pages/system/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    meta: {
      title: '404',
      ignoreAuth: true,
    },
    component: () => import('~/pages/system/notFound.vue'),
  },
]
