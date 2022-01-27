module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'comma-dangle': 0,
    'vue/multi-word-component-names': 0,
    'no-console': 0,
    curly: [0],
    'arrow-parens': ['error', 'as-needed'],
    'vue/no-v-html': 0
  },
}
