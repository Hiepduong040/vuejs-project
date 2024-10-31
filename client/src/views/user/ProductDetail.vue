  <template>
    <div class="container mx-auto p-4 bg-gray-200 mt-5">
      <section class="bg-white shadow-md rounded-lg p-4">
        <div class="flex">
          <div class="w-1/2">
            <div class="relative">
              <img
                v-if="product.image && product.image.length > 0"
                :src="selectedImage"
                :alt="product.product_name || 'Product Image'"
                class="w-full h-80 object-cover rounded-lg"
              />
              <p v-else class="text-gray-500 text-center">No image available</p>
            </div>
            <div class="flex space-x-2 mt-2">
              <a
                v-for="(img, index) in product.image || thumbnailImages"
                :key="index"
                @click="changeImage(img)"
              >
                <img
                  :src="img"
                  alt=""
                  class="w-24 h-20 object-cover rounded border border-gray-300 cursor-pointer"
                />
              </a>
            </div>
          </div>
  
          <div class="w-1/2 pl-4">
            <h4 class="text-xl font-bold mb-2">
              <a href="#" class="text-gray-800">{{
                product.product_name || "Product Name"
              }}</a>
            </h4>
            <p class="text-gray-700 mb-4">
              {{ product.description || "Product description goes here." }}
            </p>
  
            <div class="border-t border-b border-gray-300 py-2 mb-4">
              <span class="text-gray-700"
                ><strong>Chính sách ưu đãi:</strong></span
              >
              <span class="text-gray-600">
                <a
                  v-for="(category, index) in product.categories"
                  :key="index"
                  class="text-blue-600"
                  href="#"
                  >{{ category }}</a
                >
              </span>
              <span class="text-gray-700"></span>
              <span class="text-gray-600 block mt-2">
                <i class="fas fa-clock mr-1"></i> Thời gian giao hàng: Giao nhanh và uy tín <br>
                <i class="fas fa-exchange-alt mr-1"></i> Chính sách đổi trả: Đổi trả miễn phí toàn quốc <br>
                <i class="fas fa-users mr-1"></i> Chính sách khách sỉ: Ưu đãi khi mua số lượng lớn
              </span>
              </div>
            <div class="mb-4">
              <strong>Price:</strong>
              <span
                v-if="product.old_price"
                class="line-through text-gray-500 ml-2"
                >{{ product.old_price }}</span
              >
              <span class="text-red-600 font-semibold ml-2">{{
                product.unit_price
                  ? `${product.unit_price} VND`
                  : "Price Not Available"
              }}</span>
            </div>
  
            <div class="mb-4">
              <label class="block mb-1">Quantity</label>
              <input
                type="number"
                v-model="quantity"
                  min="1"
                placeholder="1"
                class="form-control w-24 p-2 border border-gray-300 rounded"
              />
            </div>
  
            <div class=" flex gap-3">
              <button  @click="addToCart"
              class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              <i class="fa fa-shopping-cart"></i> Add to Cart
            </button>
            <button  @click="gotoCart"
              class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              <i class="fa fa-shopping-cart"></i> Payment
            </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
    
    <script setup>
  import { ref, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRoute, useRouter } from "vue-router";
  import Swal from "sweetalert2";
  const store = useStore();
  const route = useRoute();
  const product = ref({});
  const selectedImage = ref("");
  const quantity = ref(1);
  const router = useRouter();
  // Hình ảnh dự phòng nếu không có hình ảnh
  const thumbnailImages = [
    "https://www.bootdey.com/image/115x100/87CEFA/000000",
    "https://www.bootdey.com/image/115x100/FF7F50/000000",
    "https://www.bootdey.com/image/115x100/20B2AA/000000",
    "https://www.bootdey.com/image/120x100/20B2AA/000000",
  ];
  
  // Lấy chi tiết sản phẩm khi component được gắn vào
  onMounted(async () => {
    const productId = route.params.productId;
    product.value = await store.dispatch("fetchProductById", productId);
    selectedImage.value = product.value.image[0] || ""; // Đặt hình ảnh đầu tiên là hình ảnh lớn
    console.log("Fetched product:", product.value); // Kiểm tra dữ liệu sản phẩm
  });
  const gotoCart = ()=>{
    router.push("/user/cart");
  }
  const addToCart = async () => {
  const productToAdd = {
    id: product.value.id,
    product_name: product.value.product_name,
    unit_price: product.value.unit_price,
    quantity: quantity.value, // Sử dụng giá trị quantity từ input
    image: product.value.image,
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  if (userId) {
    try {
      await store.dispatch("addProductToUser", { userId, product: productToAdd });
      store.dispatch("addNewCart", productToAdd);
    } catch (error) {
      console.error("Error adding product to user:", error);
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Vui lòng đăng nhập!',
      text: 'Bạn cần đăng nhập để mua hàng!',
      confirmButtonText: 'OK',
    });
    return;
  }
};

  // Thay đổi hình ảnh lớn khi nhấp vào hình thu nhỏ
  const changeImage = (img) => {
    selectedImage.value = img;
  };
  </script>
    
    <style scoped>
  /* Thêm các kiểu dáng nếu cần */
  </style>
      