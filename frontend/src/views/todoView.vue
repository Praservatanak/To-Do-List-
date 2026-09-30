<script setup>
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import todoItem from '../components/todoComponent.vue'
import todoModal from '../components/modalComponent.vue'

import { useTodoStore } from '../stores/todo.js'
import { useAuthStore } from '../stores/auth.js'
const authStore = useAuthStore()
const todoStore = useTodoStore()

const activeTodo = ref(null)
const modeTodo = ref('view')
const activeFilter = ref('all')

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

function selectFilter(key) {
  activeFilter.value = key
  todoStore.setFilter(key)
}

function handleView(id) {
  activeTodo.value = todoStore.todos.find((t) => t._id === id)
  modeTodo.value = 'view'
}

function handleEdit(id) {
  activeTodo.value = todoStore.todos.find((t) => t._id === id)
  modeTodo.value = 'edit'
}

function handleAdd() {
  activeTodo.value = {
    title: '',
    dueDate: '',
    priorityLevel: '',
  }
  modeTodo.value = 'add'
}

function closeModal() {
  activeTodo.value = null
}

onMounted(async () => {
  if (!authStore.accessToken) {
    await authStore.refresh()
  }

  await todoStore.fetchTodo()
})
</script>

<template>
  <div class="todo-page">
    <aside class="filter-sidebar">
      <div class="buttons">
        <p>Filter</p>
        <div class="btn-group">
          <button
            v-for="f in filters"
            :key="f.key"
            :class="{ active: activeFilter === f.key }"
            @click="selectFilter(f.key)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>
    </aside>

    <main class="todo-section">
      <header class="section-head">
        <h1>My todos</h1>
        <span class="count">{{ todoStore.filterTodo.length }} Tasks</span>
      </header>

      <todo-item
        v-for="todo in todoStore.filterTodo"
        :todo="todo"
        :key="todo._id"
        @view="handleView"
        @edit="handleEdit"
      ></todo-item>

      <div v-if="todoStore.filterTodo.length === 0" class="empty">
        <div class="empty-icon">📝</div>
        <h3>Nothing here yet</h3>
        <p>Add your first todo to get the family list started.</p>
        <button class="empty-btn" @click="handleAdd()">Add todo</button>
      </div>
    </main>

    <todo-modal
      v-if="activeTodo"
      :todo="activeTodo"
      :mode="modeTodo"
      @close="closeModal"
    ></todo-modal>

    <button class="add-fab" @click="handleAdd()">
      <span class="plus">+</span>
      <span class="add-label">Add todo</span>
    </button>
  </div>
</template>

<style scoped>
.todo-page {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  max-width: 1100px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 40px 24px 110px;
}

/* ---------- Sidebar ---------- */
.filter-sidebar {
  width: 200px;
  flex-shrink: 0;
  position: sticky;
  top: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 22px 16px;
  box-shadow: var(--shadow-sm);
}
.buttons {
  margin-bottom: 24px;
}
.buttons:last-child {
  margin-bottom: 0;
}
.buttons p {
  font-size: 12px;
  font-weight: 700;
  color: var(--subtle);
  margin: 0 0 10px 12px;
}
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.buttons button {
  text-align: left;
  border: none;
  background: transparent;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  transition:
    background 0.15s,
    color 0.15s;
}
.buttons button:hover {
  background: var(--primary-soft);
}
.buttons button.active {
  background: var(--primary);
  color: white;
}

/* ---------- List ---------- */
.todo-section {
  flex: 1;
  min-width: 0;
}
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
.section-head h1 {
  margin: 0;
  font-size: clamp(24px, 4vw, 32px);
  letter-spacing: -0.8px;
}
.count {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 6px 14px;
  border-radius: 999px;
}

/* ---------- Empty state ---------- */
.empty {
  text-align: center;
  padding: 56px 24px;
  background: rgba(255, 255, 255, 0.65);
  border: 2px dashed #c9d1ea;
  border-radius: var(--radius-xl);
}
.empty-icon {
  font-size: 40px;
  margin-bottom: 8px;
}
.empty h3 {
  margin: 0 0 6px;
  font-size: 20px;
}
.empty p {
  margin: 0 0 20px;
  color: var(--muted);
  font-size: 14px;
}
.empty-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 26px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: var(--shadow-primary);
  transition:
    transform 0.15s,
    background 0.15s;
}
.empty-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* ---------- Floating add button ---------- */
.add-fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--primary);
  color: white;
  border: none;
  padding: 15px 26px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: var(--shadow-primary);
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    background 0.15s;
}
.add-fab:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 14px 28px rgba(74, 99, 231, 0.45);
}
.plus {
  font-size: 20px;
  line-height: 1;
}

/* ---------- Responsive ---------- */
@media (max-width: 820px) {
  .todo-page {
    flex-direction: column;
    gap: 20px;
    padding: 24px 16px 110px;
  }
  .filter-sidebar {
    position: static;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px;
  }
  .buttons {
    margin-bottom: 0;
  }
  .buttons p {
    margin-left: 4px;
  }
  .btn-group {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
  .buttons button {
    background: #f2f4fa;
    border-radius: 999px;
    padding: 8px 16px;
    font-size: 13px;
  }
  .buttons button.active {
    background: var(--primary);
  }
}
@media (max-width: 480px) {
  .add-fab {
    right: 16px;
    bottom: 16px;
    padding: 16px;
  }
  .add-label {
    display: none;
  }
  .plus {
    font-size: 24px;
  }
}
</style>
