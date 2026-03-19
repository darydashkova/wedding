<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref(null)

let context
let animationFrame = 0
let petals = []
let width = 0
let height = 0
let dpr = 1
let prefersReducedMotion = false
let mediaQuery

const createPetal = (spawnAbove = false) => ({
  x: Math.random() * width,
  y: spawnAbove ? Math.random() * -height : Math.random() * height,
  size: 18 + Math.random() * 28,
  speedY: 0.75 + Math.random() * 1.55,
  speedX: -0.55 + Math.random() * 1.1,
  rotation: Math.random() * Math.PI * 2,
  rotationSpeed: -0.02 + Math.random() * 0.04,
  sway: 18 + Math.random() * 34,
  swayOffset: Math.random() * Math.PI * 2,
  opacity: 0.48 + Math.random() * 0.32,
  tilt: 0.75 + Math.random() * 0.5,
  hue: Math.random() > 0.55 ? 'blush' : 'rose',
})

const createPetals = () => {
  const count = Math.max(28, Math.floor(width / 54))
  petals = Array.from({ length: count }, () => createPetal())
}

const resizeCanvas = () => {
  const canvas = canvasRef.value

  if (!canvas) {
    return
  }

  width = window.innerWidth
  height = window.innerHeight
  dpr = window.devicePixelRatio || 1

  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  context = canvas.getContext('2d')
  context.setTransform(dpr, 0, 0, dpr, 0, 0)

  createPetals()
  draw()
}

const drawPetal = (petal, time) => {
  const sway = Math.sin(time * 0.001 + petal.swayOffset) * petal.sway
  const x = petal.x + sway
  const y = petal.y

  context.save()
  context.translate(x, y)
  context.rotate(petal.rotation)
  context.scale(1, petal.tilt)

  const gradient = context.createLinearGradient(-petal.size, -petal.size, petal.size, petal.size)
  if (petal.hue === 'rose') {
    gradient.addColorStop(0, 'rgba(255, 238, 243, 0.98)')
    gradient.addColorStop(0.38, 'rgba(244, 178, 194, 0.96)')
    gradient.addColorStop(1, 'rgba(181, 74, 103, 0.92)')
  } else {
    gradient.addColorStop(0, 'rgba(255, 247, 245, 0.98)')
    gradient.addColorStop(0.42, 'rgba(248, 205, 212, 0.95)')
    gradient.addColorStop(1, 'rgba(210, 138, 150, 0.88)')
  }

  context.globalAlpha = petal.opacity
  context.fillStyle = gradient
  context.beginPath()
  context.moveTo(0, -petal.size * 1.12)
  context.bezierCurveTo(
    petal.size * 0.98,
    -petal.size * 0.9,
    petal.size * 1.18,
    petal.size * 0.18,
    petal.size * 0.2,
    petal.size * 1.05,
  )
  context.bezierCurveTo(
    -petal.size * 0.15,
    petal.size * 1.18,
    -petal.size * 1.05,
    petal.size * 0.38,
    -petal.size * 0.72,
    -petal.size * 0.58,
  )
  context.bezierCurveTo(-petal.size * 0.4, -petal.size * 0.98, -petal.size * 0.08, -petal.size * 1.16, 0, -petal.size * 1.12)
  context.closePath()
  context.fill()

  context.globalAlpha = petal.opacity * 0.5
  context.fillStyle = 'rgba(255, 255, 255, 0.75)'
  context.beginPath()
  context.ellipse(-petal.size * 0.18, -petal.size * 0.42, petal.size * 0.16, petal.size * 0.42, -0.55, 0, Math.PI * 2)
  context.fill()

  context.globalAlpha = petal.opacity * 0.45
  context.strokeStyle = petal.hue === 'rose' ? 'rgba(141, 49, 80, 0.58)' : 'rgba(166, 99, 116, 0.48)'
  context.lineWidth = Math.max(1.2, petal.size * 0.045)
  context.beginPath()
  context.moveTo(-petal.size * 0.08, -petal.size * 0.72)
  context.quadraticCurveTo(-petal.size * 0.02, -petal.size * 0.05, petal.size * 0.06, petal.size * 0.92)
  context.stroke()

  context.globalAlpha = petal.opacity * 0.22
  context.fillStyle = 'rgba(120, 32, 61, 0.7)'
  context.beginPath()
  context.ellipse(petal.size * 0.22, petal.size * 0.18, petal.size * 0.34, petal.size * 0.7, 0.65, 0, Math.PI * 2)
  context.fill()

  context.restore()
}

const draw = (time = 0) => {
  if (!context) {
    return
  }

  context.clearRect(0, 0, width, height)

  petals.forEach((petal) => drawPetal(petal, time))
}

const animate = (time = 0) => {
  petals.forEach((petal) => {
    petal.y += petal.speedY
    petal.x += petal.speedX
    petal.rotation += petal.rotationSpeed

    if (petal.y - petal.size > height || petal.x < -80 || petal.x > width + 80) {
      Object.assign(petal, createPetal(true))
    }
  })

  draw(time)
  animationFrame = window.requestAnimationFrame(animate)
}

const handleMotionPreference = (event) => {
  prefersReducedMotion = event.matches

  if (prefersReducedMotion) {
    window.cancelAnimationFrame(animationFrame)
    draw()
    return
  }

  window.cancelAnimationFrame(animationFrame)
  animationFrame = window.requestAnimationFrame(animate)
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', handleMotionPreference)
  prefersReducedMotion = mediaQuery.matches

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  if (!prefersReducedMotion) {
    animationFrame = window.requestAnimationFrame(animate)
  }
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', handleMotionPreference)
  window.removeEventListener('resize', resizeCanvas)
  window.cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <canvas ref="canvasRef" class="petal-canvas" aria-hidden="true"></canvas>
</template>
