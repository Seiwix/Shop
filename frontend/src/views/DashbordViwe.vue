<template>
  <div>
    <SideNave />
    <ProductListDachboard :products="products" />
  </div>
</template>

<script>
import SideNave from "@/components/Dashboard/SideNave";
import ProductListDachboard from "@/components/Dashboard/ProductListDachboard";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
export default {
  name: "DashbordViwe",
  components: {
    SideNave,
    ProductListDachboard,
  },
  setup() {
    const store = useStore();

    const products = computed(() => store.state.products.products);

    onMounted(() => {
      store.dispatch("fetchProducts");
    });

    return {
      products,
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
}
</style>