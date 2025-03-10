<template>
  <Form @submit="submitForm">
    <h2>{{ isEdit ? 'Edit Item' : 'Create New Item' }}</h2>

    <Input label="Name" type="text" v-model="formData.name" />
    <Input label="Price" type="number" v-model="formData.price" />
    <Input label="Description" type="textarea" v-model="formData.description" />

    <div class="image-upload">
      <div class="upload-container">
        <label class="upload-label">
          <input type="file" multiple @change="handleImageUpload" hidden />
          <span>+ Add Images</span>
        </label>
      </div>

      <div class="image-preview">
        <div v-for="(image, index) in formData.images" :key="index" class="image-item">
          <img
            @click="() => previewImageModalToggle(image)"
            :src="image"
            alt="Uploaded Image"
            class="preview"
          />
          <button type="button" class="delete-btn" @click="removeImage(index)">×</button>
        </div>
      </div>
    </div>

    <CustomButton :loading="productStore.isLoading" variant="primary">
      {{ isEdit ? 'Update' : 'Save' }}
    </CustomButton>

    <Modal :open="isModalOpen" @close="previewImageModalToggle">
      <img :src="selectedImage" alt="Uploaded Image" class="modal-preview-image" />
    </Modal>
  </Form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'
import Input from './Input.vue'
import CustomButton from './Button.vue'
import Form from './Form.vue'
import Modal from './Modal.vue'

/*------------------- STATE -------------------*/
const productStore = useProductStore()

/*------------------- PROPS -------------------*/
const props = defineProps({
  item: {
    type: Object,
    default: () => ({ name: '', price: 0, images: [] }),
  },
})

/*------------------- EMITS -------------------*/
const emit = defineEmits(['submit'])

/*------------------- DATA -------------------*/
const formData = ref({ ...props.item, images: [...props.item.images] })
const isEdit = ref(!!props.item?.name)
const isModalOpen = ref(false)
const selectedImage = ref(null)

/*------------------- FUNCTION -------------------*/
const clearForm = () => {
  formData.value = { name: '', price: 0, images: [] }
}

const previewImageModalToggle = (image) => {
  isModalOpen.value = !isModalOpen.value
  selectedImage.value = image
}

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  formData.value.images = [
    ...formData.value.images,
    ...files.map((file) => URL.createObjectURL(file)),
  ]
}

const removeImage = (index) => {
  formData.value.images.splice(index, 1)
}

const submitForm = () => {
  emit('submit', formData.value)
}

/*------------------- WATCHER -------------------*/
watch(
  () => props.item,
  (newItem) => {
    formData.value = { ...newItem }
  },
  { deep: true },
)

defineExpose({
  clearForm,
})
</script>

<style scoped>
.image-upload {
  margin: 10px 0;
}

.upload-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.upload-label {
  background: var(--primary-color);
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
  transition: 0.3s ease-in-out;
}

.upload-label:hover {
  background: var(--primary-hover);
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-item {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.delete-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background: rgba(255, 0, 0, 1);
}

.modal-preview-image {
  width: 100%;
}
</style>
