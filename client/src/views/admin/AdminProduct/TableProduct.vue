<template>
  <section class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>
    <table class="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">STT</th>
          <th class="border p-2">Tên sản phẩm</th>
          <th class="border p-2">Hình ảnh</th>
          <th class="border p-2">Mô tả</th>
          <th class="border p-2">Giá</th>
          <th class="border p-2">Số lượng</th>
          <th class="border p-2">Danh mục</th>
          <th class="border p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in products" :key="product.id" class="hover:bg-gray-100">
          <td class="border p-2">{{ index + 1 }}</td>
          <td class="border p-2">{{ product.product_name }}</td>
          <td class="border p-2">
            <img :src="product.image[0]" alt="" class="w-20 h-20 object-cover">
          </td>
          <td class="border p-2">{{ product.description }}</td>
          <td class="border p-2">{{ product.unit_price }}</td>
          <td class="border p-2">{{ product.stock_quantity }}</td>
          <td class="border p-2">{{ findNameCategory(product.categoryId) }}</td>
          <td class="border p-2 ">
            <button @click="openEditModal(product)" class="text-blue-500 m-2 hover:underline">Sửa</button>
            <button @click="deleteProduct(product.id)" class="text-red-500 hover:underline">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  
    <div class="flex justify-between items-center mt-4">
      <Pagination/>
    </div>
  
     
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Sửa sản phẩm</h2>
        <form @submit.prevent="handleUpdate">
          <input v-model="editedProduct.product_name" type="text" placeholder="Tên sản phẩm" class="w-full p-2 border" />
          <textarea v-model="editedProduct.description" placeholder="Mô tả" class="w-full p-2 border"></textarea>
          <select v-model="editedProduct.categoryId" class="w-full p-2 border">
            <option disabled value="">Chọn danh mục</option>
            <option
              v-for="category in categoriesList"
              :key="category.id"
              :value="category.id"
            >
              {{ category.category_name }}
            </option>
          </select>

          <input v-model="editedProduct.unit_price" type="text" placeholder="Giá" class="w-full p-2 border" />
          <input v-model="editedProduct.stock_quantity" type="text" placeholder="Số lượng" class="w-full p-2 border" />
          <ImageInputProduct :image="editedProduct.image" @handleImange="handleImage"></ImageInputProduct>
          <div class="mt-4 flex justify-end">
            <button type="button" @click="closeEditModal" class="px-4 py-2 bg-gray-300 rounded">Hủy</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { getAllCategories } from "../../../api/categoryAPI";  
import Pagination from '@/components/pagination/Pagination.vue';
import ImageInputProduct from '@/components/inputImage/ImageInputProduct.vue';
import Swal from 'sweetalert2';
const store = useStore();
const products = computed(() => store.getters.getProducts);
console.log("product",products);

const isEditModalOpen = ref(false);
const editedProduct = ref({
  product_name: "",
  description: "",
  unit_price: "",
  stock_quantity: "",
  image: [],
  categoryId: "" // 
});
const categoriesIdList = ref([])
const openEditModal = (product) => {
  editedProduct.value = { ...product };
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  editedProduct.value = {};
  store.dispatch('fetchProducts');
};
const validateProduct = () => {
  const errors = {};
  
  // Check if the product name is empty
  if (!editedProduct.value.product_name) {
    errors.product_name = "Tên sản phẩm không được bỏ trống.";
  }
  
  // Check if the description is empty
  if (!editedProduct.value.description) {
    errors.description = "Mô tả không được bỏ trống.";
  }
  
  // Check if the category ID is selected
  if (!editedProduct.value.categoryId) {
    errors.categoryId = "Vui lòng chọn danh mục.";
  }
  
  // Check if the unit price is valid (greater than 0)
  if (!editedProduct.value.unit_price || isNaN(editedProduct.value.unit_price) || editedProduct.value.unit_price <= 0) {
    errors.unit_price = "Giá phải lớn hơn 0.";
  }
  
  // Check if the stock quantity is valid (greater than or equal to 0)
  if (!editedProduct.value.stock_quantity || isNaN(editedProduct.value.stock_quantity) || editedProduct.value.stock_quantity < 0) {
    errors.stock_quantity = "Số lượng phải lớn hơn hoặc bằng 0.";
  }

  return Object.keys(errors).length === 0 ? true : errors;
};

const deleteProduct =  (productId) => {

  Swal.fire({
    title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then( (result) => {
    if (result.isConfirmed) {
      store.dispatch('deleteProduct', productId);
      store.dispatch('fetchProducts');
      Swal.fire("Đã xóa!", "Sản phẩm đã được xóa.", "success");
    }
  });
 
};

const handleUpdate = async () => {
  const validation = validateProduct();
  
  if (validation === true) {
    await store.dispatch('updateProduct', editedProduct.value);
    closeEditModal();
  } else {
    // Display errors using Swal
    Object.values(validation).forEach(error => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: error,
      });
    });
  }
};


const categoriesList = reactive([]);

const fetchCategories = async () => {
    const response = await getAllCategories();
    categoriesList.push(...response.data);
};

const findNameCategory = (categoryId) => {
  const findCategory = categoriesList.find(cat => cat.id == categoryId);
  return findCategory ? findCategory.category_name : "Không xác định";
};

const getNameCategories = async ()=>{
  const response = await getAllCategories();
  categoriesIdList.value = response.data 
}

const handleImage=(link)=>{
    editedProduct.value.image=link;
  }
onMounted(async () => {
  store.dispatch('fetchProducts');
  await getNameCategories();
  await fetchCategories();
});
</script>

<style scoped>
/* Style cho component này */
</style>
