<template>
  <button :class="['btn', variant, { loading }]" :disabled="loading">
    <span v-if="!loading">
      <slot></slot>
    </span>
    <span v-else class="loader"></span>
  </button>
</template>

<script setup>
import { defineProps } from 'vue'
/*------------------- PROPS -------------------*/
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.btn {
  flex: 1;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.btn.primary {
  background-color: #f57c00;
  color: white;
}

.btn.primary:hover {
  background-color: #d36b00;
}

.btn.secondary {
  background-color: #d32f2f;
  color: white;
}

.btn.secondary:hover {
  background-color: #b71c1c;
}

.btn.loading {
  cursor: not-allowed;
  opacity: 0.7;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
