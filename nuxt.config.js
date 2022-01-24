export default {
  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{js.ts,vue}'
      }
    }
  },
  plugins: ['~/plugins/request'],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
}
