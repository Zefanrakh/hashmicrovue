<template>
  <div class="slider-container" ref="sliderContainer">
    <div class="swiper-wrapper" ref="sliderTrack">
      <div v-for="(image, imgIndex) in images" :key="`${itemId}-${imgIndex}`" class="swiper-slide">
        <img :src="image" alt="Product Image" class="slider-overflow-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
/*------------------- PROPS -------------------*/
defineProps({
  images: Array,
  itemId: Number,
})
</script>

<style scoped>
.swiper-wrapper {
  overflow-x: scroll;
  display: flex;
  gap: 10px;
  cursor: pointer;
}

.slider-overflow-image {
  height: 100px;
}

::-webkit-scrollbar {
  height: 10px;
}
</style>
