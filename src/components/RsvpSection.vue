<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  wedding: {
    type: Object,
    required: true,
  },
})

const form = reactive({
  name: '',
  phone: '',
  attendance: 'yes',
  guests: 1,
  note: '',
})

const errors = reactive({
  name: '',
  phone: '',
})

const submitted = ref(false)
const submitError = ref('')
const isSubmitting = ref(false)

const validate = () => {
  errors.name = form.name.trim() ? '' : 'Укажите имя, чтобы мы понимали, кого ждать.'
  errors.phone = /[+\d][\d\s\-()]{8,}/.test(form.phone.trim())
    ? ''
    : 'Укажите номер телефона, чтобы можно было связаться с вами при необходимости.'

  return !errors.name && !errors.phone
}

const handleSubmit = async () => {
  if (!validate()) {
    return
  }

  submitted.value = false
  submitError.value = ''
  isSubmitting.value = true

  try {
    const response = await fetch('https://formsubmit.co/ajax/chernyavskiilev@yandex.ru', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        attendance: form.attendance === 'yes' ? 'Будет' : 'Не сможет прийти',
        guests: form.guests,
        note: form.note || 'Без комментария',
        _subject: `RSVP на свадьбу ${props.wedding.couple.first} и ${props.wedding.couple.second}`,
      }),
    })

    const result = await response.json()

    if (!response.ok || result.success === 'false') {
      throw new Error(result.message || 'Не удалось отправить форму.')
    }

    submitted.value = true
    form.name = ''
    form.phone = ''
    form.attendance = 'yes'
    form.guests = 1
    form.note = ''
  } catch (error) {
    submitError.value =
      'Отправка не удалась. Проверьте подключение к интернету. Если адрес ещё не подтверждён в FormSubmit, сначала подтвердите письмо, которое они отправят после первой тестовой заявки.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="section-card rsvp-layout illustrated-card rsvp-illustrated">
    <div class="decor-cluster decor-cluster-side" aria-hidden="true">
      <span class="decor-leaf decor-leaf-a"></span>
      <span class="decor-leaf decor-leaf-d"></span>
      <span class="decor-pearl decor-pearl-a"></span>
      <span class="decor-pearl decor-pearl-c"></span>
      <span class="decor-pearl decor-pearl-e"></span>
    </div>

    <p class="section-kicker">Подтверждение участия</p>

    <div>
      <div class="section-heading">
        <h2>Пожалуйста, подтвердите присутствие до {{ wedding.rsvpDeadline }}</h2>
      </div>
      <p class="rsvp-copy">
        Ваше присутствие в день нашей свадьбы самый значимый подарок для нас.
      </p>
      <div class="gift-note">
        <p class="gift-note-title">Про цветы</p>
        <p>
          Мы понимаем, что дарить цветы на свадьбу это традиция, но хотим пронести воспоминания об этом дне
          сквозь время, поэтому будем рады альтернативе в виде вина, которое будем открывать на каждую
          годовщину.
        </p>
      </div>
      <div class="gift-note">
        <p class="gift-note-title">Примечание</p>
        <p>
          Какая же свадьба без драки? Наша. Просим вас поддержать атмосферу семейного праздника и
          воздержаться от политических и религиозных тем в общении.
        </p>
      </div>
    </div>

    <form class="rsvp-form" @submit.prevent="handleSubmit" novalidate>
      <label>
        <span>Ваше имя</span>
        <input v-model.trim="form.name" type="text" placeholder="Например, Мария и Алексей" />
        <small v-if="errors.name" class="form-error">{{ errors.name }}</small>
      </label>

      <label>
        <span>Номер телефона</span>
        <input v-model.trim="form.phone" type="tel" inputmode="tel" placeholder="+7 (999) 123-45-67" />
        <small v-if="errors.phone" class="form-error">{{ errors.phone }}</small>
      </label>

      <label>
        <span>Вы сможете прийти?</span>
        <div class="attendance-toggle" role="radiogroup" aria-label="Подтверждение присутствия">
          <button
            type="button"
            class="attendance-option"
            :class="{ 'is-selected': form.attendance === 'yes' }"
            role="radio"
            :aria-checked="form.attendance === 'yes'"
            @click="form.attendance = 'yes'"
          >
            С радостью будем
          </button>
          <button
            type="button"
            class="attendance-option"
            :class="{ 'is-selected': form.attendance === 'no' }"
            role="radio"
            :aria-checked="form.attendance === 'no'"
            @click="form.attendance = 'no'"
          >
            К сожалению, не сможем
          </button>
        </div>
      </label>

      <label>
        <span>Количество гостей</span>
        <input v-model.number="form.guests" type="number" min="1" max="6" />
      </label>

      <label>
        <span>Комментарий</span>
        <textarea
          v-model.trim="form.note"
          rows="4"
          placeholder="Напишите, если есть вопросы по меню или другие детали"
        ></textarea>
      </label>

      <button class="button" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправляем...' : 'Подтвердить' }}
      </button>
      <p v-if="submitted" class="form-success">Мы получили ваш ответ, спасибо.</p>
      <p v-if="submitError" class="form-error">{{ submitError }}</p>
    </form>
  </div>
</template>
