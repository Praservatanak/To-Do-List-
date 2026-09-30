import { defineStore } from 'pinia'

import api from '../lib/axios.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      try {
        const response = await api.get('/users/me')
        this.user = response.data.user
      } catch (err) {
        throw err
      }
    },
  },
})
