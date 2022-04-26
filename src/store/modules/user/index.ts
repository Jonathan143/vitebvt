import { acceptHMRUpdate, defineStore } from 'pinia'
import type { UserState } from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userid: '',
    username: '',
    token: '',
    role: 'tourist',
  }),

  getters: {},

  actions: {
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
