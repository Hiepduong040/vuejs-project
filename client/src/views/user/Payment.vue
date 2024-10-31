<template>
  <div class="container mx-auto my-5 bg-gray-100">
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div class="col-span-4"> 
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="p-4">
            <ol class="activity-checkout list-none mb-0 mt-3">
              <li class="checkout-item relative pb-6 pl-6 border-l-2 border-gray-200">
                <div class="absolute -left-4 top-0 p-1 bg-blue-500 rounded-full">
                  <i class="bx bxs-receipt text-white text-2xl"></i>
                </div>
                <h5 class="font-semibold text-lg mb-1">Billing Info</h5>
                <p class="text-gray-600 mb-4">Thông tin hóa đơn của bạn</p>
                <form @submit.prevent="submitBillingInfo">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label class="block mb-1" for="billing-name">Name</label>
                      <input type="text" v-model="billingInfo.name" class="form-input w-full" id="billing-name" placeholder="Enter name" />
                    </div>
                    <div>
                      <label class="block mb-1" for="billing-email-address">Email Address</label>
                      <input type="email" v-model="billingInfo.email" class="form-input w-full" id="billing-email-address" placeholder="Enter email" />
                    </div>
                    <div>
                      <label class="block mb-1" for="billing-phone">Phone</label>
                      <input type="text" v-model="billingInfo.phone" class="form-input w-full" id="billing-phone" placeholder="Enter Phone no." />
                    </div>
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1" for="billing-address">Address</label>
                    <textarea v-model="billingInfo.address" class="form-textarea w-full" id="billing-address" rows="3" placeholder="Enter full address"></textarea>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label class="block mb-1">Country</label>
                      <select v-model="billingInfo.country" class="form-select w-full">
                        <option value="0">Select Country</option>
                        <option value="VN">Viet Nam</option>
                        <option value="US">United States</option>
                        <option value="RU">Russia</option>
                      </select>
                    </div>
                    <div>
                      <label class="block mb-1" for="billing-city">City</label>
                      <input type="text" v-model="billingInfo.city" class="form-input w-full" id="billing-city" placeholder="Enter City" />
                    </div>
                    <div>
                      <label class="block mb-1" for="zip-code">Zip / Postal code</label>
                      <input type="text" v-model="billingInfo.zip" class="form-input w-full" id="zip-code" placeholder="Enter Postal code" />
                    </div>
                  </div>
                </form>
              </li>
              <li class="checkout-item relative pb-6 pl-6 border-l-2 border-gray-200">
                <div class="absolute -left-4 top-0 p-1 bg-blue-500 rounded-full">
                  <i class="bx bxs-wallet-alt text-white text-2xl"></i>
                </div>
                <h5 class="font-semibold text-lg mb-1">Payment Info</h5>
                <p class="text-gray-600 mb-4">Thông tin thanh toán của bạn</p>
                <h5 class="font-medium text-lg mb-3">Payment method:</h5>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="card-radio-label">
                      <input type="radio" v-model="paymentMethod" value="credit" class="hidden" />
                      <span class="block py-3 w-64 text-center bg-white border-2 border-gray-200 rounded-lg">
                        <i class="bx bx-credit-card d-block h2 mb-3"></i>
                        Credit / Debit Card
                      </span>
                    </label>
                  </div>
                  <div>
                    <label class="card-radio-label">
                      <input type="radio" v-model="paymentMethod" value="paypal" class="hidden" />
                      <span class="block py-3 text-center bg-white w-64 border-2 border-gray-200 rounded-lg">
                        <i class="bx bxl-paypal d-block h2 mb-3"></i>
                        Paypal
                      </span>
                    </label>
                  </div>
                  <div>
                    <label class="card-radio-label">
                      <input type="radio" v-model="paymentMethod" value="cod" class="hidden" checked />
                      <span class="block w-64 py-3 text-center bg-white border-2 border-gray-200 rounded-lg">
                        <i class="bx bx-money d-block h2 mb-3"></i>
                        Cash on Delivery
                      </span>
                    </label>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div class="flex justify-between my-4">
          <a href="/" class="text-gray-600">
            <i class="mdi mdi-arrow-left mr-1"></i> Continue Shopping
          </a>
          <button @click="proceedToPayment" class="bg-green-500 text-white py-2 px-4 rounded">
            <i class="mdi mdi-cart-outline mr-1"></i> Thanh toán
          </button>
        </div>
      </div>

      <div class="col-span-2"> 
        <div class="bg-white shadow rounded-lg">
          <div class="p-4 bg-gray-200 mb-3">
            <h5 class="font-semibold">Order Summary <span class="float-right">#MN0124</span></h5>
          </div>
          <div class="table-responsive">
            <table class="table-auto w-full">
              <thead>
                <tr>
                  <th class="py-2">Product</th>
                  <th class="py-2">Product Desc</th>
                  <th class="py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in products" :key="item.id">
                  <td class="py-2">
                    <img :src="item.image" alt="product-img" class="h-20 w-20 object-cover rounded" />
                  </td>
                  <td>
                    <h5 class="text-lg truncate"><a :href="item.link" class="text-gray-800">{{ item.product_name }}</a></h5>
                    <p class="text-gray-600">{{ item.unit_price.toLocaleString() }} VNĐ x {{ item.quantity }}</p>
                  </td>
                  <td>{{ (item.unit_price * item.quantity).toLocaleString() }} VNĐ</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right"><h5>Sub Total:</h5></td>
                  <td>{{ calculateTotal().toLocaleString() }} VNĐ</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right"><h5>Discount:</h5></td>
                  <td>0 VNĐ</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right"><h5>Shipping Charge:</h5></td>
                  <td>25 VNĐ</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right"><h5>Estimated Tax:</h5></td>
                  <td>18.20 VNĐ</td>
                </tr>
                <tr class="bg-gray-200">
                  <td colspan="2" class="text-right"><h5>Total:</h5></td>
                  <td>{{ calculateFinalTotal().toLocaleString() }} VNĐ</td>
                </tr>
              </tbody>
            </table>
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
const billingInfo = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  country: '',
  city: '',
  zip: ''
});
const paymentMethod = ref('cod');

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

const calculateTotal = () => {
  return products.value.reduce((acc, item) => {
    return acc + (item.unit_price * item.quantity);
  }, 0);
};

const calculateFinalTotal = () => {
  const subtotal = calculateTotal();
  const discount = 0; 
  const shippingCharge = 25; 
  const estimatedTax = 18.20; 
  return subtotal - discount + shippingCharge + estimatedTax;
};

const proceedToPayment = () => {
  console.log('Proceeding to payment with the following info:', billingInfo.value, paymentMethod.value);
  
  Swal.fire({
    title: 'Đặt hàng thành công!',
    text: 'Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.',
    icon: 'success',
    confirmButtonText: 'Quay về trang chủ'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = '/';  
    }
  });
};

onMounted(() => {
  fetchUserProducts();
});
</script>

<style scoped>
</style>
