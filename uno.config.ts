import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      fyc: 'flex items-center',
      fcc: 'flex items-center justify-center',
    },
    [/^size-(.*)$/, ([, c]) => `w-${c} h-${c}`],
  ],
  rules: [],
  theme: {},
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        mono: 'DM Mono:300,400',
        sans: 'Inter:300,400,500,600,700',
        anta: [
          { name: 'Anta', weights: ['400'] },
          { name: 'sans-serif', provider: 'none' },
        ],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
