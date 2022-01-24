import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://api.realworld.io/api'
})

request.interceptors.response.use((res) => {
  return res.data
})

// export default function ({ store }) {

// }
