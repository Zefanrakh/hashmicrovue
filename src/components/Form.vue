<template>
  <form @submit.prevent="submit">
    <slot></slot>
  </form>
</template>

<script setup>
/*------------------- EMITS -------------------*/
const emit = defineEmits(['submit'])

/*------------------- FUNCTION -------------------*/
const submit = (payload) => {
  emit('submit', payload)
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
