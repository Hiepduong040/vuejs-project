<template>
    <div>
      <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white shadow-lg rounded-lg flex flex-col lg:flex-row w-full max-w-6xl">
          <div class="hidden lg:flex items-center justify-center bg-blue-50 rounded-l-lg">
            <img
              src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-signing-up-for-a-course-isolated-cartoon-vector-illustrations-picture-image_8710389.png"
              alt="Auth Cover Bg"
              class="h-full object-cover rounded-l-lg"
            />
          </div>
  
          <div class="flex items-center justify-center p-8 lg:p-12 w-full lg:w-1/2">
            <div class="w-full max-w-md register-form">
              <div class="text-center mb-6">
                <img
                  class="w-16 mx-auto"
                  src="https://www.pngmart.com/files/21/Administrator-PNG-File.png"
                  alt="Logo Book365.Vn"
                />
                <h2 class="text-2xl font-bold mt-2">Book365.Vn</h2>
              </div>
  
              <h4 class="text-xl font-semibold mb-2 text-gray-700">
                Đăng ký tài khoản mới
              </h4>
              <p class="mb-4 text-gray-500">
                Vui lòng điền thông tin bên dưới để tạo tài khoản
              </p>
  
              <form @submit.prevent="handleRegister" class="space-y-4">
                <div class="space-y-1">
                  <label for="fullName" class="block text-sm font-medium text-gray-700">Họ và tên</label>
                  <input v-model="registerData.fullName" type="text" id="fullName" placeholder="Nhập họ và tên" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" required />
                </div>
  
                <div class="space-y-1">
                  <label for="username" class="block text-sm font-medium text-gray-700">Tài khoản</label>
                  <input v-model="registerData.username" type="text" id="username" placeholder="Nhập tài khoản" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" required />
                </div>
  
                <div class="space-y-1">
                  <label for="phone" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                  <input v-model="registerData.phone" type="text" id="phone" placeholder="Nhập số điện thoại" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" />
                </div>
  
                <div class="space-y-1">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input v-model="registerData.email" type="email" id="email" placeholder="Nhập email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" required />
                </div>
  
                <div class="space-y-1">
                  <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                  <input v-model="registerData.password" type="password" id="password" placeholder="Nhập mật khẩu" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" required />
                </div>
  
                <div class="space-y-1">
                  <label for="repassword" class="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
                  <input v-model="registerData.repassword" type="password" id="repassword" placeholder="Nhập lại mật khẩu" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" required />
                </div>
  
                <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Đăng Ký</button>
              </form>
  
              <p class="text-center mt-4 text-sm text-gray-500">
                Bạn đã có tài khoản? <a href="/login" class="text-blue-600 hover:underline">Đăng nhập ngay</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { addUser, getAllUser } from "@/api/userAPI";  
  import Swal from "sweetalert2";  
  
  const registerData = ref({
    fullName: "",
    username: "",
    email: "",
    password: "",
    repassword: "", // Thêm trường nhập lại mật khẩu
    phone: "",
    address: "",
    avatar: "",
    status: true,
    created_at: "",
    updated_at: "",
    product:[],
  });
  
  // Hàm xử lý đăng ký
  const handleRegister = async () => {
    if (!registerData.value.fullName || !registerData.value.username || !registerData.value.email || !registerData.value.password || !registerData.value.repassword) {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ thông tin!", "error");
      return;
    }
  
    // Kiểm tra số điện thoại có 11 ký tự
    if (registerData.value.phone && registerData.value.phone.length !== 11) {
      Swal.fire("Lỗi", "Số điện thoại phải có 11 ký tự!", "error");
      return;
    }
  
    // Kiểm tra mật khẩu tối thiểu 6 ký tự
    if (registerData.value.password.length < 6) {
      Swal.fire("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!", "error");
      return;
    }
  
    // Kiểm tra mật khẩu và nhập lại mật khẩu
    if (registerData.value.password !== registerData.value.repassword) {
      Swal.fire("Lỗi", "Mật khẩu và nhập lại mật khẩu không trùng khớp!", "error");
      return;
    }
  
    // Kiểm tra email có trùng trong database
    const emailExists = await checkEmailExists(registerData.value.email);
    if (emailExists) {
      Swal.fire("Lỗi", "Email đã tồn tại! Vui lòng sử dụng email khác.", "error");
      return;
    }
  
    // Chuẩn bị dữ liệu người dùng
    const newUser = {
      username: registerData.value.username,
      fullName: registerData.value.fullName,
      email: registerData.value.email,
      password: registerData.value.password,
      phone: registerData.value.phone,
      address: registerData.value.address,
      avatar: "",
      status: true,
      created_at: new Date().toISOString(),
      updated_at: "",
      product:[]
    };
  
    try {
      const response = await addUser(newUser);
      console.log("User registered:", response.data);
      Swal.fire("Thành công", "Đăng ký tài khoản thành công!", "success").then(() => {
        window.location.href = "http://localhost:5173/login"; 
      });
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Lỗi", "Có lỗi xảy ra trong quá trình đăng ký!", "error");
    }
  };
  
  // Hàm kiểm tra email có tồn tại hay không
  const checkEmailExists = async (email) => {
    const response = await getAllUser(); // Hàm này phải trả về danh sách người dùng từ DB
    return response.data.some(user => user.email === email);
  };
  </script>
  
  <style>
  .register-form {
    width: 392px;
  }
  </style>
  