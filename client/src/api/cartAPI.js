 import apiClient from "./instance";

// Thêm sản phẩm vào giỏ hàng
export const addCart = async (cartItem) => {
    const response = await apiClient.post('/carts', cartItem);
    return response.data;  
};

// Lấy tất cả giỏ hàng của người dùng
export const getAllCarts = async (userId) => {
  
    const response = await apiClient.get(`/carts/${userId}`);
    return response.data;  
};

// Cập nhật giỏ hàng
export const updateCarts = async (cartItem) => {
  
    const response = await apiClient.put(`/carts/update/${cartItem.id}`, cartItem);
    return response.data;  
};

// Xóa sản phẩm khỏi giỏ hàng
export const deleteCart = async (cartId) => {
  await apiClient.delete(`/carts/delete/${cartId}`);
};

