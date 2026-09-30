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
    <section class="hero">
      <div class="hero-copy">
        <h1>Keep the household<br />on <span>the same page</span></h1>
        <p class="sub-text">
          One shared list for chores, errands, and reminders — so nothing falls through the cracks.
        </p>
        <div class="hero-actions">
          <button class="primary-btn" @click="handleGetStarted">Get Started</button>
          <router-link class="ghost-btn" to="/about">How it works</router-link>
        </div>
      </div>

      <!-- Live-looking preview of the app -->
      <div class="preview" aria-hidden="true">
        <div class="preview-card">
          <div class="preview-head">
            <strong>This week</strong>
            <span class="preview-count">3 left</span>
          </div>
          <div class="preview-row done">
            <span class="check">✓</span>
            <span class="preview-title">Take out the bins</span>
            <span class="chip chip-done">Done</span>
          </div>
          <div class="preview-row">
            <span class="check empty"></span>
            <span class="preview-title">Pick up groceries</span>
            <span class="chip chip-high">High</span>
          </div>
          <div class="preview-row">
            <span class="check empty"></span>
            <span class="preview-title">Book dentist for Mia</span>
            <span class="chip chip-med">Medium</span>
          </div>
          <div class="preview-row">
            <span class="check empty"></span>
            <span class="preview-title">Water the plants</span>
            <span class="chip chip-low">Low</span>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
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
    </section>

    <section class="steps">
      <h2>Up and running in a minute</h2>
      <div class="steps-grid">
        <div class="step">
          <span class="step-num">1</span>
          <h3>Create your account</h3>
          <p>Sign up with your email and log in from any device.</p>
        </div>
        <div class="step">
          <span class="step-num">2</span>
          <h3>Add your first todo</h3>
          <p>Give it a title, a due date, and a priority.</p>
        </div>
        <div class="step">
          <span class="step-num">3</span>
          <h3>Check it off together</h3>
          <p>Tick things off as you go and see progress at a glance.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

/* ---------- Hero ---------- */
.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 48px;
  padding: 72px 0 56px;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 26px;
  box-shadow: var(--shadow-sm);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 4px rgba(34, 176, 125, 0.18);
}
h1 {
  font-size: clamp(36px, 5.6vw, 58px);
  line-height: 1.06;
  margin: 0 0 20px;
  letter-spacing: -1.5px;
  font-weight: 800;
}
h1 span {
  color: var(--primary);
}
.sub-text {
  color: var(--muted);
  font-size: 18px;
  max-width: 480px;
  margin: 0 0 32px;
  line-height: 1.6;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.primary-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  box-shadow: var(--shadow-primary);
  transition:
    transform 0.15s,
    background 0.15s;
}
.primary-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}
.ghost-btn {
  display: inline-flex;
  align-items: center;
  padding: 15px 26px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition:
    border-color 0.15s,
    transform 0.15s;
}
.ghost-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

/* ---------- Preview card ---------- */
.preview {
  position: relative;
  display: flex;
  justify-content: center;
}
.preview::before {
  content: '';
  position: absolute;
  inset: -24px 8% -24px 8%;
  background: radial-gradient(closest-side, rgba(74, 99, 231, 0.22), transparent);
  z-index: 0;
}
.preview-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 22px;
  box-shadow: var(--shadow-lg);
  transform: rotate(2deg);
}
.preview-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-size: 16px;
}
.preview-count {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 4px 10px;
  border-radius: 999px;
}
.preview-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-md);
  background: #f7faff;
  margin-bottom: 8px;
}
.preview-row:last-child {
  margin-bottom: 0;
}
.preview-title {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
}
.preview-row.done .preview-title {
  color: var(--subtle);
  text-decoration: line-through;
}
.check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--success);
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.check.empty {
  background: transparent;
  border: 2px solid #c9d1ea;
}
.chip {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 999px;
}
.chip-done {
  background: var(--success-soft);
  color: var(--success);
}
.chip-high {
  background: var(--danger-soft);
  color: var(--danger);
}
.chip-med {
  background: var(--warning-soft);
  color: var(--warning);
}
.chip-low {
  background: var(--primary-soft);
  color: var(--primary);
}

/* ---------- Features ---------- */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 10px 0 64px;
}
.feature-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 26px 24px;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--primary-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
}
.feature-card h3 {
  font-size: 17px;
  margin: 0 0 8px;
}
.feature-card p {
  font-size: 14px;
  color: var(--muted);
  margin: 0;
  line-height: 1.6;
}

/* ---------- Steps ---------- */
.steps {
  padding: 8px 0 64px;
  text-align: center;
}
.steps h2,
.cta h2 {
  font-size: clamp(26px, 3.6vw, 34px);
  letter-spacing: -0.6px;
  margin: 0 0 32px;
}
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  text-align: left;
}
.step {
  padding: 24px;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.6);
  border: 1px dashed #c9d1ea;
}
.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 14px;
}
.step h3 {
  margin: 0 0 6px;
  font-size: 16px;
}
.step p {
  margin: 0;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
}

/* ---------- CTA ---------- */
.cta {
  text-align: center;
  padding: 56px 24px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, #4a63e7, #6c83ff);
  color: white;
  box-shadow: var(--shadow-lg);
}
.cta h2 {
  margin-bottom: 8px;
}
.cta p {
  margin: 0 0 26px;
  opacity: 0.9;
}
.primary-btn.light {
  background: white;
  color: var(--primary);
  box-shadow: 0 10px 24px rgba(20, 30, 90, 0.25);
}
.primary-btn.light:hover {
  background: #f2f5ff;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 48px 0 40px;
    gap: 40px;
  }
  .sub-text {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-actions {
    justify-content: center;
  }
  .preview-card {
    transform: none;
  }
}
@media (max-width: 720px) {
  .wrap {
    padding: 0 16px 40px;
  }
  .features,
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .cta {
    padding: 40px 20px;
  }
}
</style>
