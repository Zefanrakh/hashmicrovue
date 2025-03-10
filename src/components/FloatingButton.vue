<template>
  <button class="floating-button" @click="$emit('click')">
    <div class="border-spinner"></div>
    <slot></slot>
  </button>
</template>

<script setup></script>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
}

.floating-button .border-spinner {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, silver 0%, white 25%, silver 50%, gray 75%, silver 100%);
  mask: radial-gradient(circle, transparent 60%, black 62%);
  -webkit-mask: radial-gradient(circle, transparent 60%, black 62%);
  transition: all 0.3s ease-in-out;
}

.floating-button:hover {
  background-color: var(--primary-hover);
}

.floating-button:hover .border-spinner {
  transform: rotate(180deg);
}

.floating-button:not(:hover) .border-spinner {
  transform: rotate(0deg);
}
</style>
