<template>
  <div class="flex items-center  space-x-4 py-4">
    <select v-model="pageSizeCategories" @change="updatePageSizeCategories" class="border rounded-md p-2">
      <option v-for="size in [3, 5, 7]" :key="size" :value="size">{{ size }}</option>
    </select>
    <button
      @click="prevPage"
      :disabled="currentPageCategories === 1"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
    >
      Trang trước
    </button>
    <span class="text-sm font-medium text-gray-700">
      Trang {{ currentPageCategories }} / {{ totalPagesCategories }}
    </span>
    <button
      @click="nextPage"
      :disabled="currentPageCategories === totalPagesCategories"
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

const currentPageCategories = computed(() => store.state.category.currentPageCategories);
const pageSizeCategories = computed({
  get: () => store.state.category.pageSizeCategories,
  set: (value) => store.dispatch("setPageSizeCategories", value),
});

const totalPagesCategories = computed(() => {
  return Math.ceil(store.state.category.filteredCategories.length / pageSizeCategories.value);
});

const prevPage = () => {
  if (currentPageCategories.value > 1) {
    store.dispatch("setCurrentPageCategories", currentPageCategories.value - 1);
  }
};

const nextPage = () => {
  if (currentPageCategories.value < totalPagesCategories.value) {
    store.dispatch("setCurrentPageCategories", currentPageCategories.value + 1);
  }
};
</script>

<style>
</style>
