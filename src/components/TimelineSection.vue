<script setup>
defineProps({
  timeline: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="section-card illustrated-card timeline-illustrated">
    <div class="decor-cluster decor-cluster-bottom" aria-hidden="true">
      <span class="decor-leaf decor-leaf-c"></span>
      <span class="decor-leaf decor-leaf-d"></span>
      <span class="decor-pearl decor-pearl-b"></span>
      <span class="decor-pearl decor-pearl-d"></span>
      <span class="decor-pearl decor-pearl-f"></span>
    </div>

    <p class="section-kicker">Тайминг дня</p>

    <div class="section-heading">
      <h2>Делимся расписанием самого важного для нас вечера</h2>
    </div>

    <div class="timeline-list">
      <article v-for="item in timeline" :key="item.time" class="timeline-card">
        <p class="timeline-time">{{ item.time }}</p>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </article>
    </div>
  </div>
</template>
