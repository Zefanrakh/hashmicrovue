<template>
  <div class="skeleton-card" v-for="index in productStore.limit" :key="index"></div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore'

/*------------------- STATE -------------------*/
const productStore = useProductStore()
</script>

<style scoped>
.skeleton-card {
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  border-radius: 8px;
  width: 250px;
  height: 100px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}
</style>
