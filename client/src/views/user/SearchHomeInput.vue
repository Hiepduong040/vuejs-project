<!-- SearchHomeInput.vue -->
<template>
    <div class="flex items-center">
      <!-- Search Icon Button -->
      <button @click="toggleSearch" class="text-gray-600 hover:text-gray-800">
        <i class="bx bx-search"></i>
      </button>
      
      <!-- Centered Search Input -->
      <div>
        <input
        v-if="showSearch"
        type="search"
        placeholder="Search"
        class="search-input h-9 mt-2 w-96 border absolute top-1 left-1/2   rounded px-4 py-1 shadow-md"
        @blur="hideSearch"
      />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showSearch = ref(false);
  
  function toggleSearch() {
    showSearch.value = !showSearch.value;
  }
  
  function hideSearch() {
    showSearch.value = false;
  }
  </script>
  
  <style scoped>
  .search-input {
    transform: translateX(-50%);
  }
  </style>
  