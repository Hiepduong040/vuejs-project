<template>
  <div>
    <button @click="showModal = true" class="ml-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">
      Thêm mới
    </button>
    <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Thêm người dùng mới</h2>
        <form @submit.prevent="handleAddUser" class="space-y-4">
          <div>
            <input v-model="newUser.username" type="text" placeholder="Tên đăng nhập" class="w-full p-2 border border-gray-300 rounded-md" />
            <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</span>
          </div>
          <div>
            <input v-model="newUser.fullName" type="text" placeholder="Tên đầy đủ" class="w-full p-2 border border-gray-300 rounded-md" />
            <span v-if="errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</span>
          </div>
          <div>
            <input v-model="newUser.email" type="email" placeholder="Email" class="w-full p-2 border border-gray-300 rounded-md" />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>
          <div>
            <input v-model="newUser.password" type="password" placeholder="Mật khẩu" class="w-full p-2 border border-gray-300 rounded-md" />
            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
          </div>
          <div>
            <input v-model="newUser.phone" type="text" placeholder="Số điện thoại" class="w-full p-2 border border-gray-300 rounded-md" />
            <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
          </div>
          <div>
            <input v-model="newUser.address" type="text" placeholder="Địa chỉ" class="w-full p-2 border border-gray-300 rounded-md" />
            <span v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</span>
          </div>
          <div>Hình ảnh người dùng</div>
          <ImageInput :image="newUser.avatar" @handleImange="handleImage" />
          <div class="flex items-center space-x-2">
            <label for="status" class="text-gray-700">Trạng thái:</label>
            <input v-model="newUser.status" type="checkbox" id="status" class="w-4 h-4" />
          </div>
          <div class="mt-4 flex justify-end space-x-2">
            <button type="button" @click="showModal = false" class="px-4 py-2 bg-gray-300 text-black font-bold rounded hover:bg-gray-400 transition">Hủy</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">Thêm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import ImageInput from '@/components/inputImage/ImageInput.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';
const store = useStore();
const showModal = ref(false);
const newUser = ref({
  username: '',
  fullName: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  avatar: '',
  status: true,
});
const errors = ref({});

const validateForm = () => {
  errors.value = {}; // Reset errors
  let isValid = true;

  if (!newUser.value.username) {
    errors.value.username = 'Tên đăng nhập là bắt buộc.';
    isValid = false;
  }
  if (!newUser.value.fullName) {
    errors.value.fullName = 'Tên đầy đủ là bắt buộc.';
    isValid = false;
  }
  if (!newUser.value.email) {
    errors.value.email = 'Email là bắt buộc.';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(newUser.value.email)) {
    errors.value.email = 'Email không hợp lệ.';
    isValid = false;
  }
  if (!newUser.value.password) {
    errors.value.password = 'Mật khẩu là bắt buộc.';
    isValid = false;
  } else if (newUser.value.password.length <= 5) {
    errors.value.password = 'Mật khẩu phải trên 6 ký tự.';
    isValid = false;
  }
  if (!newUser.value.phone) {
    errors.value.phone = 'Số điện thoại là bắt buộc.';
    isValid = false;
  } else if (!/^\d{10,11}$/.test(newUser.value.phone)) {
    errors.value.phone = 'Số điện thoại phải có ít nhất 10 và không quá 11 số.';
    isValid = false;
  }
  if (!newUser.value.address) {
    errors.value.address = 'Địa chỉ là bắt buộc.';
    isValid = false;
  }

  return isValid;
};

const handleImage=(link)=>{
    newUser.value.avatar=link;
  }

const handleAddUser = () => {
  if (validateForm()) {
    const user = {
      ...newUser.value,
      created_at: new Date().toISOString(),
      updated_at: '',
    };
    store.dispatch('addUserAction', user);
    Swal.fire({
      icon: 'success',
      title: 'Thêm người dùng thành công!',
      text: 'Người dùng mới đã được thêm vào hệ thống.',
      confirmButtonText: 'OK'
    });
    newUser.value = { // Reset form
      username: '',
      fullName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      avatar: '',
      status: true,
    };
    showModal.value = false; // Close the modal after adding user
    
  }
};

onMounted(async () => {
  await store.dispatch('fetchAllUsers'); 
});

</script>

<style scoped>
</style>
