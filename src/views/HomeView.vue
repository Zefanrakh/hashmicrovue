<template>
  <div class="home">
    <h1>Welcome to HashMicro UI</h1>
    <p>This is a simple non-functional Product system UI.</p>
    <CustomButton variant="primary" @click="goToProducts">Go to Our Products</CustomButton>
  </div>
</template>

<script setup>
import CustomButton from '../components/Button.vue'
import { useRouter } from 'vue-router'

/*------------------- ROUTER -------------------*/
const router = useRouter()

/*------------------- FUNCTION -------------------*/
const goToProducts = () => {
  router.push('/product')
}
</script>

<style scoped>
.home {
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
}
</style>
