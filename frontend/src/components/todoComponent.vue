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

const dueClass = computed(
  () =>
    ({
      Completed: 'is-completed',
      'No due date': 'is-none',
      Overdue: 'is-overdue',
      Due: 'is-due',
    })[dueState.value],
)

const dueLabel = computed(() => {
  if (!props.todo.dueDate || dueState.value === 'Completed') return dueState.value
  const date = new Date(props.todo.dueDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
  return `${dueState.value} · ${date}`
})

function handleToggle() {
  todoStore.toggleTodo(props.todo._id, props.todo.completed)
}

function handleDelete() {
  todoStore.removeTodo(props.todo._id)
}
</script>

<template>
  <div
    class="todo-component"
    :class="[`priority-${todo.priorityLevel || 'medium'}`, { 'is-done': todo.completed }]"
  >
    <label class="check-wrap">
      <input type="checkbox" :checked="todo.completed" @change="handleToggle" />
      <span class="check-box"></span>
      <span class="sr-only"
        >Mark "{{ todo.title }}" as {{ todo.completed ? 'not done' : 'done' }}</span
      >
    </label>

    <div class="todo-main">
      <div class="todo-title">{{ todo.title }}</div>
      <div class="todo-meta">
        <span class="todo-due" :class="dueClass">{{ dueLabel }}</span>
        <span class="priority-chip">{{ todo.priorityLevel || 'medium' }}</span>
      </div>
    </div>

    <div class="todo-actions">
      <button class="action-btn" @click="emit('view', todo._id)">
        <i class="fa-solid fa-note-sticky" style="color: rgb(99, 230, 190)"></i>
      </button>
      <button class="action-btn" @click="emit('edit', todo._id)">
        <i class="fa-solid fa-pen-to-square" style="color: rgb(116, 192, 252)"></i>
      </button>
      <button class="action-btn danger" @click="handleDelete">
        <i class="fa-solid fa-trash" style="color: rgb(213, 14, 14)"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-component {
  --accent: var(--warning);
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 5px solid var(--accent);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}
.todo-component:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.priority-high {
  --accent: var(--danger);
}
.priority-medium {
  --accent: var(--warning);
}
.priority-low {
  --accent: var(--primary);
}
.is-done {
  --accent: var(--success);
  background: #fafbfe;
}

/* Custom checkbox */
.check-wrap {
  position: relative;
  display: flex;
  flex-shrink: 0;
  cursor: pointer;
}
.check-wrap input {
  position: absolute;
  opacity: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
}
.check-box {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #c1c9e4;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    border-color 0.15s;
}
.check-wrap input:checked + .check-box {
  background: var(--success);
  border-color: var(--success);
}
.check-wrap input:checked + .check-box::after {
  content: '✓';
  color: white;
  font-size: 13px;
  font-weight: 800;
}
.check-wrap input:focus-visible + .check-box {
  outline: 3px solid rgba(74, 99, 231, 0.45);
  outline-offset: 2px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Text */
.todo-main {
  flex: 1;
  min-width: 0;
}
.todo-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  overflow-wrap: anywhere;
}
.is-done .todo-title {
  color: var(--subtle);
  text-decoration: line-through;
}
.todo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.todo-due,
.priority-chip {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}
.todo-due.is-due {
  background: var(--primary-soft);
  color: var(--primary);
}
.todo-due.is-overdue {
  background: var(--danger-soft);
  color: var(--danger);
}
.todo-due.is-completed {
  background: var(--success-soft);
  color: var(--success);
}
.todo-due.is-none {
  background: #f2f4fa;
  color: var(--subtle);
}
.priority-chip {
  background: #f2f4fa;
  color: var(--muted);
  text-transform: capitalize;
}

/* Actions */
.todo-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.action-btn {
  border: none;
  background: #f2f4fa;
  color: var(--text);
  font-size: 18px;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 999px;
  transition:
    background 0.15s,
    color 0.15s;
}
.action-btn:hover {
  background: var(--primary-soft);
  color: var(--primary);
}
.action-btn.danger:hover {
  background: var(--danger-soft);
  color: var(--danger);
}

@media (max-width: 640px) {
  .todo-component {
    flex-wrap: wrap;
    padding: 14px;
    gap: 12px;
  }
  .todo-main {
    flex-basis: calc(100% - 44px);
  }
  .todo-actions {
    width: 100%;
    padding-left: 40px;
  }
  .action-btn {
    flex: 1;
  }
}
</style>
