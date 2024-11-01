

import {
  getAllUser,
  lockUser,
  unlockUser,
  deleteUser,
  addUser,
} from "@/api/userAPI";
import Swal from 'sweetalert2';
import apiClient from "@/api/instance"; // Đảm bảo đường dẫn đúng với cấu trúc thư mục của bạn
const user = {
  state: {
    users: [],
    filteredUsers: [], // Thêm state cho danh sách đã lọc
    currentPage: 1,
    pageSize: 5, // Mặc định 5 bản ghi một trang
    searchUsers: "", // Giá trị tìm kiếm
    sortOption: "asc", // Mặc định sắp xếp tăng dần
  },
  mutations: {
    getAllUserMutations(state, users) {
      state.users = users;
      state.filteredUsers = users; // Lưu danh sách người dùng ban đầu
    },
    updateStatusUserMutations(state, { userId, status }) {
      const user = state.users.find((user) => user.user_id === userId);
      if (user) {
        user.status = status;
      }
    },
    deleteUserMutations(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
      state.filteredUsers = state.filteredUsers.filter(
        (user) => user.id !== userId
      ); // Cập nhật cả danh sách đã lọc
    },
    setPageSize(state, size) {
      state.pageSize = size;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setSearchUser(state, search) {
      state.searchUsers = search;
    },
    setSortOption(state, sortOption) {
      state.sortOption = sortOption;
    },
    setFilteredUsers(state, users) {
      state.filteredUsers = users;
    },
    addUserMutation(state, newUser) {
      state.users.push(newUser);
    //   state.filteredUsers.push(newUser); // add user mới vào list
    },
    updateUserProduct(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    }
  },
  actions: {
    // lay danh sach toan bo user
    async fetchAllUsers({ commit }) {
      const response = await getAllUser();
      commit("getAllUserMutations", response.data);
    },
    // khoa va mo user
    async lockUser({ commit }, userId) {
      await lockUser(userId);
      commit("updateStatusUserMutations", { userId, status: false });
    },
    async unlockUser({ commit }, userId) {
      await unlockUser(userId);
      commit("updateStatusUserMutations", { userId, status: true });
    },
    // xoa user
    async deleteUser({ commit }, userId) {
      await deleteUser(userId); // goi api xoa
      commit("deleteUserMutations", userId);
    },
    searchUser({ state, commit }, search) {
      commit("setSearchUser", search);
      const filtered = state.users.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      commit("setFilteredUsers", filtered); // Cập nhật danh sách đã lọc
    },
    // sap xep user
    sortUsers({ state, commit }) {
      const sortedUsers = [...state.filteredUsers];
      if (state.sortOption === "asc") {
        sortedUsers.sort((a, b) => a.username.localeCompare(b.username));
      } else {
        sortedUsers.sort((a, b) => b.username.localeCompare(a.username));
      }
      commit("setFilteredUsers", sortedUsers); // Cập nhật danh sách sau khi sắp xếp
    },
    async addUserAction({ commit, state }, newUser) {
      // Check if the email already exists
      const emailExists = state.users.some(user => user.email === newUser.email);
      
      if (emailExists) {
        throw Swal.fire({
          icon: 'error',
          title: 'Email đã tồn tại!',
          text: 'Vui lòng sử dụng email khác.',
          confirmButtonText: 'OK',
          background: '#fff',
          iconColor: '#d33',
          customClass: {
            confirmButton: 'bg-blue-500 text-white rounded',
          },
        });
        // throw new Error('Email đã tồn tại! Vui lòng sử dụng email khác.');
      }
    
      const response = await addUser(newUser); 
      commit("addUserMutation", response.data); 
    },
    async addProductToUser({ commit }, { userId, product }) {
      // Lấy thông tin người dùng hiện tại trước khi cập nhật
      const response = await apiClient.get(`/users/${userId}`);
      const user = response.data;
    
      // Thêm sản phẩm vào mảng sản phẩm của người dùng
      const updatedProducts = [...user.product, product];
    
      // Cập nhật thông tin người dùng với sản phẩm mới
      const updateResponse = await apiClient.patch(`/users/${userId}`, {
        product: updatedProducts,
      });
    
      commit("updateUserProduct", updateResponse.data); // Cập nhật store nếu cần
    }
    
  },
  getters: {
    paginatedUsers: (state) => {
      const start = (state.currentPage - 1) * state.pageSize;
      const end = start + state.pageSize;
      return state.filteredUsers.slice(start, end); // Cập nhật dữ liệu paginated dựa trên filteredUsers
    },
    totalPage: (state) => {
      return Math.ceil(state.filteredUsers.length / state.pageSize);
    },
  },
};

export default user;
