<template>
  <div
    class="login flex flex-col items-center pt-32 h-screen"
    text="center gray-700 dark:gray-200"
    dark="bg-dark-500"
  >
    <h1 class="text-22">
      Vitebvt
    </h1>
    <em class="opacity-80"> Opinionated Vite Starter Template </em>

    <div
      class="py-4 px-12 bg-gray-300 rounded-4 mt-16 cursor-pointer hover:(opacity-80)"
      dark="bg-dark-100"
      @click="onLoginClick"
    >
      GO HOME
    </div>

    <div text-24 cursor-pointer mt-24>
      <div
        class="i-solar:sun-2-linear dark:i-solar:moon-linear"
        @click="toggleDark()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toggleDark } from '~/composables/dark'

const { setInfo } = useUserStore()
const router = useRouter()

function onLoginClick() {
  setInfo({ token: 'test' })
  router.replace({ name: 'home' })
}
</script>
