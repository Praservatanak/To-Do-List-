import { defineStore } from 'pinia'
import api from '../lib/axios.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
  actions: {
    async refresh() {
      try {
        const response = await api.post('/auth/refresh')

        this.accessToken = response.data.accessToken
        this.user = response.data.user

        return response.data
      } catch (err) {
        this.accessToken = null
        this.user = null
        throw err
      }
    },
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        this.user = response.data.user
        this.accessToken = response.data.accessToken

        return response.data
      } catch (err) {
        throw err
      }
    },
    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData)
        this.user = response.data.user
        this.accessToken = response.data.accessToken

        return response.data
      } catch (err) {
        throw err
      }
    },
    async logout() {
      try {
        await api.post('/auth/logout')
      } finally {
        this.user = null
        this.accessToken = null
      }
    },
  },
})
