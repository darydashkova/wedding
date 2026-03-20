<script setup>
defineProps({
  wedding: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="section-card details-layout illustrated-card details-illustrated">
    <div class="decor-cluster decor-cluster-top" aria-hidden="true">
      <span class="decor-leaf decor-leaf-a"></span>
      <span class="decor-leaf decor-leaf-c"></span>
      <span class="decor-pearl decor-pearl-a"></span>
      <span class="decor-pearl decor-pearl-c"></span>
      <span class="decor-pearl decor-pearl-e"></span>
    </div>

    <p class="section-kicker">Дата и место</p>

    <div>
      <div class="section-heading">
        <h2>Будем рады видеть вас рядом в этот особенный день</h2>
      </div>

      <div class="details-highlight">
        <div>
          <span class="label">Дата</span>
          <strong>{{ wedding.date.full }}</strong>
        </div>
        <div>
          <span class="label">Начало</span>
          <strong>{{ wedding.date.time }}</strong>
        </div>
      </div>

      <div class="place-card">
        <h3>{{ wedding.place.venue }}</h3>
        <p>{{ wedding.place.address }}</p>
        <p>{{ wedding.place.note }}</p>
      </div>
    </div>

    <div class="map-card">
      <div class="map-frame">
        <iframe
          class="map-embed"
          :src="wedding.place.mapEmbedUrl"
          loading="lazy"
          title="Карта места проведения"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p class="map-title">Банкет</p>
      <p class="map-copy">
        После росписи ждём вас на праздничный ужин в ресторане "Nonna Mia", Бабушкина 293/1. По кнопке ниже
        можно сразу открыть маршрут.
      </p>
      <a class="button button-secondary" :href="wedding.place.mapUrl" target="_blank" rel="noreferrer">
        Открыть карту
      </a>
    </div>
  </div>
</template>
