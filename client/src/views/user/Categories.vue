  <template>
    <div class="container  mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Danh mục sản phẩm:</h1>
      <div class="relative">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="category in visibleCategories"
            :key="category.id"
            @click="goToCategory(category.id)"
            class="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              :src="category.image"
              :alt="category.category_name"
              class="w-full cursor-pointer h-72 object-cover rounded transition-transform duration-300 transform hover:scale-105"
            />
            <div class="flex flex-col items-center mt-2">
              <h2 class="font-bold cursor-pointer text-lg hover:text-blue-600 text-center">
                {{ category.category_name }}
              </h2>
              <p class="text-gray-600 mt-1 text-center">
                {{ category.description }}
              </p>
              <button class="mt-2 bg-orange-600 rounded-full text-white py-1 px-4 hover:bg-orange-700 transition-colors duration-200">
                Xem thêm
              </button>
            </div>
          </div>
        </div>
  
        <button @click="prevCategories" :disabled="!canShowPrev" class="absolute left-0 top-1/2 mx-2 px-3 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:scale-105">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
  
        <button @click="nextCategories" :disabled="!canShowNext" class="absolute right-0 top-1/2 mx-2 px-3 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:scale-105">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex'; // Import Vuex
  import queryString from 'query-string';
  import { useRouter } from 'vue-router';
  
  const store = useStore(); // Use the store
  const categories = ref([]);
  const currentIndex = ref(0);
  const itemsPerPage = 4; // Number of items to display at a time
  const router = useRouter();
  
  onMounted(() => {
    store.dispatch('fetchAllCategories', queryString.stringify({})); // Fetch categories
  });
  
  // Computed properties
  const visibleCategories = computed(() => {
    return categories.value.slice(currentIndex.value, currentIndex.value + itemsPerPage);
  });
  
  const canShowNext = computed(() => currentIndex.value + itemsPerPage < categories.value.length);
  const canShowPrev = computed(() => currentIndex.value > 0);
  
  const nextCategories = () => {
    if (canShowNext.value) currentIndex.value += 1; 
  };
  
  const prevCategories = () => {
    if (canShowPrev.value) currentIndex.value -= 1;  
  };
  
  const goToCategory = (categoryId) => {
    router.push({ name: 'category-detail', params: { categoryId: categoryId } });  
  };
  
   
  store.subscribe((mutation) => {
    if (mutation.type === 'setCategoriesMutations') {
      categories.value = mutation.payload;  
    }
  });
  </script>
  
  <style scoped>
  .border {
    transition: border-color 0.3s ease;
  }
  
  .border:hover {
    border-color: #60a5fa;  
  }
  
  button {
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  button:hover {
    transform: scale(1.05);  
  }
  </style>
  