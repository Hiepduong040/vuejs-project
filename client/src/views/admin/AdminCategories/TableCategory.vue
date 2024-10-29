 <!-- <template>
  <section class="p-6">
    <div class="overflow-x-auto mt-4">
      <table class="table-auto w-full border-collapse bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="px-2 py-2 bg-gray-200 border">STT</th>
            <th class="px-2 py-2 bg-gray-200 border">Tên danh mục</th>
            <th class="px-2 py-2 bg-gray-200 border">Ảnh minh họa</th>
            <th class="px-2 py-2 bg-gray-200 border">Mô tả</th>
            <th class="px-2 py-2 bg-gray-200 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in displayedCategories" :key="category.id">
            <td class="px-2 py-2 border">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
            <td class="px-2 py-2 border">{{ category.category_name }}</td>
            <td class="px-2 py-2 border">
              <img :src="category.image" class="w-16 h-16 object-cover" />
            </td>
            <td class="px-2 py-2 border">{{ category.description }}</td>
            <td class="px-2 py-2 border">
              <button @click="editCategory(category)" class="mr-2 text-blue-500">Sửa</button>
              <button @click="deleteCategory(category.id)" class="text-red-500">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationCategories/>
 
    <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">{{ isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục" }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <input v-model="category.category_name" type="text" placeholder="Tên danh mục" class="w-full p-2 border border-gray-300 rounded-md" />
            <textarea v-model="category.description" placeholder="Mô tả" class="w-full p-2 border border-gray-300 rounded-md"></textarea>
            <div >Hình ảnh danh mục</div>
            <ImageInput :image="category.image" @handleImange="handleImage"></ImageInput>
          </div>
          <div class="mt-4 flex justify-end">
            <button type="button" @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded-md">Hủy</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">{{ isEditing ? "Cập nhật" : "Thêm" }}</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import ImageInput from "../../../components/inputImage/ImageInput.vue";
import queryString from "query-string";
import PaginationCategories from "./PaginationCategories.vue";
const store = useStore();
const currentPage = ref(1);
const pageSize = ref(5);
const showModal = ref(false);
const isEditing = ref(false);
const category = ref({ category_name: "", description: "", image: "" });
const param = reactive({_page:1,_limit:5});

// Fetch categories when the component is mounted
onMounted(() => {
  store.dispatch("fetchAllCategories",queryString.stringify(param));
  
});

// Computed properties
const currentPageCategories = computed(() => store.state.category.currentPageCategories);
const pageSizeCategories = computed(() => store.state.category.pageSizeCategories);
const categories = computed(() => store.state.category.filteredCategories);

// Displayed categories based on pagination
const displayedCategories = computed(() => {
  const start = (currentPageCategories.value - 1) * pageSizeCategories.value;
  const end = start + pageSizeCategories.value;
  return categories.value.slice(start, end);
});
// Get existing category names for validation
const existingCategoryNames = computed(() => {
  return categories.value.map(cat => cat.category_name.toLowerCase());
});

const handleImage=(link)=>{
    category.value.image=link;
  }
const deleteCategory = (categoryId) => {
  Swal.fire({
    title: "Bạn có chắc chắn muốn xóa danh mục này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("deleteCategory", categoryId);
      Swal.fire("Đã xóa!", "Danh mục đã được xóa.", "success");
    }
  });
};

// Hàm mở modal để chỉnh sửa danh mục
const editCategory = (categoryToEdit) => {
  category.value = { ...categoryToEdit };
  isEditing.value = true;
  showModal.value = true;
 
};


// Validate form inputs
const validateForm = () => {
  let errors = {};
  
  // Check if the category name is empty
  if (!category.value.category_name) {
    errors.category_name = "Tên danh mục không được bỏ trống.";
  } else {
    // Check if the category name already exists
    const isDuplicate = existingCategoryNames.value.includes(category.value.category_name.toLowerCase());
    
    // If editing, allow the same name; otherwise, flag it as a duplicate
    if (isDuplicate && (!isEditing.value || category.value.category_name !== category.value.category_name)) {
      errors.category_name = "Tên danh mục đã tồn tại.";
    }
  }
  
  // Check if the description is empty
  if (!category.value.description) {
    errors.description = "Mô tả không được bỏ trống.";
  }
  
  return Object.keys(errors).length === 0 ? true : errors;
};

// Hàm xử lý khi gửi form
const handleSubmit = () => {
  const validation = validateForm();
  
  if (validation === true) {
    if (isEditing.value) {
      store.dispatch("updateCategory", category.value);
      Swal.fire({
        icon: 'success',
        title: 'Sửa danh mục thành công!',
        text: 'Danh mục đã được sửa.',
        confirmButtonText: 'OK'
      });
    } else {
      store.dispatch("addCategory", category.value);
      Swal.fire({
        icon: 'success',
        title: 'Thêm danh mục thành công!',
        text: 'Danh mục đã được thêm vào hệ thống.',
        confirmButtonText: 'OK'
      });
    }
    showModal.value = false; // Đóng modal sau khi gửi
  } else {
    Object.keys(validation).forEach(key => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: validation[key],
      });
    });
  }
};
</script>

<style scoped>
</style>  -->

