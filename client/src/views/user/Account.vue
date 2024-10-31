<template>
  <div class="container mx-auto px-4 mt-4 bg-gray-100">
    <!-- Account page navigation-->
    <nav class="flex space-x-4 border-b border-gray-300 mb-4">
      <a class="nav-link text-blue-600 font-medium border-b-2 border-blue-600" href="#" target="__blank">Profile</a>
      <a class="nav-link text-gray-600 hover:text-blue-600" href="#" target="__blank">Billing</a>
      <a class="nav-link text-gray-600 hover:text-blue-600" href="#" target="__blank">Security</a>
      <a class="nav-link text-gray-600 hover:text-blue-600" href="#" target="__blank">Notifications</a>
    </nav>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="col-span-1">
        <!-- Profile picture card-->
        <div class="bg-white shadow rounded-lg mb-4">
          <div class="px-4 py-2 border-b">
            <h5 class="font-semibold">Profile Picture</h5>
          </div>
          <div class="p-4 text-center">
            <img class="img-account-profile rounded-full mb-2 h-40 w-40 object-cover" :src="user.avatar" alt="Profile Picture">
            <div class="text-sm text-gray-500 mb-4">JPG or PNG no larger than 5 MB</div>
            <button class="btn btn-primary bg-blue-600 text-white py-2 px-4 rounded">Upload new image</button>
          </div>
        </div>
      </div>

      <div class="col-span-2">
        <!-- Account details card-->
        <div class="bg-white shadow rounded-lg mb-4">
          <div class="px-4 py-2 border-b">
            <h5 class="font-semibold">Account Details</h5>
          </div>
          <div class="p-4">
            <form>
              <!-- Form Group (username) -->
              <div class="mb-3">
                <label class="block text-sm mb-1" for="inputUsername">Username</label>
                <input class="form-input" id="inputUsername" type="text" placeholder="Enter your username" v-model="user.username">
              </div>

              <!-- Form Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label class="block text-sm mb-1" for="inputFullName">Full Name</label>
                  <input class="form-input" id="inputFullName" type="text" placeholder="Enter your full name" v-model="user.fullName">
                </div>
                <div>
                  <label class="block text-sm mb-1" for="inputEmailAddress">Email address</label>
                  <input class="form-input" id="inputEmailAddress" type="email" placeholder="Enter your email address" v-model="user.email">
                </div>
              </div>

              <!-- Form Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label class="block text-sm mb-1" for="inputPhone">Phone number</label>
                  <input class="form-input" id="inputPhone" type="tel" placeholder="Enter your phone number" v-model="user.phone">
                </div>
                <div>
                  <label class="block text-sm mb-1" for="inputAddress">Address</label>
                  <input class="form-input" id="inputAddress" type="text" placeholder="Enter your address" v-model="user.address">
                </div>
              </div>

              <!-- Save changes button -->
              <button class="btn btn-primary bg-blue-600 text-white py-2 px-4 rounded" type="button" @click="saveChanges">Save changes</button>
            </form>
            <button class="btn btn-danger bg-red-600 text-white py-2 px-4 rounded mt-4" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref({
  username: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  avatar: ''
});
const router = useRouter();

onMounted(() => {
  loadUserData();
});

function loadUserData() {
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
  }
}

function saveChanges() {
  // Lưu thông tin người dùng vào localStorage
  localStorage.setItem("user", JSON.stringify(user.value));
  alert('Changes saved successfully!'); // Thông báo đã lưu
}

function logout() {
  localStorage.removeItem("user");
  user.value = {
    username: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    avatar: ''
  };
  router.push("/"); // Chuyển hướng về trang chính
}
</script>
<style scoped>
.img-account-profile {
  height: 10rem; /* Optional for specific height */
}
</style>
