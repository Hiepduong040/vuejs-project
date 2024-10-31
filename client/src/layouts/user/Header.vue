<template>
  <div id="header-wrap" class="bg-white shadow">
    <div class="top-content">
      <div class="container mx-auto py-4">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <a href="#" class="text-xl text-blue-600 hover:text-blue-800">
              <i class="bx bxl-facebook"></i>
            </a>
            <a href="#" class="text-xl text-blue-600 hover:text-blue-800">
              <i class="bx bxl-twitter"></i>
            </a>
            <a href="#" class="text-xl text-blue-600 hover:text-blue-800">
              <i class="bx bxl-youtube"></i>
            </a>
            <a href="#" class="text-xl text-blue-600 hover:text-blue-800">
              <i class="bx bxl-linkedin"></i>
            </a>
          </div>
          <div class="flex space-x-4">
            <div class="relative">
              <a href="#" @click.prevent="toggleDropdown" class="flex items-center text-gray-600 hover:text-gray-800">
                <i class="bx bx-user"></i><span class="ml-1">Account</span>
              </a>
              <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg" @click="handleDropdownClick">
                <div class="px-4 py-2 text-gray-800">
                  <template v-if="user">
                    <a href="/user/account" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">Chi tiết tài khoản</a>
                    <a href="#" @click.prevent="logout" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">Logout</a>
                  </template>
                  <template v-else>
                    <a href="#" @click.prevent="login" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">Đăng nhập</a>
                  </template>
                </div>
              </div>
            </div>

            <a @click="checkLoginAndRedirect" class="flex  cursor-pointer items-center text-gray-600 hover:text-gray-800">
              <i class="bx bx-cart"></i><span class="ml-1">Cart</span>
            </a>
            <SearchHomeInput class="mt-1.5" />
          </div>
        </div>
      </div>
    </div>

    <header id="header" :class="{ 'fixed top-0 left-0 w-full shadow-lg z-50': isFixed }" class="bg-white transition-all duration-300">
      <div class="container mx-auto py-6 flex justify-between items-center">
        <div class="main-logo">
          <a href="/"><img class="h-12" src="https://book365.vn/bitrix/templates/book365-2021/images/edu-2021/logo_book365.png" alt="logo" /></a>
        </div>

        <nav id="navbar" class="flex-grow">
          <ul class="flex space-x-10 justify-center items-center">
            <li>
              <a href="/" class="text-gray-600 hover:text-blue-600">Home</a>
            </li>
            <li class="relative group">
              <a href="#pages" class="text-gray-600 hover:text-blue-600">Pages</a>
              <ul class="absolute left-0 hidden group-hover:block bg-white shadow">
                <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Home</a></li>
                <li><a href="about.html" class="block px-4 py-2 hover:bg-gray-100">About</a></li>
                <li><a href="styles.html" class="block px-4 py-2 hover:bg-gray-100">Styles</a></li>
                <li><a href="blog.html" class="block px-4 py-2 hover:bg-gray-100">Blog</a></li>
                <li><a href="shop.html" class="block px-4 py-2 hover:bg-gray-100">Our Store</a></li>
                <li><a href="contact.html" class="block px-4 py-2 hover:bg-gray-100">Contact</a></li>
              </ul>
            </li>
            <li><a href="#featured-books" class="text-gray-600 hover:text-blue-600">Featured</a></li>
            <li><a href="#popular-books" class="text-gray-600 hover:text-blue-600">Popular</a></li>
            <li><a href="#special-offer" class="text-gray-600 hover:text-blue-600">Offer</a></li>
            <li><a href="#latest-blog" class="text-gray-600 hover:text-blue-600">Articles</a></li>
            <li><a href="#download-app" class="text-gray-600 hover:text-blue-600">Download App</a></li>
            <li>
              <a href="https://templatesjungle.gumroad.com/l/booksaw-free-html-bookstore-template" target="_blank" class="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-800">Get PRO</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const router = useRouter();
const isFixed = ref(false);
const previousScroll = ref(0);
const showDropdown = ref(false);
const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ localStorage

function handleScroll() {
  const currentScroll = window.pageYOffset;
  isFixed.value = currentScroll > previousScroll.value && currentScroll > 40;
  previousScroll.value = currentScroll;
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}



function login() {
  // Chuyển hướng tới trang đăng nhập
  window.location.href = "/login"; // Thay đổi đường dẫn tới trang đăng nhập
}

function logout() {
  localStorage.removeItem("user"); // Xóa thông tin người dùng
  window.location.reload(); // Làm mới trang để cập nhật trạng thái
  showDropdown.value = false; // Ẩn dropdown khi đăng xuất
  window.location.href = "/";
}

function checkLoginAndRedirect() {
  if (!user) {
    Swal.fire({
      icon: 'warning',
      title: 'Vui lòng đăng nhập để tiếp tục sử dụng!',
      confirmButtonText: 'OK'
    });
  } else {
    router.push("/user/cart"); // Chuyển hướng đến giỏ hàng nếu đã đăng nhập
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform: translateY(0);
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header:not(.fixed-header) {
  transform: translateY(-100%);
}
</style>
