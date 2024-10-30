   <template>
  <div class="container mx-auto p-4 bg-gray-200 mt-5">
    <section class="bg-white shadow-md rounded-lg p-4">
      <div class="flex">
        <!-- Hình ảnh sản phẩm chính -->
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

        <!-- Chi tiết sản phẩm -->
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
              placeholder="1"
              class="form-control w-24 p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            <i class="fa fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const product = ref({});
const selectedImage = ref("");

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

// Thay đổi hình ảnh lớn khi nhấp vào hình thu nhỏ
const changeImage = (img) => {
  selectedImage.value = img;
};
</script>
  
  <style scoped>
/* Thêm các kiểu dáng nếu cần */
</style>
  