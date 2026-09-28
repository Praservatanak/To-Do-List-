<script setup>
import { computed } from 'vue'
import { useTodoStore } from '../stores/todo.js'

const todoStore = useTodoStore()

const props = defineProps(['todo'])
const emit = defineEmits(['edit', 'view'])

const dueState = computed(() => {
  if (props.todo.completed) return 'Completed'
  if (!props.todo.dueDate) return 'No due date'
  return new Date() > new Date(props.todo.dueDate) ? 'Overdue' : 'Due'
})

function handleToggle() {
  todoStore.toggleTodo(props.todo._id, props.todo.completed)
}

function handleDelete() {
  todoStore.removeTodo(props.todo._id)
}
</script>
<template>
  <div class="todo-component">
    <div class="todo-title">{{ todo.title }}</div>
    <span class="todo-due">{{ dueState }}</span>
    <input type="checkbox" :checked="todo.completed" @change="handleToggle" />
    <button class="view-todo" @click="emit('view', todo._id)">View</button>
    <button class="view-todo" @click="emit('edit', todo._id)">Edit</button>
    <button class="view-todo" @click="handleDelete">Delete</button>
  </div>
</template>

<style scoped>
.todo-component {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  border: 1px solid #e4e9f7;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 10px;
  font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
}

.todo-title {
  flex: 1;
  min-width: 0;
  font-size: 15px;
  color: #1b2340;
}

.todo-due {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
  background: #eef1ff;
  color: #4a63e7;
}

input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #4a63e7;
  cursor: pointer;
  flex-shrink: 0;
}

.view-todo {
  border: 1px solid #e4e9f7;
  background: #f7faff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: #1b2340;
  white-space: nowrap;
}

.view-todo:hover {
  background: #eef1ff;
}
</style>
