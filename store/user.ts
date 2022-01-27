import { ActionTree, MutationTree } from 'vuex'
import { loginApi, registerApi, userEditApi } from '@/api/user'
import { LoginUserParams, RegisterUserParams, UserType } from '@/api/user.d'

const Cookie = process.client ? require('js-cookie') : undefined

export const state = (): UserType => ({
  email: '',
  token: '',
  username: '',
  bio: '',
  image: '',
})

export type AnotherModuleState = ReturnType<typeof state>

export const mutations: MutationTree<AnotherModuleState> = {
  setUser (state, user: UserType) {
    let key: keyof UserType
    for (key in state as UserType) {
      state[key] = user[key]
    }
  }
}

export const actions: ActionTree<AnotherModuleState, AnotherModuleState> = {
  async login ({ commit }, params: LoginUserParams) {
    const { user } = await loginApi(params)
    commit('setUser', user)
    Cookie.set('user', JSON.stringify(user))
  },
  async register ({ commit }, params: RegisterUserParams) {
    const { user } = await registerApi(params)
    commit('setUser', user)
    Cookie.set('user', JSON.stringify(user))
  },
  async edit ({ commit }, params: UserType) {
    const { user } = await userEditApi(params)
    commit('setUser', user)
    Cookie.set('user', JSON.stringify(user))
  }
}
