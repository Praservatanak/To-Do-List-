<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

function handleGetStarted() {
  router.push(authStore.isLoggedIn ? '/todo' : '/login')
}

const values = [
  {
    icon: '🏡',
    title: 'Built for families',
    text: 'No teams, no workspaces, no jargon. Just the people you live with and the things that need doing.',
  },
  {
    icon: '⚡',
    title: 'Quick to use',
    text: 'Add a todo in a few seconds. Set a priority and a due date only when it matters.',
  },
  {
    icon: '🤝',
    title: 'Shared by default',
    text: 'One list for the whole household, so no one has to ask "did anyone get the milk?"',
  },
  {
    icon: '🔒',
    title: 'Private by design',
    text: 'No ads and no tracking. Your list is visible only to your household.',
  },
]

const faqs = [
  {
    q: 'Who can see my todos?',
    a: 'Only the people in your household. Nothing is public and nothing is shared with third parties.',
  },
  {
    q: 'Can I set how urgent a task is?',
    a: 'Yes. Every todo has a low, medium, or high priority and an optional due date.',
  },
  {
    q: 'What happens when a task is overdue?',
    a: 'It is marked as overdue in the list so it stands out until someone completes it.',
  },
  {
    q: 'Does it cost anything?',
    a: 'No. This app is a private project made for our family.',
  },
]
</script>

<template>
  <div class="wrap">
    <section class="hero">
      <h1>Small tasks, <span>shared</span> between us</h1>
      <p class="sub-text">
        Family Todo started with a fridge full of sticky notes and a lot of "I thought you were
        doing that." It's now one place where the whole household can see what needs doing.
      </p>
    </section>

    <section class="story">
      <div class="story-card">
        <h2>Why we built it</h2>
        <p>
          Group chats bury reminders and paper lists get lost. We wanted something simple enough for
          everyone at home to use, from kids to grandparents, without learning a new tool.
        </p>
        <p>
          So every feature has one job: make it clear what needs doing, who can see it, and when it
          is due.
        </p>
      </div>
      <div class="stats">
        <div class="stat">
          <strong>1</strong>
          <span>shared list for the whole home</span>
        </div>
        <div class="stat">
          <strong>3</strong>
          <span>priority levels to sort what's urgent</span>
        </div>
        <div class="stat">
          <strong>0</strong>
          <span>ads or strangers</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>What we care about</h2>
      <div class="values">
        <div v-for="v in values" :key="v.title" class="value-card">
          <div class="value-icon">{{ v.icon }}</div>
          <h3>{{ v.title }}</h3>
          <p>{{ v.text }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Common questions</h2>
      <div class="faq">
        <details v-for="f in faqs" :key="f.q" class="faq-item">
          <summary>{{ f.q }}</summary>
          <p>{{ f.a }}</p>
        </details>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wrap {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

.hero {
  text-align: center;
  padding: 64px 0 40px;
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
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
}
h1 {
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.1;
  margin: 0 0 20px;
  letter-spacing: -1.2px;
  font-weight: 800;
}
h1 span {
  color: var(--primary);
}
.sub-text {
  color: var(--muted);
  font-size: 17px;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ---------- Story ---------- */
.story {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 18px;
  padding-bottom: 56px;
}
.story-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}
.story-card h2 {
  margin: 0 0 14px;
  font-size: 24px;
  letter-spacing: -0.4px;
}
.story-card p {
  margin: 0 0 12px;
  color: var(--muted);
  line-height: 1.7;
  font-size: 15px;
  max-width: 62ch;
}
.story-card p:last-child {
  margin-bottom: 0;
}
.stats {
  display: grid;
  gap: 12px;
}
.stat {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--primary-soft);
  border: 1px solid #dbe1ff;
  border-radius: var(--radius-lg);
  padding: 18px 22px;
}
.stat strong {
  font-size: 34px;
  line-height: 1;
  color: var(--primary);
  letter-spacing: -1px;
  min-width: 34px;
}
.stat span {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.4;
}

/* ---------- Sections ---------- */
.section {
  padding-bottom: 56px;
}
.section h2,
.cta h2 {
  font-size: clamp(24px, 3.4vw, 32px);
  letter-spacing: -0.5px;
  margin: 0 0 24px;
}

/* ---------- Values ---------- */
.values {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.value-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.value-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.value-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--primary-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 14px;
}
.value-card h3 {
  margin: 0 0 6px;
  font-size: 17px;
}
.value-card p {
  margin: 0;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
}

/* ---------- FAQ ---------- */
.faq {
  display: grid;
  gap: 10px;
}
.faq-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0 20px;
}
.faq-item summary {
  cursor: pointer;
  padding: 18px 0;
  font-weight: 700;
  font-size: 15px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.faq-item summary::-webkit-details-marker {
  display: none;
}
.faq-item summary::after {
  content: '+';
  font-size: 22px;
  color: var(--primary);
  transition: transform 0.2s;
}
.faq-item[open] summary::after {
  transform: rotate(45deg);
}
.faq-item p {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
  max-width: 64ch;
}

/* ---------- CTA ---------- */
.cta {
  text-align: center;
  padding: 48px 24px;
  border-radius: var(--radius-xl);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}
.cta h2 {
  margin-bottom: 8px;
}
.cta p {
  margin: 0 0 24px;
  color: var(--muted);
}
.primary-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 14px 30px;
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

/* ---------- Responsive ---------- */
@media (max-width: 820px) {
  .story {
    grid-template-columns: 1fr;
  }
  .stats {
    grid-template-columns: repeat(3, 1fr);
  }
  .stat {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
@media (max-width: 640px) {
  .wrap {
    padding: 0 16px 40px;
  }
  .hero {
    padding: 44px 0 32px;
  }
  .values,
  .stats {
    grid-template-columns: 1fr;
  }
  .stat {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
  .story-card {
    padding: 24px;
  }
}
</style>
