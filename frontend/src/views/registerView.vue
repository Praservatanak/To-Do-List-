<script setup>
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userData = reactive({ name: '', age: '', email: '', password: '' })
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const passwordsMismatch = computed(
  () => confirmPassword.value.length > 0 && userData.password !== confirmPassword.value,
)

const handleRegister = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    if (userData.password !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match'
      return
    }
    await authStore.register(userData)
    router.push('/todo')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Register failed'
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

      <h2>Create an account</h2>
      <p class="form-sub">Join your family's shared list in under a minute.</p>

      <form @submit.prevent="handleRegister" class="form-input">
        <div class="row">
          <div class="field grow">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              v-model="userData.name"
              placeholder="Your name"
              autocomplete="name"
              required
            />
          </div>
          <div class="field age">
            <label for="age">Age</label>
            <input
              id="age"
              type="number"
              min="0"
              v-model="userData.age"
              placeholder="Age"
              required
            />
          </div>
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="userData.email"
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
              v-model="userData.password"
              placeholder="Create a password"
              autocomplete="new-password"
              required
            />
            <button
              type="button"
              class="toggle"
              :aria-label="showPassword ? 'Hide passwords' : 'Show passwords'"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <div class="field">
          <label for="conpass">Confirm password</label>
          <input
            id="conpass"
            :type="showPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            :class="{ invalid: passwordsMismatch }"
            placeholder="Re-enter your password"
            autocomplete="new-password"
            required
          />
          <span v-if="passwordsMismatch" class="hint">Passwords do not match yet.</span>
        </div>

        <div v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</div>

        <button class="submit-btn" type="submit" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'Creating account...' : 'Create account' }}
        </button>

        <p class="switch-link">
          Already have an account? <router-link to="/login">Log in</router-link>
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
  padding: 32px 16px;
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
  right: -60px;
}
.form-page::after {
  width: 300px;
  height: 300px;
  background: #c9f0e1;
  bottom: -80px;
  left: -40px;
}

.form-box {
  position: relative;
  z-index: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  width: 100%;
  max-width: 460px;
  box-shadow: var(--shadow-lg);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
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
  margin: 0 0 26px;
  color: var(--muted);
  font-size: 14px;
}

.form-input {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  gap: 12px;
}
.grow {
  flex: 1;
  min-width: 0;
}
.age {
  width: 96px;
  flex-shrink: 0;
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
input.invalid {
  border-color: var(--danger);
  background: #fff8f8;
}
input.invalid:focus {
  box-shadow: 0 0 0 4px rgba(214, 69, 69, 0.14);
}
.hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--danger);
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
  .age {
    width: 82px;
  }
}
</style>
