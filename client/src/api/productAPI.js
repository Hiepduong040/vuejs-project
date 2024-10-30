// api/productAPI.js
import apiClient from './instance';

export const getAllProducts = async (page = 1, limit = 5) => {
  return await apiClient.get(`/products?_page=${page}&_limit=${limit}`);
};
export const getUserAllProducts = async () => {
  const response = await apiClient.get(`/products`);
  console.log('All products response:', response.data); // Log để kiểm tra dữ liệu trả về
  return response;
};
export const getProductById = async (productId) => {
  return await apiClient.get(`/products/${productId}`);
};


export const deleteProduct = async (productId) => {
  return await apiClient.delete(`/products/${productId}`);
};

export const updateProduct = async (product) => {
  return await apiClient.put(`/products/${product.id}`, product);
};

export const addProduct = async (product) => {
  return await apiClient.post('/products', product);
};

