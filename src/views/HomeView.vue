<template>
  <Layout>
    <div class="home">
      <h1>Welcome to HashMicro UI</h1>
      <p>This is a simple non-functional Product system UI.</p>
      <CustomButton variant="primary">Go to Our Products</CustomButton>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '../components/layouts/Layout.vue'
import CustomButton from '../components/Button.vue'
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
