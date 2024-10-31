<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Danh sách sản phẩm:</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="product in paginatedProducts"
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

    <div class="flex justify-between items-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="bg-blue-500 rounded-full px-4 py-2">
        Trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-blue-500 rounded-full px-4 py-2">
        Tiếp theo
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const allProducts = computed(() => store.state.product.allProducts);

// Trạng thái phân trang
const currentPage = ref(1);
const itemsPerPage = 8; // 2 hàng, mỗi hàng 4 sản phẩm
const totalPages = computed(() => Math.ceil(allProducts.value.length / itemsPerPage));

// Tính toán sản phẩm hiển thị trên trang hiện tại
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return allProducts.value.slice(start, start + itemsPerPage);
});

// Chuyển đến trang sản phẩm
const goToProduct = (productId) => {
  router.push({ name: 'product-detail', params: { productId } });
};

// Chức năng chuyển trang
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Fetch allProducts when component is mounted
onMounted(() => {
  store.dispatch('fetchAllProducts'); // Lấy tất cả sản phẩm
});
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh nếu cần */
</style>
