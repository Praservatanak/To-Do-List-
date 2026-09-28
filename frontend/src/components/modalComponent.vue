<script setup>
import { ref, reactive, watch } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const props = defineProps(['todo', 'mode'])
const emit = defineEmits(['close'])
const errorMessage = ref('')
const isSaving = ref(false)
const formData = reactive({
  title: '',
  dueDate: '',
  priorityLevel: 'medium',
})

watch(
  () => props.todo,
  (newTodo) => {
    if (newTodo) {
      formData.title = newTodo.title || ''
      formData.dueDate = newTodo.dueDate ? newTodo.dueDate.slice(0, 10) : ''
      formData.priorityLevel = newTodo.priorityLevel || 'medium'
    }
  },
  { immediate: true },
)

function validate() {
  if (!formData.title || formData.title.trim().length < 2) {
    errorMessage.value = 'Title must be at least 2 characters'
    return false
  }
  if (formData.dueDate && new Date(formData.dueDate) <= new Date()) {
    errorMessage.value = 'Due date must be in the future'
    return false
  }
  errorMessage.value = ''
  return true
}

async function handleSave() {
  if (!validate()) {
    return
  }
  isSaving.value = true
  try {
    if (props.mode === 'add') {
      await todoStore.addTodo({ ...formData })
    } else {
      await todoStore.updateTodo(props.todo._id, { ...formData })
    }
    emit('close')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Failed to save'
  } finally {
    isSaving.value = false
  }
}
</script>
<template>
  <div class="overlay">
    <div class="modal">
      <h2>{{ mode === 'add' ? 'Add Todo' : mode === 'edit' ? 'Edit Todo' : 'View Todo' }}</h2>

      <label>Title</label>
      <input v-model="formData.title" :disabled="mode === 'view'" />

      <label>Due Date</label>
      <input type="date" v-model="formData.dueDate" :disabled="mode === 'view'" />

      <label>Priority</label>
      <select v-model="formData.priorityLevel" :disabled="mode === 'view'">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <span v-if="errorMessage" class="error">{{ errorMessage }}</span>

      <div class="actions">
        <button v-if="mode === 'edit' || mode === 'add'" @click="handleSave" :disabled="isSaving">
          {{ isSaving ? 'Saving...' : 'Save' }}
        </button>

        <button class="ghost" @click="emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 25, 50, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal {
  background: white;
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 380px;
  font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
}
.modal h2 {
  margin: 0 0 18px;
  font-size: 20px;
  color: #1b2340;
}
.modal label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #5b6788;
  margin-bottom: 6px;
}
.modal input,
.modal select {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 1px solid #e4e9f7;
  border-radius: 8px;
  font-size: 14px;
}
.modal input:disabled,
.modal select:disabled {
  background: #f2f4fa;
  color: #8a90a8;
}
.error {
  color: #d64545;
  font-size: 13px;
  display: block;
  margin-bottom: 12px;
}
.actions {
  display: flex;
  gap: 10px;
}
.actions button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  background: #4a63e7;
  color: white;
}
.actions .ghost {
  background: #f2f4fa;
  color: #1b2340;
}
</style>
