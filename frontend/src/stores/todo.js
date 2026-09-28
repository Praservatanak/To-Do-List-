import api from '../lib/axios.js'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    isLoading: true,
    filter: 'all',
    error: '',
  }),
  getters: {
    totalCount: (state) => {
      return state.todos.length
    },

    activeTodo: (state) => state.todos.filter((todo) => !todo.completed),
    completedTodo: (state) => state.todos.filter((todo) => todo.completed),
    filterTodo: (state) => {
      if (state.filter === 'active') return state.todos.filter((t) => !t.completed)
      if (state.filter === 'completed') return state.todos.filter((t) => t.completed)
      else {
        return state.todos
      }
    },
    progressPercentage() {
      if (this.totalCount === 0) return 0
      return Math.round((this.completedTodo.length / this.totalCount) * 100)
    },
  },

  actions: {
    setFilter(value) {
      this.filter = value
    },
    async fetchTodo() {
      try {
        const response = await api.get('/todos')
        this.todos = response.data.todos
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch todos'
        throw err
      }
    },

    async addTodo(todoData) {
      try {
        const res = await api.post('/todos', todoData)
        await this.fetchTodo()
      } catch (err) {
        throw err
      }
    },
    async removeTodo(id) {
      try {
        await api.delete(`/todos/${id}`)
        this.todos = this.todos.filter((t) => t._id !== id)
      } catch (err) {
        throw err
      }
    },
    async toggleTodo(id, completeStatus) {
      try {
        const res = await api.patch(`/todos/${id}`, { completed: !completeStatus })
        const Index = this.todos.findIndex((t) => t._id === id)
        if (Index !== -1) {
          this.todos[Index] = res.data.data
        }
      } catch (err) {
        throw err
      }
    },
    async updateTodo(id, updateData) {
      try {
        const res = await api.patch(`/todos/${id}`, updateData)
        const Index = this.todos.findIndex((t) => t._id === id)
        if (Index !== -1) {
          this.todos[Index] = res.data.data
        }
      } catch (err) {
        throw err
      }
    },
  },
})
