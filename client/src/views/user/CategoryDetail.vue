<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">{{ category?.category_name }}</h1>
      <p class="mb-4">{{ category?.description }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="border border-gray-300 rounded-lg p-4 shadow-md"
        >
          <img :src="product.image[0]" :alt="product.product_name" class="w-full h-72 object-cover rounded" />
          <h2 class="font-bold mt-2">{{ product.product_name }}</h2>
          <p>{{ product.description }}</p>
          <p class="font-semibold">{{ product.unit_price }} VND</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  const store = useStore();
  const route = useRoute();
  const products = ref([]);
  const category = ref({});
  
  // Fetch category and products when component is mounted
  onMounted(async () => {
    const categoryId = route.params.id;
    // Fetch the category by ID (implement this in your store or API)
    category.value = await store.dispatch("fetchCategoryById", categoryId);
    
    // Fetch products by category ID (implement this in your store or API)
    products.value = await store.dispatch("fetchProductsByCategoryId", categoryId);
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  