<script setup>
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import todoItem from '../components/todoComponent.vue'
import todoModal from '../components/modalComponent.vue'

import { useTodoStore } from '../stores/todo.js'

const todoStore = useTodoStore()

const activeTodo = ref(null)
const modeTodo = ref('view')

function handleView(id) {
  activeTodo.value = todoStore.todos.find((t) => t._id === id)
  modeTodo.value = 'view'
}

function handleEdit(id) {
  activeTodo.value = todoStore.todos.find((t) => t._id === id)
  modeTodo.value = 'edit'
}

function handleAdd() {
  activeTodo.value = null
  modeTodo.value = 'add'
}

function closeModal() {
  activeTodo.value = null
}

onMounted(() => {
  todoStore.fetchTodo()
})
</script>

<template>
  <div class="todo-page">
    <div class="filter-sidebar">
      <div class="buttons">
        <p>Filter</p>
        <button @click="todoStore.setFilter('all')">All</button>
        <button @click="todoStore.setFilter('active')">Active</button>
        <button @click="todoStore.setFilter('completed')">Completed</button>
      </div>
      <div class="buttons">
        <p>Sort</p>
        <button>Created At</button>
        <button>Due Date</button>
        <button>Priority Level</button>
      </div>
    </div>
    <div class="todo-section">
      <todo-item
        v-for="todo in todoStore.filterTodo"
        :todo="todo"
        :key="todo._id"
        @view="handleView"
        @edit="handleEdit"
      ></todo-item>
    </div>
    <div>
      <todo-modal
        v-if="activeTodo"
        :todo="activeTodo"
        :mode="modeTodo"
        @close="closeModal"
      ></todo-modal>
    </div>
    <div>
      <button @click="handleAdd()">Add New Todo</button>
    </div>
  </div>
</template>

<style scoped>
.todo-page {
  display: flex;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
}

.filter-sidebar {
  width: 180px;
  flex-shrink: 0;
}

.buttons {
  margin-bottom: 24px;
}

.buttons p {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #5b6788;
  margin: 0 0 10px;
}

.buttons button {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 14px;
  color: #1b2340;
  cursor: pointer;
  margin-bottom: 4px;
}

.buttons button:hover {
  background: #eef1ff;
}

.todo-section {
  flex: 1;
  min-width: 0;
}

.todo-page > div:last-child {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

.todo-page > div:last-child button {
  background: #4a63e7;
  color: white;
  border: none;
  padding: 14px 22px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(74, 99, 231, 0.35);
}
</style>
