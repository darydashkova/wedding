<script setup>
defineProps({
  wedding: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <header class="hero-card illustrated-card hero-illustrated">
    <div class="decor-cluster decor-cluster-top" aria-hidden="true">
      <span class="decor-leaf decor-leaf-a"></span>
      <span class="decor-leaf decor-leaf-b"></span>
      <span class="decor-pearl decor-pearl-a"></span>
      <span class="decor-pearl decor-pearl-b"></span>
      <span class="decor-pearl decor-pearl-e"></span>
    </div>

    <div class="decor-cluster decor-cluster-bottom" aria-hidden="true">
      <span class="decor-leaf decor-leaf-c"></span>
      <span class="decor-leaf decor-leaf-d"></span>
      <span class="decor-pearl decor-pearl-c"></span>
      <span class="decor-pearl decor-pearl-d"></span>
      <span class="decor-pearl decor-pearl-f"></span>
    </div>

    <div class="hero-copy">
      <p class="eyebrow">{{ wedding.hero.eyebrow }}</p>
      <h1 class="hero-names">
        <span class="hero-name hero-name-first">{{ wedding.couple.first }}</span>
        <span class="hero-ampersand">&</span>
        <span class="hero-name hero-name-second">{{ wedding.couple.second }}</span>
      </h1>
      <p class="hero-title">{{ wedding.hero.title }}</p>
      <p class="hero-subtitle">{{ wedding.hero.subtitle }}</p>
    </div>

    <div class="hero-aside">
      <figure class="hero-photo-card">
        <img :src="wedding.photos.hero" :alt="`${wedding.couple.first} и ${wedding.couple.second}`" />
      </figure>

      <div class="date-card">
        <p class="date-card-month">{{ wedding.date.month }}</p>
        <p class="date-card-day">{{ wedding.date.day }}</p>
        <p class="date-card-meta">{{ wedding.date.weekday }}, {{ wedding.date.year }}</p>
        <p class="date-card-time">Начало в {{ wedding.date.time }}</p>
      </div>

      <nav class="hero-nav" aria-label="Навигация по приглашению">
        <a href="#story">История</a>
        <a href="#details">Дата и место</a>
        <a href="#timeline">Тайминг</a>
        <a href="#rsvp">Подтвердить участие</a>
      </nav>
    </div>
  </header>
</template>
