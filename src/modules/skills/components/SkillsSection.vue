<template>
  <section id="skills" class="py-16">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-8">

        <!-- 3D Sphere -->
        <div class="flex-1 flex flex-col items-center justify-center h-[500px] relative group">
          <canvas ref="canvasRef" class="w-full h-full cursor-grab active:cursor-grabbing" />
          
          <!-- Hover Tooltip -->
          <div 
            v-if="hoveredSkill"
            class="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm font-medium whitespace-nowrap shadow-2xl backdrop-blur-sm z-10 pointer-events-none animate-in fade-in duration-200"
            :style="{ borderColor: hoveredSkill.color + '66' }"
          >
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" :style="{ background: hoveredSkill.color }" />
              {{ hoveredSkill.name }}
            </div>
          </div>

          <!-- Level Badge -->
          <div 
            v-if="hoveredSkill"
            class="absolute top-8 right-8 px-3 py-1.5 bg-zinc-900/80 border rounded-lg text-xs font-bold backdrop-blur-sm animate-in fade-in duration-200"
            :style="{ color: hoveredSkill.color, borderColor: hoveredSkill.color + '33' }"
          >
            Level {{ hoveredSkill.level }}%
          </div>
        </div>

        <!-- Skills Panel -->
        <div class="flex-1 flex flex-col gap-6">

          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(category, i) in skills"
              :key="category.category"
              @click="switchTab(i)"
              class="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border"
              :class="activeTab === i ? 'text-white' : 'text-zinc-500 hover:text-zinc-300 border-transparent'"
              :style="activeTab === i ? { background: category.color + '33', color: category.color, borderColor: category.color + '66' } : {}"
            >
              {{ category.category }}
            </button>
          </div>

          <!-- Skills Panel -->
          <div class="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-4 min-h-[320px]">

            <!-- Header -->
            <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" :style="{ background: skills[activeTab].color }" />
                <span class="text-zinc-300 text-sm font-medium">{{ skills[activeTab].category }}</span>
              </div>
              <span class="text-zinc-600 text-xs bg-zinc-800 px-2 py-1 rounded-full">
                {{ skills[activeTab].items.length }} {{ t.skills2 }}
              </span>
            </div>

            <!-- Skills List -->
            <div class="grid grid-cols-1 gap-3">
              <div
                v-for="skill in skills[activeTab].items"
                :key="skill.name"
                class="flex items-center gap-3 group"
              >
                <div
                  class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg"
                  :style="{ background: skill.color + '18' }"
                >
                  <Icon :icon="skill.icon" class="w-4 h-4" />
                </div>
                <div class="flex-1 flex flex-col gap-1">
                  <div class="flex justify-between items-center">
                    <span class="text-zinc-300 text-xs font-medium">{{ skill.name }}</span>
                    <span class="text-xs font-bold" :style="{ color: skill.color }">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                    <div
                      class="h-1 rounded-full transition-all duration-700 ease-out"
                      :style="{
                        width: animated ? skill.level + '%' : '0%',
                        'background-color': skill.color,
                        opacity: 1
                      }"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- All Skills Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="skill in allSkillsList"
              :key="skill.name + skill.icon"
              class="flex items-center gap-1 px-2.5 py-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full text-zinc-600 text-xs hover:text-zinc-300 hover:border-zinc-600 transition-all duration-200 cursor-default"
            >
              <Icon :icon="skill.icon" class="w-3 h-3" />
              {{ skill.name }}
            </span>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import * as THREE from 'three'
import { useLang } from '../../../app/composables/useLang'

const { skills, t } = useLang()

const canvasRef = ref<HTMLCanvasElement>()
const animated = ref(false)
const activeTab = ref(0)
const hoveredSkill = ref<any>(null)

const allSkillsList = computed(() =>
  skills.value.flatMap(c => c.items).filter((s, i, arr) =>
    arr.findIndex(x => x.name === s.name) === i
  )
)

watch(() => skills.value, () => {
  activeTab.value = 0
})

function switchTab(i: number) {
  activeTab.value = i
  animated.value = false
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animated.value = true
    })
  })
}

let renderer: THREE.WebGLRenderer
let animationId: number
let sphereMesh: THREE.Mesh
let pointsGroup: THREE.Group
let raycaster: THREE.Raycaster
let mouse: THREE.Vector2
const spriteMap = new Map<THREE.Sprite, any>()

