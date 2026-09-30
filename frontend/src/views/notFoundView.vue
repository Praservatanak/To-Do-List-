<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const links = computed(() => [
  { to: '/', icon: '🏠', title: 'Home', text: 'Back to the start' },
  { to: '/about', icon: 'ℹ️', title: 'About', text: 'What this app is for' },
  authStore.isLoggedIn
    ? { to: '/todo', icon: '📋', title: 'My todos', text: 'Open your family list' }
    : { to: '/login', icon: '🔑', title: 'Log in', text: 'Get to your family list' },
])

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<template>
  <div class="not-found">
    <div class="card">
      <div class="code" aria-hidden="true">
        <span>4</span><span class="zero">🧺</span><span>4</span>
      </div>
      <h1>We can't find that page</h1>
      <p class="message">
        The link may be broken, or the page may have moved. Check the address, or pick one of the
        places below.
      </p>

      <div class="actions">
        <button class="primary-btn" @click="router.push('/')">Go home</button>
        <button class="ghost-btn" @click="goBack">Go back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}
.card {
  width: 100%;
  max-width: 640px;
  text-align: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 48px 36px;
  box-shadow: var(--shadow-lg);
}

.code {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: clamp(72px, 16vw, 112px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -4px;
  color: var(--primary);
  margin-bottom: 16px;
}
.zero {
  font-size: 0.8em;
  letter-spacing: 0;
  display: inline-block;
  animation: wobble 3s ease-in-out infinite;
}
@keyframes wobble {
  0%,
  100% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(6deg);
  }
}

h1 {
  margin: 0 0 10px;
  font-size: clamp(24px, 4vw, 30px);
  letter-spacing: -0.6px;
}
.message {
  color: var(--muted);
  font-size: 16px;
  line-height: 1.6;
  max-width: 44ch;
  margin: 0 auto 28px;
}

.actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 36px;
}
.primary-btn,
.ghost-btn {
  padding: 13px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  transition:
    transform 0.15s,
    background 0.15s,
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
.ghost-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}
.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 12px;
  border-radius: var(--radius-md);
  background: #f7faff;
  border: 1px solid var(--border);
  text-decoration: none;
  color: var(--text);
  transition:
    transform 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;
}
.link-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
}
.link-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--primary-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.link-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.link-text strong {
  font-size: 14px;
}
.link-text small {
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 600px) {
  .card {
    padding: 36px 20px;
    border-radius: var(--radius-lg);
  }
  .links {
    grid-template-columns: 1fr;
  }
  .link-card {
    flex-direction: row;
    text-align: left;
    padding: 14px;
  }
  .link-text {
    align-items: flex-start;
  }
}
</style>
