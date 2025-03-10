<template>
  <CustomButton variant="secondary" @click="toggleModal">Edit</CustomButton>
  <Modal :open="isModalOpen" @close="toggleModal">
    <ProductForm
      :key="`edit-${item.id}-${item.images?.length}`"
      :item="item"
      @submit="updateItem"
    />
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import CustomButton from './Button.vue'
import Modal from './Modal.vue'
import { useProductStore } from '@/stores/productStore'
import ProductForm from './ProductForm.vue'

/*------------------- STATE -------------------*/
const productStore = useProductStore()

/*------------------- PROPS -------------------*/
const props = defineProps({
  item: Object,
})

/*------------------- DATA -------------------*/
const isModalOpen = ref(false)

/*------------------- FUNCTION -------------------*/
const toggleModal = () => (isModalOpen.value = !isModalOpen.value)
const closeModal = () => {
  isModalOpen.value = false
}
const updateItem = async (item) => {
  await productStore.updateItem(item.id, item)
  closeModal()
}
</script>
