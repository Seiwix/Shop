<template>
  <div class="ProductView">
    <template v-if="singleProduct">
      <SingleProduct :product="singleProduct" />
    </template>
    <CommentProduct />
    <CommentList :comment="comments"/>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SingleProduct from "@/components/SingelProduct.vue";
import CommentProduct from "@/components/CommentProduct.vue";
import CommentList from "@/components/CommentList";

export default {
  name: "ProductView",
  components: {
    SingleProduct,
    CommentProduct,
    CommentList
  },
  setup() {
    const store = useStore();
    const singleProduct = ref(null);
    const comments = ref([]);
    const router = useRouter();

    const fetchProductAndComments = async () => {
      try {
        const productId = router.currentRoute.value.params.id;
        await store.dispatch("fetchSingleProduct", productId);
        await store.dispatch("fetchComments", productId);
        singleProduct.value = store.getters.getSingleProduct;
        comments.value = store.getters.getComments;
      } catch (error) {
        console.error('Error fetching product and comments:', error);
      }
    };

    fetchProductAndComments();

    watch(() => router.currentRoute.value, () => {
      fetchProductAndComments();
    });

    return {
      singleProduct,
      comments
    };
  },
}
</script>
<style scoped>
.ProductView{
    margin-top: 200px;
}
</style>