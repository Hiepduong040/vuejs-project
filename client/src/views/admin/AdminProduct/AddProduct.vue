<template>
  <div>
    <button
      @click="showModal = true"
      class="ml-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
    >
      Thêm sản phẩm
    </button>
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Thêm sản phẩm</h2>
        <form class="m-1" @submit.prevent="handleSubmit">
          <input
            v-model="product.product_name"
            type="text"
            placeholder="Tên sản phẩm"
            class="w-full p-2 border"
          />
          <span v-if="errors.product_name" class="text-red-500 text-sm">{{
            errors.product_name
          }}</span>

          <textarea
            v-model="product.description"
            placeholder="Mô tả"
            class="w-full p-2 border"
          ></textarea>
          <span v-if="errors.description" class="text-red-500 text-sm">{{
            errors.description
          }}</span>

          <select v-model="product.categoryId" class="w-full p-2 border">
            <option disabled value="">Chọn danh mục</option>
            <option
              v-for="category in categoriesList"
              :key="category.id"
              :value="category.id"
            >
              {{ category.category_name }}
            </option>
          </select>
          <span v-if="errors.categoryId" class="text-red-500 text-sm">{{
            errors.categoryId
          }}</span>

          <input
            v-model="product.unit_price"
            type="text"
            placeholder="Giá"
            class="w-full p-2 border"
          />
          <span v-if="errors.unit_price" class="text-red-500 text-sm">{{
            errors.unit_price
          }}</span>

          <input
            v-model="product.stock_quantity"
            type="text"
            placeholder="Số lượng"
            class="w-full p-2 border"
          />
          <span v-if="errors.stock_quantity" class="text-red-500 text-sm">{{
            errors.stock_quantity
          }}</span>

          <ImageInputProduct
            :image="product.image"
            @handleImange="handleImage"
          ></ImageInputProduct>
          <span v-if="errors.image" class="text-red-500 text-sm">{{
            errors.image
          }}</span>

          <div class="mt-4 flex justify-end">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
    
    <script setup>
import ImageInputProduct from "@/components/inputImage/ImageInputProduct.vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { getAllCategories } from "../../../api/categoryAPI";
import Swal from "sweetalert2";
const store = useStore();
const categoriesList = ref([]);
const showModal = ref(false);
const errors = ref({});

const product = ref({
  product_name: "",
  description: "",
  unit_price: "",
  stock_quantity: "",
  image: [],
  categoryId: "",
});

const findNameCategories = async () => {
  const response = await getAllCategories();
  categoriesList.value = response.data; // Giả sử response.data là mảng danh mục
};

onMounted(async () => {
  await findNameCategories();
  store.dispatch("fetchProducts"); // Lấy danh sách sản phẩm khi component được khởi tạo
});

const handleImage = (link) => {
  product.value.image = link;
};

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!product.value.product_name) {
    errors.value.product_name = "Tên sản phẩm không được bỏ trống.";
    isValid = false;
  }

  if (!product.value.description) {
    errors.value.description = "Mô tả không được bỏ trống.";
    isValid = false;
  }

  if (!product.value.categoryId) {
    errors.value.categoryId = "Danh mục không được bỏ trống.";
    isValid = false;
  }

  if (!product.value.unit_price || product.value.unit_price <= 0) {
    errors.value.unit_price = "Giá phải lớn hơn 0.";
    isValid = false;
  }

  if (!product.value.stock_quantity || product.value.stock_quantity <= 0) {
    errors.value.stock_quantity = "Số lượng phải lớn hơn 0.";
    isValid = false;
  }

  if (!product.value.image.length) {
    errors.value.image = "Sản phẩm phải có tối thiểu 1 hình ảnh.";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    await store.dispatch("addProduct", product.value);
    store.dispatch("fetchProducts"); // Lấy danh sách sản phẩm
    Swal.fire({
      icon: 'success',
      title: 'Thêm sản phẩm thành công!',
      text: 'Sản phẩm mới đã được thêm vào hệ thống.',
      confirmButtonText: 'OK'
    });
    showModal.value = false; // Đóng modal sau khi thêm sản phẩm
    product.value = {
      product_name: "",
      description: "",
      unit_price: "",
      stock_quantity: "",
      image: [],
      categoryId: "",
    };
  } else {
    console.log(errors.value); 
  }
};
</script>
    
    <style scoped>
</style>
 