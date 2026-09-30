<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const credentials = reactive({ email: '', password: '' })
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await authStore.login(credentials)
    router.push('/todo')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-box">
      <div class="brand">
        <span class="brand-icon">✓</span>
        <span class="brand-name">Family Todo</span>
      </div>

      <h2>Welcome back</h2>
      <p class="form-sub">Log in to see your family's list.</p>

      <form @submit.prevent="handleLogin" class="form-input" novalidate>
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="credentials.email"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="field">
          <label for="pass">Password</label>
          <div class="password-wrap">
            <input
              id="pass"
              :type="showPassword ? 'text' : 'password'"
              v-model="credentials.password"
              placeholder="Enter your password"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="toggle"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</div>

        <button class="submit-btn" type="submit" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'Logging in...' : 'Log in' }}
        </button>

        <p class="switch-link">
          New here? <router-link to="/register">Create an account</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  position: relative;
  overflow: hidden;
}
.form-page::before,
.form-page::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.45;
  pointer-events: none;
}
.form-page::before {
  width: 340px;
  height: 340px;
  background: #b9c6ff;
  top: -80px;
  left: -60px;
}
.form-page::after {
  width: 300px;
  height: 300px;
  background: #c9f0e1;
  bottom: -80px;
  right: -40px;
}

.form-box {
  position: relative;
  z-index: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 26px;
}
.brand-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}
.brand-name {
  font-weight: 800;
  letter-spacing: -0.3px;
}

.form-box h2 {
  font-size: 28px;
  margin: 0 0 6px;
  letter-spacing: -0.6px;
}
.form-sub {
  margin: 0 0 28px;
  color: var(--muted);
  font-size: 14px;
}

.form-input {
  display: flex;
  flex-direction: column;
}
.field {
  margin-bottom: 18px;
}
label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: 6px;
}
input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 15px;
  background: #f7faff;
  color: var(--text);
  transition:
    border-color 0.15s,
    background 0.15s,
    box-shadow 0.15s;
}
input::placeholder {
  color: #a4abc4;
}
input:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 4px rgba(74, 99, 231, 0.14);
}

.password-wrap {
  position: relative;
}
.password-wrap input {
  padding-right: 64px;
}
.toggle {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  padding: 8px 10px;
  border-radius: 6px;
}
.toggle:hover {
  background: var(--primary-soft);
}

.error-message {
  background: var(--danger-soft);
  color: var(--danger);
  border: 1px solid #f6c9c9;
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 16px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: var(--shadow-primary);
  transition:
    background 0.15s,
    transform 0.15s;
}
.submit-btn:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.switch-link {
  text-align: center;
  margin: 20px 0 0;
  font-size: 14px;
  color: var(--muted);
}
.switch-link a {
  font-weight: 700;
  text-decoration: none;
}
.switch-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .form-box {
    padding: 32px 22px;
    border-radius: var(--radius-lg);
  }
  .form-box h2 {
    font-size: 24px;
  }
}
</style>
