import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: './src/types/global-components.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          '~/plugins/request': ['request'],
          '~/store': ['useUserStore'],
          '~/composables': ['useRouterPermission', 'useLoading'],
        },
      ],
      dts: './src/types/auto-imports.d.ts',
    }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9080',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, './src')}/`,
    },
  },

  // vitest 配置
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
