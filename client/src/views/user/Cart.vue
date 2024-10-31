<template>
  <div class="container mx-auto my-5">
    <h1 class="text-2xl mb-5">Giỏ Hàng Của Tôi</h1>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-2/3">
        <div class="card border shadow-none mb-6" v-for="(item) in products" :key="item.id">
          <div class="p-4">
            <div class="flex items-start border-b pb-3">
              <div class="mr-4">
                <img :src="item.image" alt="" class="h-20 w-20 rounded-lg" />
              </div>
              <div class="flex-grow overflow-hidden">
                <div>
                  <h5 class="truncate text-lg">
                    <a :href="item.link" class="text-black">{{ item.product_name }}</a>
                  </h5>
                  <p class="text-gray-500 mb-0">Giá: {{ item.unit_price }} VNĐ</p>
                  <p class="mb-0 mt-1">
                    Số lượng: 
                    <span v-if="editingItem !== item.id">
                      {{ item.quantity }}
                    </span>
                    <span v-else>
                      <input type="number" v-model="item.quantity" min="1" />
                      <button @click="updateProduct(item)" class="text-green-500">Update</button>
                      <button @click="cancelEdit(item)" class="text-red-500">Cancel</button>
                    </span>
                  </p>
                </div>
              </div>
              <div class="ml-2">
                <ul class="list-inline mb-0 text-lg">
                  <li class="inline-block">
                    <button @click="editItem(item)" class="text-blue-500">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button @click="confirmRemoveItem(item.id)" class="text-gray-500 px-1">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div class="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p class="text-gray-500 mb-2">Tổng</p>
                  <h5 class="mb-0 mt-2">{{ (item.unit_price * item.quantity).toLocaleString() }} VNĐ</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between my-4">
          <div class="flex items-center">
            <button @click="confirmRemoveAllItems" class="btn btn-danger ml-4">Xóa tất cả</button>
            <a href="/" class="btn btn-link text-gray-500 ml-4">
              <i class="mdi mdi-arrow-left mr-1"></i> Tiếp Tục Mua Sắm
            </a>
          </div>
          <div>
            <a href="/user/payment" class="btn btn-success">
              <i class="mdi mdi-cart-outline mr-1"></i> Thanh Toán
            </a>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/3">
        <div class="mt-5">
          <div class="card border shadow-none">
            <div class="bg-transparent border-b py-3 px-4">
              <h5 class="text-lg mb-0">Tóm Tắt Đơn Hàng</h5>
            </div>
            <div class="p-4 pt-2">
              <div class="overflow-x-auto">
                <table class="table-auto w-full">
                  <tbody>
                    <tr>
                      <td>Tổng :</td>
                      <td class="text-right">{{ calculateTotal().toLocaleString() }} VNĐ</td>
                    </tr>
                    <tr>
                      <td>Giảm Giá :</td>
                      <td class="text-right">0 VNĐ</td>
                    </tr>
                    <tr>
                      <td>Phí Vận Chuyển :</td>
                      <td class="text-right">0 VNĐ</td>
                    </tr>
                    <tr>
                      <td>Thuế Ước Tính :</td>
                      <td class="text-right">0 VNĐ</td>
                    </tr>
                    <tr class="bg-gray-100">
                      <th>Tổng Cộng :</th>
                      <td class="text-right">
                        <span class="font-bold">{{ calculateFinalTotal().toLocaleString() }} VNĐ</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from "@/api/instance";
import Swal from 'sweetalert2';

const products = ref([]);
const editingItem = ref(null);
const originalQuantities = ref({});

const fetchUserProducts = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  if (userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      products.value = response.data.product;
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  } else {
    console.warn('Không tìm thấy userId trong Local Storage');
  }
};

const confirmRemoveItem = async (id) => {
  const result = await Swal.fire({
    title: 'Xác nhận xóa',
    text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có',
    cancelButtonText: 'Không'
  });

  if (result.isConfirmed) {
    await removeItem(id);
  }
};

const confirmRemoveAllItems = async () => {
  const result = await Swal.fire({
    title: 'Xác nhận xóa',
    text: "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có',
    cancelButtonText: 'Không'
  });

  if (result.isConfirmed) {
    await removeAllItems();
  }
};

const removeItem = async (id) => {
  const productIndex = products.value.findIndex(item => item.id === id);
  if (productIndex !== -1) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    await apiClient.patch(`/users/${userId}`, {
      product: products.value.filter(item => item.id !== id)
    });

    products.value.splice(productIndex, 1);
    Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa.', 'success');
  }
};

const removeAllItems = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  await apiClient.patch(`/users/${userId}`, {
    product: []
  });

  products.value = [];
  Swal.fire('Đã xóa!', 'Tất cả sản phẩm đã được xóa.', 'success');
};

const editItem = (item) => {
  editingItem.value = item.id;
  originalQuantities.value[item.id] = item.quantity;
};

const updateProduct = async (item) => {
  const result = await Swal.fire({
    title: 'Xác nhận cập nhật',
    text: "Bạn có chắc chắn muốn cập nhật số lượng sản phẩm không?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có',
    cancelButtonText: 'Không'
  });

  if (result.isConfirmed) {
    if (item.quantity <= 0) {
      item.quantity = 1;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    await apiClient.patch(`/users/${userId}`, {
      product: products.value
    });

    editingItem.value = null;
    Swal.fire('Cập nhật thành công!', 'Số lượng sản phẩm đã được cập nhật.', 'success');
  } else {
    item.quantity = originalQuantities.value[item.id];
  }
};

const cancelEdit = (item) => {
  editingItem.value = null;
  item.quantity = originalQuantities.value[item.id];
};

const calculateTotal = () => {
  return products.value.reduce((acc, item) => {
    return acc + (item.unit_price * item.quantity);
  }, 0);
};

const calculateFinalTotal = () => {
  return calculateTotal();
};

onMounted(() => {
  fetchUserProducts();
});
</script>
