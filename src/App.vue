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
    day: '12',
    month: 'сентября',
    year: '2026',
    full: '12 сентября 2026',
    weekday: 'суббота',
    time: '15:30',
  },
  hero: {
    eyebrow: 'Свадебное приглашение',
    title: 'День, когда мы скажем друг другу «да»',
    subtitle:
      'Будем счастливы разделить с вами наш праздник, тёплый вечер, искренние слова и танцы до ночи.',
  },
  photos: {
    hero: togetherPhoto,
    lev: levPhoto,
    anzhi: anzhiPhoto,
    together: togetherTwoPhoto,
  },
  story: [
    {
      year: '2021',
      title: 'Первая встреча',
      text: 'Мы познакомились случайно, но с первого разговора стало ясно: впереди у этой истории будет продолжение.',
    },
    {
      year: '2023',
      title: 'Общее путешествие',
      text: 'За это время мы собрали десятки дорогих сердцу воспоминаний, научились слышать друг друга и мечтать вместе.',
    },
    {
      year: '2026',
      title: 'Самое важное решение',
      text: 'Теперь мы хотим начать новую главу и отпраздновать этот день в кругу самых близких людей.',
    },
  ],
  place: {
    venue: 'Загородный клуб «Белый Сад»',
    address: 'г. Краснодар, ул. Володи Головатого, 313',
    note: 'Если будете ехать на машине, удобнее сразу строить маршрут до адреса. Вход и основная встреча гостей будут рядом с площадкой.',
    mapEmbedUrl:
      'https://yandex.ru/map-widget/v1/?text=%D0%B3.%20%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%2C%20%D1%83%D0%BB.%20%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%20%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%82%D0%BE%D0%B3%D0%BE%2C%20313&z=16',
    mapUrl:
      'https://yandex.ru/maps/?text=%D0%B3.%20%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%2C%20%D1%83%D0%BB.%20%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%20%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%82%D0%BE%D0%B3%D0%BE%2C%20313',
  },
  timeline: [
    {
      time: '15:30',
      title: 'Сбор гостей',
      text: 'Встречаемся во внутреннем саду, знакомимся, фотографируемся и наслаждаемся приветственным игристым.',
    },
    {
      time: '16:00',
      title: 'Церемония',
      text: 'Главный момент дня на террасе среди цветов, света и самых важных для нас людей.',
    },
    {
      time: '17:00',
      title: 'Ужин и тосты',
      text: 'Переходим в зал, где нас ждут ужин, музыка, тёплые слова и праздничная программа.',
    },
    {
      time: '20:00',
      title: 'Танцы',
      text: 'Оставляем формальности позади и встречаем вечер под любимые песни и огни гирлянд.',
    },
  ],
  rsvpDeadline: '1 августа 2026',
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
