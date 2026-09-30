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
    const data = err.response?.data

    if (data?.errors?.dueDate) {
      errorMessage.value = data.errors.dueDate
    } else {
      errorMessage.value = data?.message || err.message
    }
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')" @keydown.esc="emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-head">
        <h2>{{ mode === 'add' ? 'Add todo' : mode === 'edit' ? 'Edit todo' : 'View todo' }}</h2>
        <button class="close-x" aria-label="Close" @click="emit('close')">✕</button>
      </div>

      <div class="field">
        <label for="todo-title">Title</label>
        <input
          id="todo-title"
          v-model="formData.title"
          :disabled="mode === 'view'"
          placeholder="What needs doing?"
        />
      </div>

      <div class="row">
        <div class="field">
          <label for="todo-due">Due date</label>
          <input id="todo-due" type="date" v-model="formData.dueDate" :disabled="mode === 'view'" />
        </div>

        <div class="field">
          <label for="todo-priority">Priority</label>
          <select id="todo-priority" v-model="formData.priorityLevel" :disabled="mode === 'view'">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</div>

      <div class="actions">
        <button
          v-if="mode === 'edit' || mode === 'add'"
          class="save"
          @click="handleSave"
          :disabled="isSaving"
        >
          {{ isSaving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 25, 50, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 50;
  animation: fade 0.15s ease-out;
}
.modal {
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 28px;
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  animation: pop 0.2s ease-out;
}
@keyframes fade {
  from {
    opacity: 0;
  }
}
@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}
.modal-head h2 {
  margin: 0;
  font-size: 22px;
  letter-spacing: -0.4px;
}
.close-x {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: #f2f4fa;
  color: var(--muted);
  font-size: 14px;
  transition: background 0.15s;
}
.close-x:hover {
  background: var(--primary-soft);
  color: var(--primary);
}

.field {
  margin-bottom: 16px;
  flex: 1;
  min-width: 0;
}
.row {
  display: flex;
  gap: 12px;
}
label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: 6px;
}
input,
select {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 15px;
  background: #f7faff;
  transition:
    border-color 0.15s,
    box-shadow 0.15s,
    background 0.15s;
}
input:focus,
select:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 4px rgba(74, 99, 231, 0.14);
}
input:disabled,
select:disabled {
  background: #f2f4fa;
  color: var(--subtle);
  cursor: not-allowed;
}

.error {
  background: var(--danger-soft);
  color: var(--danger);
  border: 1px solid #f6c9c9;
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}
.actions button {
  padding: 11px 22px;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  transition:
    background 0.15s,
    transform 0.15s;
}
.save {
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow-primary);
}
.save:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
}
.save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.ghost {
  background: #f2f4fa;
  color: var(--text);
}
.ghost:hover {
  background: #e7ebf7;
}

@media (max-width: 480px) {
  .overlay {
    align-items: flex-end;
    padding: 0;
  }
  .modal {
    max-width: none;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    padding: 24px 20px 28px;
  }
  .row {
    flex-direction: column;
    gap: 0;
  }
  .actions button {
    flex: 1;
  }
}
</style>
