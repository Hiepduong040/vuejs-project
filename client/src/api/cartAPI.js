// import apiClient from "./instance";

// // Thêm sản phẩm vào giỏ hàng
// export const addCart = async (cartItem) => {
//     const response = await apiClient.post('/carts', cartItem);
//     return response.data; // Trả về dữ liệu giỏ hàng đã cập nhật
// };

// // Lấy tất cả giỏ hàng của người dùng
// export const getAllCarts = async () => {
  
//     const response = await apiClient.get(`/carts`);
//     return response.data; // Trả về danh sách giỏ hàng
// };

// // Cập nhật giỏ hàng
// export const updateCarts = async (cartItem) => {
  
//     const response = await apiClient.put(`/carts/update/${cartItem.id}`, cartItem);
//     return response.data; // Trả về dữ liệu giỏ hàng đã cập nhật
// };

// // Xóa sản phẩm khỏi giỏ hàng
// export const deleteCart = async (cartId) => {
//   await apiClient.delete(`/carts/delete/${cartId}`);
// };
// // Lấy giỏ hàng của người dùng theo userId
// export const getCartByUserId = async (userId) => {
//     const response = await apiClient.get(`/carts/user/${userId}`);
//     return response.data; // Trả về danh sách giỏ hàng
// }; ************************ chưa đổi cấu trúc - sai


import apiClient from "./instance";

// Thêm sản phẩm vào giỏ hàng
export const addCart = async (cartItem) => {
    const response = await apiClient.post('/carts', cartItem);
    return response.data; // Trả về dữ liệu giỏ hàng đã cập nhật
};

// Lấy tất cả giỏ hàng của người dùng
export const getAllCarts = async (userId) => {
  
    const response = await apiClient.get(`/carts/${userId}`);
    return response.data; // Trả về danh sách giỏ hàng
};

// Cập nhật giỏ hàng
export const updateCarts = async (cartItem) => {
  
    const response = await apiClient.put(`/carts/update/${cartItem.id}`, cartItem);
    return response.data; // Trả về dữ liệu giỏ hàng đã cập nhật
};

// Xóa sản phẩm khỏi giỏ hàng
export const deleteCart = async (cartId) => {
  await apiClient.delete(`/carts/delete/${cartId}`);
};

