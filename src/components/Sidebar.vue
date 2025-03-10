<template>
  <div :class="{ 'sidebar-overlay': isMobile, collapsed: !isOpen }" @click="toggle">
    <div
      class="sidebar"
      :class="{ collapsed: !isOpen, overlay: isMobile }"
      @click.prevent="
        (e) => {
          e.stopPropagation()
        }
      "
    >
      <button v-if="isMobile" class="burger-menu" @click="toggle">☰</button>
      <ul class="nav-links">
        <li><router-link to="/" @click="toggle">Home</router-link></li>
        <li><router-link to="/product" @click="toggle">Product</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

/*------------------- PROPS -------------------*/
defineProps({
  isOpen: Boolean,
})

/*------------------- EMIT -------------------*/
const emit = defineEmits(['toggle'])

/*------------------- DATA -------------------*/
const isMobile = ref(window.innerWidth <= 768)

/*------------------- FUNCTION -------------------*/
const updateWindowSize = () => {
  isMobile.value = window.innerWidth <= 768
}

const handleToggle = (forcedState) => {
  emit('toggle', forcedState)
}

const toggle = (e) => {
  e.stopPropagation()
  handleToggle()
}

/*------------------- WATCHER -------------------*/
watch(isMobile, (newValue, oldValue) => {
  if (newValue) {
    handleToggle(false)
  }
})

/*------------------- LIFE CYCLE HOOKS -------------------*/
onMounted(() => {
  window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize)
})
</script>

<style scoped>
.sidebar-overlay {
  width: 100vw;
  bottom: 0;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 1;
}

.sidebar-overlay.collapsed {
  right: 100%;
}

.sidebar {
  width: 250px;
  background-color: #1e2a38;
  color: white;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
}

.sidebar.overlay {
  position: fixed !important;
}

.sidebar.overlay.collapsed {
  transform: translateX(-100%);
}

.burger-menu {
  position: absolute;
  top: 15px;
  right: -50px;
  background: #f57c00;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
}

.nav-links {
  position: fixed;
  list-style: none;
  padding: 0;
}

.nav-links li {
  margin: 20px 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  border-radius: 3px;
}

.nav-links a:hover {
  color: #f57c00;
}

@media (max-width: 768px) {
  .sidebar.overlay {
    background: rgba(30, 42, 56, 0.9);
  }
}
</style>
