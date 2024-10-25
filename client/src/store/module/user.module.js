
import {
  getAllUser,
  lockUser,
  unlockUser,
  deleteUser,
  addUser,
} from "@/api/userAPI";

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
    async addUserAction({ commit }, newUser) {
      const response = await addUser(newUser);
      commit("addUserMutation", response.data);
    },
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
