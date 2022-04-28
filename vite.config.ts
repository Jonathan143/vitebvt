import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'

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
          '~/store': ['useUserStore'],
          '~/hooks': ['useRouterPermission', 'useLoading'],
        },
      ],
      dts: './src/types/auto-imports.d.ts',
    }),
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
