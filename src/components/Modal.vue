<template>
  <Teleport to="body">
    <div
      class="modal-overlay"
      :class="{ open: overlayIsOpen, close: !overlayIsOpen }"
      @click.self="close"
    >
      <div class="modal-content" :class="{ open: open, close: !open }">
        <slot></slot>
        <button class="close-btn" @click="close">&times;</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

/*------------------- PROPS -------------------*/
const props = defineProps({
  open: Boolean,
})

/*------------------- EMITS -------------------*/
const emit = defineEmits(['close'])

/*------------------- DATA -------------------*/
const overlayIsOpen = ref(false)
const modalAnimationTime = ref(0.2)

/*------------------- FUNCTION -------------------*/
const close = () => {
  emit('close')
}

/*------------------- WATCHER -------------------*/
watch(
  () => props.open,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        overlayIsOpen.value = newVal
      }, modalAnimationTime.value * 1000)
    } else {
      overlayIsOpen.value = newVal
    }
  },
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0s ease-in-out;
}

.modal-content {
  background: white;
  padding: 0px;
  border-radius: 8px;
  width: 100%;
  margin: 0 15px;
  max-width: 400px;
  position: relative;
  transform: scaleY(0) scaleX(0);
  opacity: 1;
  overflow: hidden;
  transition:
    all v-bind(modalAnimationTime + 's') linear,
    opacity v-bind(modalAnimationTime + 's') ease-in-out;
}

.modal-content.open {
  transform: scaleY(1) scaleX(1);
  padding: 20px;
  opacity: 1;
}

.modal-overlay.open {
  width: 100%;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
