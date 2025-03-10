<template>
  <div class="card-list">
    <Card v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script setup>
import Card from './Card.vue'

/*------------------- PROPS -------------------*/
defineProps({
  items: Array,
})
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}
</style>
