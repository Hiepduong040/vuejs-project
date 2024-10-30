 <template>
    <section id="billboard" class="relative bg-gray-100 py-8 ">
      <div class="container mx-auto px-4 relative">
   
        <div class="flex transition-transform duration-700 ease-in-out " :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(slide, index) in slides" :key="index" class="slider-item relative w-full flex-shrink-0 px-2">
            <img :src="slide.image" :alt="slide.title" class="w-full h-96 object-cover rounded-lg">
          </div>
        </div>
  
    
        <button @click="prevSlide" class="prev  absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-1  rounded-full shadow hover:bg-gray-200">
          <i class="bx bx-chevron-left text-3xl text-gray-800"></i>
        </button>
        <button @click="nextSlide" class="next  absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-1  rounded-full shadow hover:bg-gray-200">
          <i class="bx bx-chevron-right text-3xl text-gray-800"></i>
        </button>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const slides = ref([
  {
    title: "Life of the Wild",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet.",
    image: "https://pos.nvncdn.com/fd5775-40602/bn/20240313_owK5NofE.gif"
  },
  {
    title: "Birds gonna be Happy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet.",
    image: "https://pos.nvncdn.com/fd5775-40602/bn/20240313_OdsmQRmo.gif"
  },
  {
    title: "Explore the Forest",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet.",
    image: "https://pos.nvncdn.com/fd5775-40602/bn/20240318_SiiSzAO6.gif"
  }
]);
  const currentIndex = ref(0);
  
  function nextSlide() {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  }
  
  function prevSlide() {
    currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  }
  </script>
  
  <style scoped>
  .slider-item {
    padding: 0 10px; /* Add spacing on each side of the slide */
  }
  
  .slider-item img {
    width: 100%;
    height: 600px;
    object-fit: cover;
  }
  </style>
 