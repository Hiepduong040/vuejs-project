import {
  getAllProducts,
  deleteProduct,
  updateProduct,
  addProduct,
  getUserAllProducts,
  getProductById,
} from "../../api/productAPI";
import { getAllCategories, getProductsByCategoryId } from "@/api/categoryAPI";
const product = {
  state: {
    products: [],
    allProducts: [],
    filteredProducts: [],
    categories: [],
    currentPage: 1, // Trang hiện tại
    pageSize: 5, // Số lượng sản phẩm mỗi trang
    totalProducts: 0, // Tổng số sản phẩm
  },
  mutations: {
    setProductMutations(state, { products, total }) {
      state.products = products; // Lưu sản phẩm hiện tại
      state.filteredProducts = products; // Lưu sản phẩm đã lọc
      state.totalProducts = total; // Cập nhật tổng số sản phẩm
    },
    setAllProductMutations(state, products) {
      console.log(11111, products); // Log để kiểm tra dữ liệu
      state.allProducts = products; // Lưu tất cả sản phẩm
    },
    
    addProductMutations(state, product) {
      state.products.push(product);
      state.filteredProducts.push(product);
    },
    updateProductMutations(state, updatedProduct) {
      const index = state.products.findIndex(
        (p) => p.product_id === updatedProduct.product_id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
        state.filteredProducts[index] = updatedProduct;
      }
    },
    deleteProductMutations(state, productId) {
      state.products = state.products.filter((p) => p.product_id !== productId);
      state.filteredProducts = state.filteredProducts.filter(
        (p) => p.product_id !== productId
      );
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setPageSize(state, size) {
      state.pageSize = size;
    },
    filterProductsMutations(state, searchTerm) {
      if (searchTerm) {
        state.filteredProducts = state.products.filter(
          (product) =>
            product.product_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        state.filteredProducts = state.products;
      }
    },
  },
  actions: {
    async fetchProducts({ commit, state }) {
      const response = await getAllProducts(state.currentPage, state.pageSize);
      const total = response.headers["x-total-count"]; // Lấy tổng số sản phẩm từ header
      commit("setProductMutations", { products: response.data, total });
    },
    async addProduct({ commit }, product) {
      const response = await addProduct(product);
      commit("addProductMutations", response.data);
    },
    async updateProduct({ commit }, product) {
      const response = await updateProduct(product);
      commit("updateProductMutations", response.data);
    },
    async deleteProduct({ commit }, productId) {
      await deleteProduct(productId);
      commit("deleteProductMutations", productId);
    },
    // get product by id category
    async fetchCategoryById({ state }, categoryId) {
      const category = state.categories.find((cat) => cat.id === categoryId);
      return category || null; // Return category if found
    },
    async fetchProductsByCategoryId({ commit }, categoryId) {
      const response = await getProductsByCategoryId(categoryId);
      return response.data; // Assuming the API returns a list of products
    },
    setPageSize({ commit, dispatch }, size) {
      commit("setPageSize", size);
      dispatch("fetchProducts"); // Fetch sản phẩm mới khi thay đổi số lượng sản phẩm mỗi trang
    },
    setCurrentPage({ commit, dispatch }, page) {
      commit("setCurrentPage", page);
      dispatch("fetchProducts"); // Fetch sản phẩm mới khi chuyển trang
    },
    filterProducts({ commit }, searchTerm) {
      commit("filterProductsMutations", searchTerm);
    },
    // lay sp render giao dien chinh
    async fetchAllProducts({ commit }) {
      const response = await getUserAllProducts(); // Gọi API để lấy tất cả sản phẩm
      commit("setAllProductMutations", response.data); // Truyền data trực tiếp
    },
    async fetchProductById({ commit }, productId) {
      const response = await getProductById(productId); 
      if (response && response.data) {
        return response.data; // Trả về dữ liệu sản phẩm
      }
      return {}; // Trả về một object rỗng nếu không có dữ liệu
    }
    
    
  },
  getters: {
    getProducts: (state) => state.filteredProducts,
    totalPages: (state) => Math.ceil(state.totalProducts / state.pageSize), // Tính tổng số trang
  },
};

export default product;
