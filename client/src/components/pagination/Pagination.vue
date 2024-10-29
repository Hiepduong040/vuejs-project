<!-- <template>
  <div>
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
</style> -->

<template>
  <div class="flex items-center justify-center space-x-4 py-4">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
    >
      Trang trước
    </button>
    <span class="text-sm font-medium text-gray-700">
      Trang {{ currentPage }} / {{ totalPages }}
    </span>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
    >
      Trang sau
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Pagination logic
const currentPage = computed(() => store.state.product.currentPage);
const totalPages = computed(() => store.getters.totalPages);

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
/* You can add any additional custom styles here if needed */
</style>
