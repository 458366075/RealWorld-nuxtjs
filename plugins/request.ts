import { Context } from '@nuxt/types'
import axios, { AxiosRequestConfig, Axios } from 'axios'

interface Request extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<T>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export const request: Request = axios.create({
  baseURL: 'https://api.realworld.io/api'
})

request.interceptors.response.use(res => {
  return res.data
})

export default function ({ store }: Context) {
  request.interceptors.request.use(res => {
    const token = store.state.user.token
    if (res.headers && token) {
      res.headers.Authorization = `Token ${token}`
    }
    return res
  })
}
