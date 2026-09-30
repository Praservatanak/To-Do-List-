import axios from 'axios'
import { useAuthStore } from '../stores/auth.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  console.log('Access token:', authStore.accessToken)

  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }

  console.log('Authorization:', config.headers.Authorization)

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await authStore.refresh()
        const newAccessToken = response.accessToken

        authStore.accessToken = newAccessToken
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return api(error.config)
      } catch (err) {
        authStore.logout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default api
