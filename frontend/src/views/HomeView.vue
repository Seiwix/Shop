<template>
  <div class="home">
    <div v-if="loading"></div>
    <div v-else>
      <ProductList :products="productsWithRatings" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import ProductList from "@/components/ProductList.vue";


    const store = useStore();
    const loading = ref(true);
    const products = computed(() => store.state.products.products);

    const productsWithRatings = computed(() => {
      return products.value.map((product) => ({
        ...product,
        averageStar: store.getters.getAverageStar(product.id),
      }));
    });

    onMounted(async () => {
      try {
        await store.dispatch("fetchProducts");

        const productFetches = products.value.map((product) =>
          store.dispatch("fetchAverageStar", product.id)
        );

        await Promise.all(productFetches);
        loading.value = false;
      } catch (error) {
        console.error("Error fetching products or ratings:", error);
        loading.value = false;
      }
    });

</script>

<style scoped>
.home {
  margin-top: 150px;
  background-color: white;
}
</style>
