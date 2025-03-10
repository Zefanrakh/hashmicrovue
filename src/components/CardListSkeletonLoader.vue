<template>
  <div class="skeleton-card-list">
    <SkeletonCard />
  </div>
</template>

<script setup>
import SkeletonCard from './SkeletonCard.vue'
</script>

<style scoped>
.skeleton-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}
</style>
