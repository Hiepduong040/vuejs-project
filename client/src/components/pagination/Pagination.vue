<template>
  <div>
    <select v-model="pageSize" @change="updatePageSize">
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="7">7</option>
    </select>
    <button @click="prevPage" :disabled="currentPage === 1">Trang trước</button>
    <span>Trang {{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Trang sau
    </button>
  </div>
</template>

<script setup>
import { ref } from 'firebase/storage';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

// Pagination logic
const currentPage = computed(() => store.state.product.currentPage);
const pageSize = ref(store.state.product.pageSize);
const totalPages = computed(() => store.getters.totalPages);

const updatePageSize = () => {
  store.dispatch("setPageSize", pageSize.value);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    store.dispatch("setCurrentPage", currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    store.dispatch("setCurrentPage", currentPage.value + 1);
  }
};
</script>

<style>
</style>