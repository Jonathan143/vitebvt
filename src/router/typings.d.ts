import 'vue-router'
import type { Role } from '~/store/modules/user/types'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    roles?: (Role | '*')[] // Controls roles that have access to the page
    ignoreAuth?: boolean
    cache?: boolean // if set true, the page will be cached
  }
}
