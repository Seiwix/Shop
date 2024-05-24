<template>
  <div class="ProductView">
    <template v-if="isLoading"> </template>
    <template v-else>
      <template v-if="singleProduct">
        <SingleProduct :product="singleProduct" />
      </template>
      <CommentProduct
        @commentAdded="fetchComments"
        :fetchComments="fetchComments"
      />
      <CommentList :comment="comments" />
    </template>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SingleProduct from "@/components/SingelProduct.vue";
import CommentProduct from "@/components/CommentProduct.vue";
import CommentList from "@/components/CommentList";

export default {
  name: "ProductView",
  components: {
    SingleProduct,
    CommentProduct,
    CommentList,
  },
  setup() {
    const store = useStore();
    const singleProduct = ref(null);
    const comments = ref([]);
    const router = useRouter();
    const isLoading = ref(true);

    const fetchProductAndComments = async () => {
      try {
        const productId = router.currentRoute.value.params.id;
        await store.dispatch("fetchSingleProduct", productId);
        await store.dispatch("fetchComments", productId);
        singleProduct.value = store.getters.getSingleProduct;
        comments.value = store.getters.getComments;
      } catch (error) {
        console.error("Error fetching product and comments:", error);
      } finally {
        isLoading.value = false; // Set isLoading to false when data fetching is completed
      }
    };

    fetchProductAndComments();

    watch(
      () => router.currentRoute.value,
      () => {
        isLoading.value = true; // Set isLoading to true when route changes
        fetchProductAndComments();
      }
    );

    const fetchComments = async () => {
      const productId = router.currentRoute.value.params.id;
      await store.dispatch("fetchComments", productId);
      comments.value = store.getters.getComments;
    };

    return {
      singleProduct,
      comments,
      fetchComments,
      isLoading,
    };
  },
};
</script>

<style scoped>
.ProductView {
  margin-top: 200px;
}
</style>