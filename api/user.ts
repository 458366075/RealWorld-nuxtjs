import { LoginUserParams, RegisterUserParams, UserResponse, UserType } from './user.d'
import { request } from '@/plugins/request'

export const loginApi = (data: LoginUserParams) => {
  return request<UserResponse>({
    method: 'POST',
    url: '/users/login',
    data: {
      user: data
    },
  })
}

export const registerApi = (data: RegisterUserParams) => {
  return request<UserResponse>({
    method: 'POST',
    url: '/users',
    data: {
      user: data
    },
  })
}

export const userEditApi = (data: UserType) => {
  return request<UserResponse>({
    method: 'PUT',
    url: '/user',
    data: {
      user: data
    },
  })
}
