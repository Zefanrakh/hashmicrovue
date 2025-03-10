<template>
  <table class="product-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>
          <EditButton :item="item" />
          <DeleteButton :item="item" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import DeleteButton from './DeleteButton.vue'
import EditButton from './EditButton.vue'

/*------------------- PROPS -------------------*/
defineProps({
  items: Array,
})
</script>

<style scoped>
.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.product-table th {
  background-color: #1e2a38;
  color: white;
}
</style>
