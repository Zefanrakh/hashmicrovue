<template>
  <ImagesSliderOverflow
    v-if="simpleOverflow"
    @click="onSliderClick"
    :images="images"
    :item-id="itemId"
  />
  <ImagesSlider
    v-else
    ref="ImagesSliderRef"
    @click="onSliderClick"
    :images="images"
    :item-id="itemId"
  />
  <Modal :open="isModalOpen" @close="toggleModal">
    <ImagesSlider
      container-height="max-content"
      ref="ImagesSliderRef"
      :images="images"
      :item-id="itemId"
    />
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import ImagesSlider from './ImagesSlider.vue'
import Modal from './Modal.vue'
import ImagesSliderOverflow from './ImagesSliderOverflow.vue'

const isModalOpen = ref(false)

const ImagesSliderRef = ref(null)

const props = defineProps({
  images: Array,
  itemId: Number,
  simpleOverflow: Boolean,
})

const toggleModal = () => (isModalOpen.value = !isModalOpen.value)

const onSliderClick = () => {
  const sliderSwipeDuration = ImagesSliderRef.value.swipeDuration
  if (sliderSwipeDuration < 200) {
    toggleModal()
  }
}
</script>
