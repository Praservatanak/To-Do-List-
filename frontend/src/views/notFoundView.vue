<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>This page doesn't exist.</p>
    <button @click="router.push('/')">Go Home</button>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
  background: linear-gradient(180deg, #eaf0ff, #f7faff);
  text-align: center;
}
.not-found h1 {
  font-size: 72px;
  margin: 0;
  color: #4a63e7;
}
.not-found p {
  color: #5b6788;
  font-size: 16px;
  margin: 0 0 12px;
}
.not-found button {
  background: #4a63e7;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
</style>
