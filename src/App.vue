<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PetalCanvas from './components/PetalCanvas.vue'
import HeroSection from './components/HeroSection.vue'
import StorySection from './components/StorySection.vue'
import DetailsSection from './components/DetailsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import RsvpSection from './components/RsvpSection.vue'
import anzhiPhoto from './assets/images/anzhi.jpg'
import levPhoto from './assets/images/lev.jpg'
import togetherPhoto from './assets/images/together.jpg'
import togetherTwoPhoto from './assets/images/together2.jpg'

const wedding = {
  couple: {
    first: 'Лев',
    second: 'Анжелика',
  },
  date: {
    day: '2',
    month: 'мая',
    year: '2026',
    full: '2 мая 2026',
    weekday: 'суббота',
    time: '17:00',
  },
  hero: {
    eyebrow: 'Свадебное приглашение',
    title: 'Когда наступает особенный момент, хочется разделить его только с самыми дорогими людьми.',
    subtitle:
      '2 мая 2026 года мы соединим наши судьбы и станем семьёй. Нам невероятно важно, чтобы в этот миг рядом были вы.',
  },
  photos: {
    hero: togetherPhoto,
    lev: levPhoto,
    anzhi: anzhiPhoto,
    together: togetherTwoPhoto,
  },
  story: [
    {
      year: 'Особенный день',
      title: 'Этот день именно такой',
      text: 'Приглашаем вас на нашу свадьбу, чтобы вместе наполнить этот день светом, любовью и счастливыми воспоминаниями.',
    },
    {
      year: 'С теплом',
      title: 'В почве искренних чувств возрастёт древо счастья',
      text: 'Для нас большая радость встретить этот день рядом с самыми близкими и сохранить его в памяти как начало новой семьи.',
    },
    {
      year: 'Вместе',
      title: 'Ждём вас рядом',
      text: 'Будем счастливы разделить с вами торжественную роспись, праздничный вечер и все тёплые мгновения этого дня.',
    },
  ],
  place: {
    ceremony: {
      label: 'Роспись',
      venue: 'Екатерининский зал',
      address: 'Дворец бракосочетания, ул. Офицерская, 47, Краснодар',
      note: 'Торжественная церемония начнётся в 17:00.',
    },
    banquet: {
      label: 'Банкет',
      venue: 'Парк-отель Троя',
      address: '1 Мая, 131, Краснодар',
      note: 'Праздничный ужин начнётся в 18:30.',
    },
    mapEmbedUrl:
      'https://yandex.ru/map-widget/v1/?ll=38.987485%2C45.060000&z=17&pt=38.987485,45.060000,pm2rdm',
    mapUrl: 'https://yandex.ru/maps/?ll=38.987485%2C45.060000&z=17&pt=38.987485,45.060000,pm2rdm',
  },
  timeline: [
    {
      time: '17:00',
      title: 'Торжественная роспись',
      text: 'Екатерининский зал (Дворец бракосочетания), ул. Офицерская, 47, Краснодар.',
    },
    {
      time: '18:30',
      title: 'Банкет',
      text: 'Парк-отель Троя, 1 Мая, 131, Краснодар.',
    },
  ],
  rsvpDeadline: '10.04.2026',
}

const isReducedMotion = ref(false)
const revealedSections = ref(new Set(['story']))
const sectionIds = ['story', 'details', 'timeline', 'rsvp']
let mediaQuery
let observer

const sectionAttributes = computed(() =>
  sectionIds.reduce((accumulator, id) => {
    accumulator[id] = {
      id,
      class: ['reveal-section', { 'is-visible': isReducedMotion.value || revealedSections.value.has(id) }],
    }

    return accumulator
  }, {}),
)

const handleReducedMotionChange = (event) => {
  isReducedMotion.value = event.matches

  if (event.matches) {
    revealedSections.value = new Set(sectionIds)
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  handleReducedMotionChange(mediaQuery)
  mediaQuery.addEventListener('change', handleReducedMotionChange)

  if (isReducedMotion.value) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        revealedSections.value = new Set([...revealedSections.value, entry.target.id])
        observer.unobserve(entry.target)
      })
    },
    {
      threshold: 0.2,
    },
  )

  sectionIds.forEach((id) => {
    const element = document.getElementById(id)

    if (element) {
      observer.observe(element)
    }
  })
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', handleReducedMotionChange)
  observer?.disconnect()
})
</script>

<template>
  <div class="page-shell">
    <PetalCanvas />
    <HeroSection :wedding="wedding" />

    <main class="main-content">
      <section v-bind="sectionAttributes.story">
        <StorySection :wedding="wedding" />
      </section>

      <section v-bind="sectionAttributes.details">
        <DetailsSection :wedding="wedding" />
      </section>

      <section v-bind="sectionAttributes.timeline">
        <TimelineSection :timeline="wedding.timeline" />
      </section>

      <section v-bind="sectionAttributes.rsvp">
        <RsvpSection :wedding="wedding" />
      </section>
    </main>
  </div>
</template>
