import { request } from '@/plugins/request'

export const loginApi = () => {
  return request({
    method: 'POST',
    url: '/users/login'
  })
}
