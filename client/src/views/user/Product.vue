   <template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Danh sách sản phẩm:</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="product in allProducts"
          :key="product.product_id"
          @click="goToProduct(product.id)"  

          class="border border-gray-300 rounded-lg p-4 shadow-md"
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
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute , useRouter } from 'vue-router';
  const router = useRouter();
  const goToProduct = (productId) => {
   router.push({ name: 'product-detail', params: { productId: productId } });
 };
  const store = useStore();
  const allProducts = computed(() => store.state.product.allProducts);
  console.log(111122,store);
  
  // Fetch all allProducts when component is mounted
  onMounted(() => {
    store.dispatch('fetchAllProducts'); // Lấy tất cả sản phẩm
  });
  </script>
  