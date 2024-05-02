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
      'fyc': 'flex items-center',
      'fxc': 'flex justify-center',
      'fcc': 'flex items-center justify-center',
      'btn-auth': 'inline-flex items-center px18 py4 fw500 rounded-lg border border-gray-3 duration-300 text-neutral-8 hover:(border-blue-5 text-neutral-9) active:(border-blue-6 text-blue-6)',
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
      provider: 'fontshare',
      fonts: {
        // mono: 'DM Mono:300,400',
        // sans: 'Inter:300,400,500,600,700',
        // sec: [
        //   { name: 'Hammersmith One', weights: ['400', '500', '600', '700'] },
        //   { name: 'sans-serif', provider: 'google' },
        // ],
        default: [
          { name: 'Pally', weights: ['400', '500', '600', '700'] },
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
