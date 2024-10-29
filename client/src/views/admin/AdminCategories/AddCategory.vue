<template>
  <div>
    <button
      @click="showModal = true"
      class="ml-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
    >
      Thêm mới
    </button>
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">
          {{ isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục" }}
        </h2>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <input
              v-model="category.category_name"
              type="text"
              placeholder="Tên danh mục"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <span v-if="errors.category_name" class="text-red-500 text-sm">{{ errors.category_name }}</span>
            <textarea
              v-model="category.description"
              placeholder="Mô tả"
              class="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
            <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
            <div>Hình ảnh danh mục</div>
            <ImageInput :image="category.image" @handleImange="handleImage"></ImageInput>
            <span v-if="errors.image" class="text-red-500 text-sm">{{ errors.image }}</span>
          </div>
          <div class="mt-4 flex justify-end">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 bg-gray-300 rounded-md"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {{ isEditing ? "Cập nhật" : "Thêm" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import ImageInput from "../../../components/inputImage/ImageInput.vue";
import Swal from "sweetalert2";

const store = useStore();
const showModal = ref(false);
const category = ref({ category_name: "", description: "", image: "" });
const isEditing = ref(false);
const errors = ref({});

// Fetch existing categories to validate against
const existingCategories = ref([]);

const handleImage = (link) => {
  category.value.image = link;
};

// Fetch categories from store when component mounts
const fetchCategories = async () => {
  await store.dispatch("fetchAllCategories");
  existingCategories.value = store.getters.getCategories.map(cat => cat.category_name.toLowerCase());
};

const validateForm = () => {
  errors.value = {}; 
  let isValid = true;

  if (!category.value.category_name) {
    errors.value.category_name = "Tên danh mục là không được bỏ trống.";
    isValid = false;
  } else if (existingCategories.value.includes(category.value.category_name.toLowerCase())) {
    errors.value.category_name = "Tên danh mục đã tồn tại.";
    isValid = false;
  }
  if (!category.value.description) {
    errors.value.description = "Mô tả là không được bỏ trống.";
    isValid = false;
  }
  if (!category.value.image) {
    errors.value.image = "Vui lòng chọn hình ảnh.";
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    if (isEditing.value) {
      store.dispatch("updateCategory", { ...category.value });
    } else {
      store.dispatch("addCategory", { ...category.value });
    }
    showModal.value = false; // Đóng modal sau khi gửi
    Swal.fire({
      icon: 'success',
      title: 'Thêm danh mục thành công!',
      text: 'Danh mục mới đã được thêm vào hệ thống.',
      confirmButtonText: 'OK'
    });
    store.dispatch("fetchAllCategories"); // Refresh categories list
    category.value = { category_name: "", description: "", image: "" }; // Reset form
  }
};

fetchCategories(); // Fetch categories when component mounts

</script>

<style scoped>
</style>
