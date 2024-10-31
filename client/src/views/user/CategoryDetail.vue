<!-- <template>
    <div>
      <h1 class="text-2xl font-bold mb-4">{{ category?.category_name }}</h1>
      <p class="mb-4">{{ category?.description }}</p>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
          @click="goToProduct(product)"
          class="border border-gray-300 rounded-lg p-4 shadow-md cursor-pointer"
        >
          <img :src="product.image[0]" :alt="product.product_name" class="w-full h-72 object-cover rounded" />
          <h2 class="font-bold mt-2">{{ product.product_name }}</h2>
          <p>{{ product.description }}</p>
          <p class="font-semibold">{{ product.unit_price }} VND</p>
          <button class="mt-2 bg-orange-600 rounded-full text-white py-1 px-4 hover:bg-orange-700 transition-colors duration-200">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  
  const store = useStore();
  const route = useRoute();
  const products = ref([]);
  const category = ref({});
  const router = useRouter();
  
  // Fetch category and products when component is mounted
  onMounted(async () => {
    const categoryId = route.params.categoryId;
    category.value = await store.dispatch('fetchCategoryById', categoryId);
    products.value = await store.dispatch('fetchProductsByCategoryId', categoryId);
  });
  
  const goToProduct = (product) => {
    if (product.id && product.categoryId) {
      router.push({
        name: 'product-detail',
        params: { 
          id: product.id, 
          categoryId: product.categoryId 
        },
      });
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
******************************************************* chưa đổi cấu trúc - sai   
   -->

   <template>
    <div>
      <h1 class="text-2xl font-bold mb-4">{{ category?.category_name }}</h1>
      <p class="mb-4">{{ category?.description }}</p>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
          @click="goToProduct(product.id)"  
          class="border border-gray-300 rounded-lg p-4 shadow-md cursor-pointer"
        >
          <img :src="product.image[0]" :alt="product.product_name" class="w-full h-72 object-cover rounded" />
          <h2 class="font-bold mt-2">{{ product.product_name }}</h2>
          <p>{{ product.description }}</p>
          <p class="font-semibold">{{ product.unit_price }} VND</p>
          <button class="mt-2 bg-orange-600 rounded-full text-white py-1 px-4 hover:bg-orange-700 transition-colors duration-200">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  
  const store = useStore();
  const route = useRoute();
  const products = ref([]);
  const category = ref({});
  const router = useRouter();
  
  // Fetch category and products when component is mounted
  onMounted(async () => {
    const categoryId = route.params.categoryId;
    category.value = await store.dispatch('fetchCategoryById', categoryId);
    products.value = await store.dispatch('fetchProductsByCategoryId', categoryId);
  });
  
  // Navigate to product detail
  const goToProduct = (productId) => {
    router.push({ name: 'product-detail', params: { productId: productId } });
  };
  
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
