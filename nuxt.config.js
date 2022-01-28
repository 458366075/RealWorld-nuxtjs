export default {
  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{js.ts,vue}'
      }
    }
  },
  plugins: [
    '~/plugins/directive',
    '~/plugins/request',
    '~/plugins/filters',
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  head: {
    title: 'Conduit'
  },
  server: {
    port: 80,
    host: '0.0.0.0'
  }
}
