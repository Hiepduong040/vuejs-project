<template>
    <div class="carousel relative w-full h-[800px]">
      <img :src="currentImage" alt="Carousel Image" class="w-full h-[800px] object-cover" />
  
      <button
        @click="prevSlide"
        class="prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        <i class="bx bx-chevron-left text-3xl text-gray-800"></i>
      </button>
      <button
        @click="nextSlide"
        class="next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        <i class="bx bx-chevron-right text-3xl text-gray-800"></i>
      </button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    setup() {
      const images = [
        'https://pos.nvncdn.com/fd5775-40602/bn/20240313_owK5NofE.gif',
        'https://pos.nvncdn.com/fd5775-40602/bn/20240313_OdsmQRmo.gif',
        'https://pos.nvncdn.com/fd5775-40602/bn/20240318_SiiSzAO6.gif'
      ];
      const currentIndex = ref(0);
      const currentImage = ref(images[currentIndex.value]);
      let interval;
  
      const startCarousel = () => {
        interval = setInterval(() => {
          currentIndex.value = (currentIndex.value + 1) % images.length;
          currentImage.value = images[currentIndex.value];
        }, 5000);
      };
  
      const stopCarousel = () => {
        clearInterval(interval);
      };
  
      const nextSlide = () => {
        currentIndex.value = (currentIndex.value + 1) % images.length;
        currentImage.value = images[currentIndex.value];
      };
  
      const prevSlide = () => {
        currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
        currentImage.value = images[currentIndex.value];
      };
  
      onMounted(() => {
        startCarousel();
      });
  
      onUnmounted(() => {
        stopCarousel();
      });
  
      return {
        currentImage,
        nextSlide,
        prevSlide
      };
    }
  };
  </script>
  
  <style scoped>
  .carousel {
    @apply w-full h-[800px] overflow-hidden;
  }
  
  .carousel img {
    @apply w-full h-[800px] object-cover;
  }
  </style> 


