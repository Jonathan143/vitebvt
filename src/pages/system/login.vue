<template>
  <div class="login">
    <div class="flex justify-center">
      <button class="v-button--primary" @click="onLoginClick">
        <div class="i-mdi:login inline-block mr-1.5 align-middle" />login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { setInfo } = useUserStore()
const router = useRouter()

function onLoginClick() {
  setInfo({ token: 'test' })
  router.replace({ name: 'home' })
}
</script>
