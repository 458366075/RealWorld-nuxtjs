import { ActionTree } from 'vuex'
const cookieparser = process.server ? require('cookieparser') : undefined

export const actions: ActionTree<null, null> = {
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
      commit('user/setUser', user)
    }
  }
}