async function initSphere() {
  const canvas = canvasRef.value!
  const w = canvas.clientWidth
  const h = canvas.clientHeight

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
  camera.position.z = 3.5

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Inner dark sphere
  scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x1a0800, transparent: true, opacity: 0.6 })
  ))

  // Particle cloud shell
  const particleCount = 700
  const particlePositions: number[] = []
  for (let i = 0; i < particleCount; i++) {
    const phi   = Math.acos(-1 + (2 * i) / particleCount)
    const theta = Math.sqrt(particleCount * Math.PI) * phi
    const r     = 1.15 + (Math.random() - 0.5) * 0.18
    particlePositions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    )
  }
  const particleGeo = new THREE.BufferGeometry()
  particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3))
  sphereMesh = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({ color: 0xff5500, size: 0.016, transparent: true, opacity: 0.85 })
  ) as unknown as THREE.Mesh
  scene.add(sphereMesh)

  // Place skill icons
  const allSkills = skills.value.flatMap(c => c.items.map(i => ({ ...i })))
  pointsGroup = new THREE.Group()

  await Promise.all(allSkills.map(async (skill, i) => {
    const phi = Math.acos(-1 + (2 * i) / allSkills.length)
    const theta = Math.sqrt(allSkills.length * Math.PI) * phi
    const r = 1.35

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)

    const sprite = await makeIconSprite(skill.name, skill.color, skill.icon)
    sprite.position.set(x, y, z)
    sprite.userData = { skill, origScale: sprite.scale.clone() }
    spriteMap.set(sprite, skill)
    pointsGroup.add(sprite)
  }))

  scene.add(pointsGroup)

  // Raycasting setup
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // Mouse interaction
  let isDragging = false
  let prev = { x: 0, y: 0 }

  const onMove = (dx: number, dy: number) => {
    sphereMesh.rotation.y += dx * 0.005
    sphereMesh.rotation.x += dy * 0.005
    pointsGroup.rotation.y += dx * 0.005
    pointsGroup.rotation.x += dy * 0.005
  }

  // Hover detection
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) return

    const rect = canvas.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / w) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / h) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(pointsGroup.children)

    hoveredSkill.value = null
    
    // Reset all sprites
    spriteMap.forEach(( sprite) => {
      sprite.scale.copy(sprite.userData.origScale)
      ;(sprite.material as THREE.SpriteMaterial).opacity = 0.9
    })

    if (intersects.length > 0) {
      const hoveredSprite = intersects[0].object as THREE.Sprite
      hoveredSkill.value = spriteMap.get(hoveredSprite)
      
      // Highlight hovered sprite
      hoveredSprite.scale.multiplyScalar(1.4)
      ;(hoveredSprite.material as THREE.SpriteMaterial).opacity = 1
    }
  })

  canvas.addEventListener('mouseleave', () => {
    hoveredSkill.value = null
    spriteMap.forEach((_, sprite) => {
      sprite.scale.copy(sprite.userData.origScale)
      ;(sprite.material as THREE.SpriteMaterial).opacity = 0.9
    })
  })

  canvas.addEventListener('mousedown', e => { isDragging = true; prev = { x: e.clientX, y: e.clientY } })
  canvas.addEventListener('touchstart', e => { isDragging = true; prev = { x: e.touches[0].clientX, y: e.touches[0].clientY } })
  window.addEventListener('mouseup', () => isDragging = false)
  window.addEventListener('touchend', () => isDragging = false)
  
  canvas.addEventListener('mousemove', e => {
    if (!isDragging) return
    onMove(e.clientX - prev.x, e.clientY - prev.y)
    prev = { x: e.clientX, y: e.clientY }
  })
  
  canvas.addEventListener('touchmove', e => {
    if (!isDragging) return
    onMove(e.touches[0].clientX - prev.x, e.touches[0].clientY - prev.y)
    prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  })

  function animate() {
    animationId = requestAnimationFrame(animate)
    if (!isDragging) {
      sphereMesh.rotation.y += 0.002
      pointsGroup.rotation.y += 0.002
    }
    renderer.render(scene, camera)
  }
  animate()
}

async function makeIconSprite(name: string, color: string, iconUrl: string): Promise<THREE.Sprite> {
  const size = 80
  const cv = document.createElement('canvas')
  cv.width = size
  cv.height = size
  const ctx = cv.getContext('2d')!

  const iconSize = 56
  const iconX = (size - iconSize) / 2
  const iconY = (size - iconSize) / 2

  try {
    const img = await loadImage(
      `https://api.iconify.design/${iconUrl.replace(':', '/')}.svg?color=${encodeURIComponent(color)}&width=${iconSize}&height=${iconSize}`
    )
    ctx.drawImage(img, iconX, iconY, iconSize, iconSize)
  } catch {
    ctx.font = `bold 28px Arial`
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(name[0], size / 2, size / 2)
  }

  const texture = new THREE.CanvasTexture(cv)
  const mat = new THREE.SpriteMaterial({ 
    map: texture, 
    transparent: true, 
    depthWrite: false,
    opacity: 0.9
  })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(0.3, 0.3, 1)
  return sprite
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function handleScroll() {
  const el = document.getElementById('skills')
  if (!el) return
  if (el.getBoundingClientRect().top < window.innerHeight * 0.75) {
    animated.value = true
    window.removeEventListener('scroll', handleScroll)
  }
}

onMounted(() => {
  initSphere()
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in.fade-in {
  animation: fadeIn 0.2s ease-out;
}
</style>