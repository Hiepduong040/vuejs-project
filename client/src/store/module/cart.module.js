import { addCart } from "@/api/carts";
import Swal from 'sweetalert2';

export const carts = {
  state: {
    carts: [],
  },
  mutations: {
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
    ADD_CART(state, payload) {
      state.carts.push(payload);
    },
    DELETE_CART(state, payload) {
      state.carts = state.carts.filter(cart => cart.id !== payload);
    },
  },
  actions: {
    async addNewCart({ commit }, product) {
      const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ localStorage

      if (!user) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!',
        });
        return;
      }

      const cartItem = {
        idUser: user.id, // Sử dụng id người dùng từ localStorage
        products: [product], // Sản phẩm được thêm vào giỏ
      };

      try {
        const res = await addCart(cartItem);
        commit('ADD_CART', res);
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Sản phẩm đã được thêm vào giỏ hàng.',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Không thể thêm sản phẩm vào giỏ hàng.',
        });
      }
    },
  },
};