<template>
  <section class="p-6">
    <div class="overflow-x-auto mt-4">
      <table class="table-auto w-full border-collapse bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="px-2 py-2 bg-gray-200 border">STT</th>
            <th class="px-2 py-2 bg-gray-200 border">Tên danh mục</th>
            <th class="px-2 py-2 bg-gray-200 border">Ảnh minh họa</th>
            <th class="px-2 py-2 bg-gray-200 border">Mô tả</th>
            <th class="px-2 py-2 bg-gray-200 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in displayedCategories" :key="category.id">
            <td class="px-2 py-2 border">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
            <td class="px-2 py-2 border">{{ category.category_name }}</td>
            <td class="px-2 py-2 border">
              <img :src="category.image" class="w-16 h-16 object-cover" />
            </td>
            <td class="px-2 py-2 border">{{ category.description }}</td>
            <td class="px-2 py-2 border">
              <button @click="editCategory(category)" class="mr-2 text-blue-500">Sửa</button>
              <button @click="deleteCategory(category.id)" class="text-red-500">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationCategories/>

    <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">{{ isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục" }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <input v-model="category.category_name" type="text" placeholder="Tên danh mục" class="w-full p-2 border border-gray-300 rounded-md" />
            <span v-if="errors.category_name" class="text-red-500 text-sm">{{ errors.category_name }}</span>
            
            <textarea v-model="category.description" placeholder="Mô tả" class="w-full p-2 border border-gray-300 rounded-md"></textarea>
            <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
            
            <div>Hình ảnh danh mục</div>
            <ImageInput :image="category.image" @handleImange="handleImage"></ImageInput>
            <span v-if="errors.image" class="text-red-500 text-sm">{{ errors.image }}</span>
          </div>
          <div class="mt-4 flex justify-end">
            <button type="button" @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded-md">Hủy</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">{{ isEditing ? "Cập nhật" : "Thêm" }}</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import ImageInput from "../../../components/inputImage/ImageInput.vue";
import queryString from "query-string";
import PaginationCategories from "./PaginationCategories.vue";

const store = useStore();
const currentPage = ref(1);
const pageSize = ref(5);
const showModal = ref(false);
const isEditing = ref(false);
const category = ref({ category_name: "", description: "", image: "" });
const errors = ref({});
const param = reactive({_page: 1, _limit: 5});

// Fetch categories when the component is mounted
onMounted(() => {
  store.dispatch("fetchAllCategories", queryString.stringify(param));
});

// Computed properties
const currentPageCategories = computed(() => store.state.category.currentPageCategories);
const pageSizeCategories = computed(() => store.state.category.pageSizeCategories);
const categories = computed(() => store.state.category.filteredCategories);

// Displayed categories based on pagination
const displayedCategories = computed(() => {
  const start = (currentPageCategories.value - 1) * pageSizeCategories.value;
  const end = start + pageSizeCategories.value;
  return categories.value.slice(start, end);
});

// Get existing category names for validation
const existingCategoryNames = computed(() => {
  return categories.value.map(cat => cat.category_name.toLowerCase());
});

const handleImage = (link) => {
  category.value.image = link;
};

const deleteCategory = (categoryId) => {
  Swal.fire({
    title: "Bạn có chắc chắn muốn xóa danh mục này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("deleteCategory", categoryId);
      Swal.fire("Đã xóa!", "Danh mục đã được xóa.", "success");
    }
  });
};

// Hàm mở modal để chỉnh sửa danh mục
const editCategory = (categoryToEdit) => {
  category.value = { ...categoryToEdit };
  isEditing.value = true;
  showModal.value = true;
};

// Validate form inputs
// Validate form inputs
const validateForm = () => {
  errors.value = {}; // Reset errors

  // Check if the category name is empty
  if (!category.value.category_name) {
    errors.value.category_name = "Tên danh mục không được bỏ trống.";
  } else {
    // Check for duplicate category name, except for the current category being edited
    const isDuplicate = existingCategoryNames.value.includes(category.value.category_name.toLowerCase());
    if (isDuplicate && (!isEditing.value || (isEditing.value && category.value.category_name !== category.value.category_name))) {
      errors.value.category_name = "Tên danh mục đã tồn tại.";
    }
  }

  // Check if the description is empty
  if (!category.value.description) {
    errors.value.description = "Mô tả không được bỏ trống.";
  }

  // Check if image is provided
  if (!category.value.image) {
    errors.value.image = "Hình ảnh không được bỏ trống.";
  }

  return Object.keys(errors.value).length === 0;
};


// Hàm xử lý khi gửi form
const handleSubmit = () => {
  if (validateForm()) {
    if (isEditing.value) {
      store.dispatch("updateCategory", category.value);
      Swal.fire({
        icon: 'success',
        title: 'Sửa danh mục thành công!',
        text: 'Danh mục đã được sửa.',
        confirmButtonText: 'OK'
      });
    } else {
      store.dispatch("addCategory", category.value);
      Swal.fire({
        icon: 'success',
        title: 'Thêm danh mục thành công!',
        text: 'Danh mục đã được thêm vào hệ thống.',
        confirmButtonText: 'OK'
      });
    }
    showModal.value = false; // Đóng modal sau khi gửi
  } else {
    Object.keys(errors.value).forEach(key => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: errors.value[key],
      });
    });
  }
};
</script>

<style scoped>
</style>
