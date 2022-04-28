import { createApp } from 'vue'
import App from './App.vue'
import store from '~/store'
import router from '~/router'
import directive from '~/directive'

import '@unocss/reset/tailwind.css'
import 'uno.css'

createApp(App).use(store).use(router).use(directive).mount('#app')
