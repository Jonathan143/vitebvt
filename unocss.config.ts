import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'v-button': 'px-4 py-1 inline-block bg-gray-200 text-dark-300 cursor-pointer rounded-2px text-3.5 hover:bg-gray-300 disabled:(bg-gray-300 opacity-50 cursor-not-allowed)',
    'v-button--primary': 'v-button bg-violet-500 text-white hover:bg-violet-400 disabled:(bg-violet-500 hover:bg-violet-500)',
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1,
      warn: true,
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [],
})
