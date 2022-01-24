import { AxiosPromise } from 'axios'
import { LoginUserParams, RegisterUserParams, UserType } from './user.d'

import { request } from '@/plugins/request'

export const loginApi = (data: LoginUserParams): AxiosPromise<UserType> => {
  return request({
    method: 'POST',
    url: '/users/login',
    data: {
      user: data
    },
  })
}

export const registerApi = (data: RegisterUserParams): AxiosPromise<UserType> => {
  return request({
    method: 'POST',
    url: '/users/register',
    data: {
      user: data
    },
  })
}
