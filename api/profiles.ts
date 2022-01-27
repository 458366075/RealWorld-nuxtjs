import * as Type from './profiles.d'
import { request } from '@/plugins/request'

export const profileApi = (username: string) => {
  return request<{ profile: Type.Profile }>({
    url: '/profiles/' + username,
  })
}

export const profileFollowApi = (username: string) => {
  return request<{ profile: Type.Profile }>({
    method: 'POST',
    url: `/profiles/${username}/follow`,
  })
}

export const profileFollowDeleteApi = (username: string) => {
  return request<{ profile: Type.Profile }>({
    method: 'DELETE',
    url: `/profiles/${username}/follow`,
  })
}
