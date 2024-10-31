<template>
  <div class="container mx-auto my-5">
    <h1 class="text-2xl mb-5">Giỏ Hàng Của Tôi</h1>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-2/3">
        <div class="card border shadow-none mb-6" v-for="(item, index) in products" :key="item.id">
          <div class="p-4">
            <div class="flex items-start border-b pb-3">
              <div class="mr-4">
                <input type="checkbox" v-model="selectedItems" :value="item.id" />
              </div>
              <div class="mr-4">
                <img :src="item.image" alt="" class="h-20 w-20 rounded-lg" />
              </div>
              <div class="flex-grow overflow-hidden">
                <div>
                  <h5 class="truncate text-lg">
                    <a :href="item.link" class="text-black">{{ item.product_name }}</a>
                  </h5>
                  <p class="text-gray-500 mb-0">Giá: {{ item.unit_price }} VNĐ</p>
                  <p class="mb-0 mt-1">Số lượng: <span class="font-medium">{{ item.quantity }}</span></p>
                </div>
              </div>
              <div class="ml-2">
                <ul class="list-inline mb-0 text-lg">
                  <li class="inline-block">
                    <button @click="removeItem(index)" class="text-gray-500 px-1">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </li>
                  <li class="inline-block">
                    <button @click="editItem(index)" class="text-gray-500 px-1">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
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
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
            <label class="ml-2 text-gray-500">Chọn Tất Cả</label>
            <a href="ecommerce-products.html" class="btn btn-link text-gray-500 ml-4">
              <i class="mdi mdi-arrow-left mr-1"></i> Tiếp Tục Mua Sắm
            </a>
          </div>
          <div>
            <a href="ecommerce-checkout.html" class="btn btn-success">
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
import apiClient from "@/api/instance"; // Đảm bảo đường dẫn đúng

const products = ref([]);
const selectedItems = ref([]);
const selectAll = ref(false);

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

const removeItem = (index) => {
  products.value.splice(index, 1);
  updateSelectedItems();
};

const editItem = (index) => {
  // Thực hiện hành động chỉnh sửa sản phẩm tại index
  console.log('Chỉnh sửa sản phẩm:', products.value[index]);
};

const updateSelectedItems = () => {
  selectedItems.value = selectedItems.value.filter(item => products.value.some(product => product.id === item));
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = products.value.map(product => product.id);
  } else {
    selectedItems.value = [];
  }
};

const calculateTotal = () => {
  return products.value.reduce((acc, item) => {
    return acc + (item.unit_price * item.quantity);
  }, 0);
};

const calculateFinalTotal = () => {
  const discount = 0;
  const shipping = 0;
  const tax = 0;
  return calculateTotal() - discount + shipping + tax;
};

onMounted(() => {
  fetchUserProducts();
});
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

h2 {
  margin: 0;
}

p {
  margin: 5px 0;
}
</style>

  \