<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="app-nav">
    <RouterLink to="/" class="logo">
      <i class="fa-solid fa-calendar-check" style="color: rgb(116, 192, 252)"></i>
      Planify</RouterLink
    >

    <div class="links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>

      <template v-if="authStore.isLoggedIn">
        <RouterLink to="/todo">Todo</RouterLink>
        <RouterLink to="/user">Profile</RouterLink>
        <button class="link-btn" @click="handleLogout">Logout</button>
      </template>

      <template v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </template>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.app-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e4e9f7;
  font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
}
.logo {
  font-weight: 800;
  font-size: 18px;
  text-decoration: none;
  color: #1b2340;
}
.links {
  display: flex;
  align-items: center;
  gap: 20px;
}
.links a {
  text-decoration: none;
  color: #5b6788;
  font-size: 14px;
  font-weight: 600;
}
.links a.router-link-active {
  color: #4a63e7;
}
.link-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #5b6788;
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  font-family: inherit;
}
</style>
