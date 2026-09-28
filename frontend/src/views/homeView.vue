<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

function handleGetStarted() {
  router.push(authStore.isLoggedIn ? '/todo' : '/login')
}
</script>

<template>
  <div class="wrap">
    <div class="hero">
      <div class="pill"><span class="dot"></span>Just for our family</div>
      <h1>Keep the household<br />on <span>the same page</span></h1>
      <p class="sub-text">
        One shared list for chores, errands, and reminders — so nothing falls through the cracks.
      </p>
      <div class="hero-actions">
        <button class="primary-btn" @click="handleGetStarted">Get Started</button>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">📋</div>
        <h3>Shared list</h3>
        <p>Everyone in the family sees the same todos, updated in real time.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔔</div>
        <h3>Priorities &amp; due dates</h3>
        <p>Mark what's urgent, set due dates, never lose track of chores.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Private &amp; secure</h3>
        <p>Just for your household — no ads, no strangers, your data only.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}
.hero {
  text-align: center;
  padding: 60px 0 40px;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e4e9f7;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 13px;
  color: #5b6788;
  margin-bottom: 28px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22b07d;
}
h1 {
  font-size: 52px;
  line-height: 1.08;
  margin: 0 0 20px;
  letter-spacing: -1px;
  font-weight: 800;
}
h1 span {
  color: #4a63e7;
}
.sub-text {
  color: #5b6788;
  font-size: 17px;
  max-width: 480px;
  margin: 0 auto 32px;
  line-height: 1.6;
}
.primary-btn {
  background: #4a63e7;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 10px 0 70px;
}
.feature-card {
  background: white;
  border: 1px solid #e4e9f7;
  border-radius: 16px;
  padding: 24px 22px;
}
.feature-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #eef1ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 14px;
}
.feature-card h3 {
  font-size: 16px;
  margin: 0 0 8px;
}
.feature-card p {
  font-size: 13px;
  color: #5b6788;
  margin: 0;
  line-height: 1.5;
}
@media (max-width: 720px) {
  h1 {
    font-size: 34px;
  }
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
