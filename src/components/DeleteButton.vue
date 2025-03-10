<template>
  <div>
    <CustomButton variant="secondary" @click="toggleModal">Delete</CustomButton>

    <Modal :open="isModalOpen" @close="toggleModal">
      <h3>Are you sure you want to delete this item?</h3>
      <p>{{ item.name }}</p>
      <div class="modal-actions">
        <CustomButton variant="secondary" @click="toggleModal">Cancel</CustomButton>
        <CustomButton variant="primary" @click="deleteItem">Yes, Delete</CustomButton>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import CustomButton from './Button.vue'
import { useProductStore } from '@/stores/productStore'
import Modal from './Modal.vue'
import { ref } from 'vue'

/*------------------- PROPS -------------------*/
const props = defineProps({
  item: Object,
})

/*------------------- DATA -------------------*/
const isModalOpen = ref(false)

/*------------------- STATE -------------------*/
const productStore = useProductStore()

/*------------------- FUNCTION -------------------*/
const toggleModal = () => (isModalOpen.value = !isModalOpen.value)
const deleteItem = async () => {
  await productStore.deleteItem(props.item.id)
  toggleModal()
}
</script>

<style scoped>
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}
</style>
