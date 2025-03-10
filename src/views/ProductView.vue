<template>
  <div class="product">
    <h1>Our Products</h1>
    <CustomButton :loading="productStore.isLoading" variant="primary" @click="openModal"
      >Create New</CustomButton
    >

    <CardListSkeletonLoader v-if="productStore.isLoading && productStore.items.length === 0" />
    <CardList v-else :items="productStore.items" />

    <div v-if="productStore.items.length > 0" class="load-more-container">
      <CustomButton v-if="!productStore.isLoading" variant="secondary" @click="loadMore"
        >Load More</CustomButton
      >
      <CardListSkeletonLoader v-else />
    </div>
  </div>

  <FloatingButton @click="openModal">+</FloatingButton>

  <Modal :open="isModalOpen" @close="closeModal">
    <ProductForm ref="CreateProductForm" @submit="addItem" />
  </Modal>
</template>

<script setup>
import Layout from '../components/layouts/Layout.vue'
import CustomButton from '../components/Button.vue'
import FloatingButton from '../components/FloatingButton.vue'
import Modal from '../components/Modal.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import CardList from '@/components/CardList.vue'
import CardListSkeletonLoader from '@/components/CardListSkeletonLoader.vue'
import { useProductStore } from '../stores/productStore'
import ProductForm from '@/components/ProductForm.vue'

/*------------------- STATE -------------------*/
const productStore = useProductStore()

/*------------------- DATA -------------------*/
const isModalOpen = ref(false)
const CreateProductForm = ref(null)

/*------------------- FUNCTION -------------------*/
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  CreateProductForm.value.clearForm()
}

const addItem = async (newItem) => {
  await productStore.addItem(newItem)
  closeModal()
}

const loadMore = async () => {
  await productStore.loadMore()
}

const handleScroll = async () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    !productStore.isLoading
  ) {
    await loadMore()
  }
}

/*------------------- LIFE CYCLE HOOKS -------------------*/
onMounted(() => {
  productStore.fetchItems(true)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.product {
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.load-more-container {
  margin-top: 20px;
}
</style>
