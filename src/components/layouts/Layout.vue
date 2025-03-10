<template>
  <div class="layout">
    <Sidebar :isOpen="isSidebarOpen" @toggle="toggleSidebar" />
    <div class="main-content" :class="{ collapsed: !isSidebarOpen }">
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../Sidebar.vue'
import { ref } from 'vue'

const isSidebarOpen = ref(false)
const toggleSidebar = (forcedState) => {
  isSidebarOpen.value = typeof forcedState === 'boolean' ? forcedState : !isSidebarOpen.value
}
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  width: 100vw;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease-in-out;
  padding: 20px;
}

.collapsed {
  margin-left: 0 !important;
}
</style>
