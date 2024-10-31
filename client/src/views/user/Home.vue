<template>
  <div>
    <Categories @category-selected="goToCategory" />
    <Product/>
  </div>
</template>

<script setup>
import Categories from './Categories.vue';
import { useRouter } from 'vue-router';
import Product from './Product.vue';

const router = useRouter();

const goToCategory = (categoryId) => {
  router.push({ name: 'category-detail', params: { id: categoryId } });
};
</script>

<style>
</style>
