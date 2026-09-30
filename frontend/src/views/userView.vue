<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useTodoStore } from '../stores/todo.js'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const authStore = useAuthStore()
const todoStore = useTodoStore()
const userStore = useUserStore()

onMounted(async () => {
  if (!authStore.accessToken) {
    await authStore.refresh()
  }
  await userStore.fetchUser()
  if (!todoStore.todos?.length) {
    await todoStore.fetchTodo()
  }
})
const user = computed(() => userStore.user || {})

const initials = computed(() => {
  const name = (user.value.name || '').trim()
  if (!name) return '?'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
})

function formattedDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
const stats = computed(() => {
  const todos = todoStore.todos || []
  const now = new Date()
  const completed = todos.filter((t) => t.completed === true).length
  const overdue = todos.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < now).length
  return [
    { label: 'Total', value: todos.length, tone: 'primary' },
    { label: 'Active', value: todos.length - completed, tone: 'warning' },
    { label: 'Completed', value: completed, tone: 'success' },
    { label: 'Overdue', value: overdue, tone: 'danger' },
  ]
})

const details = computed(() => [
  { label: 'Name', value: user.value.name || '—' },
  { label: 'Email', value: user.value.email || '—' },
  { label: 'Age', value: user.value.age || '—' },
  { label: 'Created At', value: formattedDate(user.value.createdAt) || '_' },
  { label: 'Role', value: user.value.role || '_' },
])
</script>

<template>
  <div class="user-page">
    <header class="profile-card">
      <div class="avatar" aria-hidden="true">{{ initials }}</div>
      <div class="profile-info">
        <h1>{{ user.name || 'Your profile' }}</h1>
        <p>{{ user.email || 'No email on file' }}</p>
      </div>
      <div class="profile-actions">
        <button class="primary-btn" @click="router.push('/todo')">Open my todos</button>
      </div>
    </header>

    <section class="stats" aria-label="Your todo summary">
      <div v-for="s in stats" :key="s.label" class="stat" :class="`tone-${s.tone}`">
        <strong>{{ s.value }}</strong>
        <span>{{ s.label }}</span>
      </div>
    </section>

    <section class="panel">
      <h2>Account details</h2>
      <dl class="details">
        <div v-for="d in details" :key="d.label" class="detail-row">
          <dt>{{ d.label }}</dt>
          <dd>{{ d.value }}</dd>
        </div>
      </dl>
    </section>
  </div>
</template>

<style scoped>
.user-page {
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

/* ---------- Profile card ---------- */
.profile-card {
  display: flex;
  align-items: center;
  gap: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 28px;
  box-shadow: var(--shadow-md);
  margin-bottom: 18px;
}
.avatar {
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a63e7, #7b8fff);
  color: white;
  font-size: 30px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-primary);
}
.profile-info {
  flex: 1;
  min-width: 0;
}
.profile-info h1 {
  margin: 0 0 4px;
  font-size: clamp(22px, 4vw, 30px);
  letter-spacing: -0.6px;
  overflow-wrap: anywhere;
}
.profile-info p {
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  overflow-wrap: anywhere;
}
.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}
.primary-btn,
.ghost-btn {
  padding: 11px 22px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  transition:
    transform 0.15s,
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}
.primary-btn {
  background: var(--primary);
  color: white;
  border: none;
  box-shadow: var(--shadow-primary);
}
.primary-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}
.ghost-btn {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}
.ghost-btn.danger:hover {
  background: var(--danger-soft);
  color: var(--danger);
  border-color: #f6c9c9;
}

/* ---------- Stats ---------- */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}
.stat {
  --tone: var(--primary);
  --tone-soft: var(--primary-soft);
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 4px solid var(--tone);
  border-radius: var(--radius-lg);
  padding: 18px;
  box-shadow: var(--shadow-sm);
}
.stat strong {
  display: block;
  font-size: 32px;
  line-height: 1;
  letter-spacing: -1px;
  color: var(--tone);
  margin-bottom: 6px;
}
.stat span {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
}
.tone-warning {
  --tone: var(--warning);
}
.tone-success {
  --tone: var(--success);
}
.tone-danger {
  --tone: var(--danger);
}

/* ---------- Panels ---------- */
.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 18px;
}
.panel h2 {
  margin: 0 0 16px;
  font-size: 18px;
  letter-spacing: -0.3px;
}
.details {
  margin: 0;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid var(--border);
}
.detail-row:first-child {
  border-top: none;
  padding-top: 0;
}
.detail-row:last-child {
  padding-bottom: 0;
}
.detail-row dt {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
}
.detail-row dd {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
  overflow-wrap: anywhere;
}
.privacy {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
  max-width: 62ch;
}

/* ---------- Responsive ---------- */
@media (max-width: 720px) {
  .user-page {
    padding: 24px 16px 60px;
  }
  .profile-card {
    flex-direction: column;
    text-align: center;
    padding: 24px 20px;
  }
  .profile-actions {
    width: 100%;
    flex-direction: row;
  }
  .profile-actions button {
    flex: 1;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .panel {
    padding: 20px;
  }
}
</style>
