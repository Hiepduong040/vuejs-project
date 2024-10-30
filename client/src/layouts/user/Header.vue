<template>
  <div id="header-wrap" class="bg-white shadow">
    <div class="top-content">
      <div class="container mx-auto py-4">
        <div class="flex justify-between">
          <div class="flex  space-x-4">
            <a href="#" class="text-xl text-blue-600 hover:text-blue-800">
              <i class="bx bxl-facebook"></i>
            </a>
            <a href="#" class="text-xl text-blue-600 hover:text-blue-800">
              <i class="bx bxl-twitter"></i>
            </a>
            <a href="#" class="text-xl text-blue-600 hover:text-blue-800">
              <i class="bx bxl-youtube"></i>
            </a>
            <a href="#" class="text-xl text-blue-600 hover:text-blue-800">
              <i class="bx bxl-linkedin"></i>
            </a>
          </div>
          <div class="flex space-x-4">
            <a
              href="#"
              class="flex items-center text-gray-600 hover:text-gray-800"
            >
              <i class="bx bx-user"></i><span class="ml-1">Account</span>
            </a>
            <a
              href="#"
              class="flex items-center text-gray-600 hover:text-gray-800"
            >
              <i class="bx bx-cart"></i><span class="ml-1">Cart: (0 $)</span>
            </a>
            <!-- <div class="relative">
              <button
                class="flex items-center mt-1.5 text-gray-600 hover:text-gray-800"
              >
                <i class="bx bx-search"></i>
              </button>
              <form class="absolute hidden group-hover:block">
                <input
                  class="border rounded px-2 py-1"
                  placeholder="Search"
                  type="search"
                />
              </form>
            </div> -->
            <SearchHomeInput class="mt-1.5"/>
          </div>
        </div>
      </div>
    </div>

    <header   id="header"
      :class="{ 'fixed top-0 left-0 w-full shadow-lg z-50': isFixed }"
      class="bg-white transition-all duration-300">
      <div class="container mx-auto py-6 flex justify-between items-center">
        <div class="main-logo ">
          <a href="#"><img class="h-12" src="https://book365.vn/bitrix/templates/book365-2021/images/edu-2021/logo_book365.png" alt="logo" /></a>
        </div>

        <nav id="navbar" class="flex-grow">
          <ul class="flex space-x-10 justify-center items-center">
            <li>
              <a href="#home" class="text-gray-600 hover:text-blue-600">Home</a>
            </li>
            <li class="relative group">
              <a href="#pages" class="text-gray-600 hover:text-blue-600"
                >Pages</a
              >
              <ul
                class="absolute left-0 hidden group-hover:block bg-white shadow"
              >
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100"
                    >Home</a
                  >
                </li>
                <li>
                  <a href="about.html" class="block px-4 py-2 hover:bg-gray-100"
                    >About</a
                  >
                </li>
                <li>
                  <a
                    href="styles.html"
                    class="block px-4 py-2 hover:bg-gray-100"
                    >Styles</a
                  >
                </li>
                <li>
                  <a href="blog.html" class="block px-4 py-2 hover:bg-gray-100"
                    >Blog</a
                  >
                </li>
                <li>
                  <a href="shop.html" class="block px-4 py-2 hover:bg-gray-100"
                    >Our Store</a
                  >
                </li>
                <li>
                  <a
                    href="contact.html"
                    class="block px-4 py-2 hover:bg-gray-100"
                    >Contact</a
                  >
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#featured-books"
                class="text-gray-600 hover:text-blue-600"
                >Featured</a
              >
            </li>
            <li>
              <a href="#popular-books" class="text-gray-600 hover:text-blue-600"
                >Popular</a
              >
            </li>
            <li>
              <a href="#special-offer" class="text-gray-600 hover:text-blue-600"
                >Offer</a
              >
            </li>
            <li>
              <a href="#latest-blog" class="text-gray-600 hover:text-blue-600"
                >Articles</a
              >
            </li>
            <li>
              <a href="#download-app" class="text-gray-600 hover:text-blue-600"
                >Download App</a
              >
            </li>
            <li>
              <a
                href="https://templatesjungle.gumroad.com/l/booksaw-free-html-bookstore-template"
                target="_blank"
                class="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-800"
                >Get PRO</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isFixed = ref(false);
const previousScroll = ref(0);

function handleScroll() {
  const currentScroll = window.pageYOffset;
  if (currentScroll > previousScroll.value && currentScroll > 40) {
    // Scrolling down and past a threshold
    console.log("currentScroll",currentScroll);
    console.log("previousScroll",previousScroll.value);
    
    isFixed.value = true;
  } else if (currentScroll < 41) {
    // Scrolling up
    isFixed.value = false;
    console.log("currentScroll",currentScroll);
    console.log("previousScroll",previousScroll.value);
  }
  previousScroll.value = currentScroll;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform: translateY(0);
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header:not(.fixed-header) {
  transform: translateY(-100%);
}
</style>
