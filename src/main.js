import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

const root = document.documentElement

const markFontsReady = () => {
  root.classList.remove('fonts-loading')
  root.classList.add('fonts-ready')
}

if (document.fonts?.ready) {
  document.fonts.ready.then(markFontsReady).catch(markFontsReady)
} else {
  markFontsReady()
}

createApp(App).mount('#app')
