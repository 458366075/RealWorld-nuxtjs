import { Store } from 'vuex'
import { loginApi, registerApi } from '@/api/user'
import { LoginUserParams, RegisterUserParams, UserType } from '@/api/user.d'
// const cookie = process.client ? require('js-cookie') : undefined

interface State {
  user: UserType | null
}

export const state = (): State => ({
  user: null
})

export const mutations = {
  setUser (state: State, user: UserType) {
    state.user = user
  }
}

export const actions = {
  async requestLogin ({ commit }: Store<State>, params: LoginUserParams) {
    // console.log(store)

    const data = await loginApi(params)
    commit('setUser', data)
  },
  async requestRegister ({ commit }: Store<State>, params: RegisterUserParams) {
    const data = await registerApi(params)
    commit('setUser', data)
  }
}
