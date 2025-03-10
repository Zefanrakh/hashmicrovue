<template>
  <div class="card">
    <div class="card-main">
      <ImagesSliderWithModal
        :images="item.images?.length ? item.images : [noImage]"
        :item-id="item.id"
      />
      <div class="card-body">
        <h3 class="card-title">{{ item.name }}</h3>
        <p class="card-price">Rp {{ item.price.toLocaleString() }}</p>
        <p class="card-description">
          {{ truncatedDescription }}
          <span v-if="isTruncated" class="see-more" @click="toggleExpand">See More</span>
        </p>
      </div>
    </div>
    <div class="card-footer">
      <EditButton :item="item" />
      <DeleteButton :item="item" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import DeleteButton from './DeleteButton.vue'
import EditButton from './EditButton.vue'
import noImage from '@/assets/no_image_available.svg'
import ImagesSliderWithModal from './ImagesSliderWithModal.vue'

/*------------------- PROPS -------------------*/
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

/*------------------- DATA -------------------*/
const isExpanded = ref(false)

/*------------------- COMPUTED -------------------*/
const truncatedDescription = computed(() => {
  return isExpanded.value || props.item.description.length <= 100
    ? props.item.description
    : props.item.description.slice(0, 100) + '...'
})
const isTruncated = computed(() => props.item.description.length > 100 && !isExpanded.value)

/*------------------- FUNCTION -------------------*/

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0px;
  width: 250px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  font-size: 14px;
  font-weight: bold;
  color: #1e2a38;
}

.card-body {
  text-align: center;
  margin: 10px 0;
  padding: 15px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-price {
  font-size: 16px;
  color: var(--primary-color);
  font-weight: bold;
}

.card-description {
  font-size: 14px;
  color: #555;
  text-align: left;
}

.see-more {
  color: var(--primary-color);
  cursor: pointer;
  font-weight: bold;
}

.card-footer {
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 15px;
}
</style>
