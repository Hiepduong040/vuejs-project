<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900"
  >
    <div
      class="bg-black bg-opacity-50 p-10 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 class="text-3xl font-semibold text-white text-center mb-6">
        Admin Login
      </h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <input
            type="text"
            placeholder="email"
            v-model="email"
            class="w-full px-4 py-3 text-lg text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-6">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="w-full px-4 py-3 text-lg text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      icon: "warning",
      title: "Tài khoản hoặc mật khẩu không được để trống",
      text: "Vui lòng đăng nhập để sử dụng!",
      confirmButtonText: "OK",
    })
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    Swal.fire({
      icon: "warning",
      title: "Email không đúng định dạng",
      text: "Vui lòng đăng nhập để sử dụng!",
      confirmButtonText: "OK",
    })
    return;
  }

  
    const response = await axios.get("http://localhost:3000/admin");
    const admin = response.data.find(
      (user) => user.email === email.value && user.password === password.value
    );

    if (admin) {
      // Store admin in localStorage
      localStorage.setItem("admin", JSON.stringify(admin));
      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        text: "",
        confirmButtonText: "OK",
      });
      // Successful login, redirect to admin dashboard
      router.push("/admin/dashboard");
    } else {
      Swal.fire({
      icon: "warning",
      title: "Thông tin tài khoản hoặc mật khẩu không chính xác",
      text: "Vui lòng đăng nhập để sử dụng!",
      confirmButtonText: "OK",
    })
    }
  
};
</script>

  
   