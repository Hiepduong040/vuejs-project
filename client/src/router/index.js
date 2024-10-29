import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import Swal from "sweetalert2";
// sử dụng toán tử Spread Operator để bảo lưu các phần tử route
const routes = [...userRoutes, ...authRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const admin = localStorage.getItem("admin");

  if (to.path.startsWith("/admin") && !admin) {
    Swal.fire({
      icon: "warning",
      title: "Bạn chưa đăng nhập",
      text: "Vui lòng đăng nhập để sử dụng!",
      confirmButtonText: "OK",
    }).then(() => {
      next("/login/admin");
    });
  } else {
      next();
     
  }
});

export default router;
