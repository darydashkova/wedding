<script setup>
defineProps({
  wedding: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="section-card illustrated-card story-illustrated">
    <div class="decor-cluster decor-cluster-side" aria-hidden="true">
      <span class="decor-leaf decor-leaf-a"></span>
      <span class="decor-leaf decor-leaf-b"></span>
      <span class="decor-pearl decor-pearl-a"></span>
      <span class="decor-pearl decor-pearl-b"></span>
      <span class="decor-pearl decor-pearl-e"></span>
    </div>

    <div class="section-heading">
      <p class="section-kicker">Наша история</p>
      <h2>Каждая важная глава привела нас к этому дню</h2>
    </div>

    <div class="story-gallery">
      <figure class="story-photo story-photo-tall">
        <img :src="wedding.photos.lev" :alt="wedding.couple.first" />
        <figcaption>{{ wedding.couple.first }}</figcaption>
      </figure>

      <figure class="story-photo story-photo-wide">
        <img :src="wedding.photos.together" :alt="`${wedding.couple.first} и ${wedding.couple.second}`" />
        <figcaption>Наши любимые кадры</figcaption>
      </figure>

      <figure class="story-photo story-photo-tall">
        <img :src="wedding.photos.anzhi" :alt="wedding.couple.second" />
        <figcaption>{{ wedding.couple.second }}</figcaption>
      </figure>
    </div>

    <div class="story-grid">
      <article v-for="item in wedding.story" :key="item.year" class="story-card">
        <p class="story-year">{{ item.year }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </div>
</template>
