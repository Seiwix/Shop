<template>
  <div class="home">
    <ProductList :products="products"/>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductList from '@/components/ProductList.vue';

export default {
  name: 'HomeView',
  components: {
    ProductList
  },
  setup() {
    const store = useStore();
    
    
    const products = computed(() => store.state.products.products);

    onMounted(() => {
      store.dispatch('fetchProducts');
    });

    return {
      products
    };
  }
};
</script>

<style scoped>
.home {
  margin-top: 150px;
  background-color: #E3E6E6;
}
</style>
<style scoped >
.home {
  margin-top: 150px; 
  background-color: #E3E6E6;
}

</style>
