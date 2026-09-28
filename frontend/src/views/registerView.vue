<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userData = reactive({ name: '', age: '', email: '', password: '' })
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

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
      <h2>Create an Account</h2>

      <form @submit.prevent="handleRegister" class="form-input">
        <div class="name-input">
          <label for="name" class="email-label">Name</label>
          <input
            id="name"
            type="text"
            v-model="userData.name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="age-input">
          <label for="age" class="email-label">Age</label>
          <input
            id="age"
            type="number"
            v-model="userData.age"
            placeholder="Enter your age"
            required
          />
        </div>
        <div class="email-input">
          <label for="email" class="email-label">Email</label>
          <input
            id="email"
            type="email"
            v-model="userData.email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="pass-input">
          <label for="pass" class="pass-label">Password</label>
          <input
            id="pass"
            type="password"
            v-model="userData.password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="pass-input">
          <label for="conpass" class="pass-label">Password Confirmation</label>
          <input
            id="conpass"
            type="password"
            v-model="confirmPassword"
            placeholder="Confrim your password"
            required
          />
        </div>

        <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>

        <div class="submit">
          <button class="submit-btn" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Registering...' : 'Confirm' }}
          </button>
        </div>

        <p class="switch-link">
          Already have an account? <router-link to="/login">Sign in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}

.form-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(180deg, #eaf0ff, #f7faff);
  font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
}

.form-box {
  background: #ffffff;
  border: 1px solid #e4e9f7;
  border-radius: 16px;
  padding: 40px 32px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 14px 30px rgba(30, 40, 80, 0.08);
}

.form-box h2 {
  font-size: 26px;
  margin: 0 0 28px;
  color: #1b2340;
  letter-spacing: -0.3px;
}

.form-input {
  display: flex;
  flex-direction: column;
}
.name-input,
.age-input,
.email-input,
.pass-input {
  margin-bottom: 18px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #5b6788;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #e4e9f7;
  border-radius: 8px;
  font-size: 15px;
  background: #f7faff;
  color: #1b2340;
}

input:focus {
  outline: 2px solid #4a63e7;
  outline-offset: 1px;
  background: #ffffff;
}

.error-message {
  display: block;
  color: #d64545;
  font-size: 13px;
  margin-bottom: 16px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #4a63e7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.submit-btn:hover:not(:disabled) {
  background: #3a4fc4;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.switch-link {
  text-align: center;
  margin-top: 18px;
  font-size: 13px;
  color: #5b6788;
}

.switch-link a {
  color: #4a63e7;
  font-weight: 600;
  text-decoration: none;
}
</style>
