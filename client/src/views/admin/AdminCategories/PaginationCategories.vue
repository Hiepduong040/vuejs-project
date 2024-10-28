
<template>
  <div>
    <select v-model="pageSizeCategories" @change="updatePageSizeCategories">
      <option v-for="size in [3, 5, 7]" :key="size" :value="size">{{ size }}</option>
    </select>
    <button @click="prevPage" :disabled="currentPageCategories === 1">Trang trước</button>
    <span>Trang {{ currentPageCategories }} / {{ totalPagesCategories }}</span>
    <button @click="nextPage" :disabled="currentPageCategories === totalPagesCategories">Trang sau</button>
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
