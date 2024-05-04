<template>
  <div>
    <section>
      <article class="productImg">
        <img :src="product.imageUrl" :alt="product.name" />
      </article>
      <article class="productDetails">
        <h2>{{ product.name }}</h2>
        <div class="rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>
          <a>(200)</a>
        </div>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
        <label for="anzahl">Verfügbare Anzahl: {{ product.stockQuantity }}</label>
        <select class="quantity" name="quantity" v-model="quantity">
          <option v-for="qty in product.stockQuantity" :key="qty" :value="qty">{{ qty }}</option>
        </select>
        <button @click="addToCart">In den Warenkorb</button>
      </article>
    </section>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name:"SingelProduct",
  // property kommt von der View (ProductView  und enthält ein einzelnes Produkt welches im Vux Store mit getsingleProduct aufgrufen wird)
  props: [ 'product'],
  setup(props) {
    // Mit useStore  wird der VueX store aufgerufen  Ref ist in vue3 wie in vue2 in der Otional  api  Data , dies wird  verwendet um startwerte oder werte 
    const store = useStore();
    const quantity = ref(1);

    const addToCart = () => {
      const { id, name, price, imageUrl } = props.product;
      const cartItem = {
        id,
        name,
        price,
        imageUrl,
        quantity: quantity.value
      };
      store.dispatch("addCartItem", cartItem);
    };

    return {
      quantity,
      addToCart
    };
  },
};
</script>
<style scoped lang="scss">
section {
  margin-top: 3000px;
  margin: 100px 100px 100px 100px;
  display: grid;

  grid-template-areas:
    "img details"
    "reviews reviews";
  grid-template-columns: 50% 50%;
  gap: 100px;

  .productImg {
    grid-area: img;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }

  .productDetails {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    grid-area: details;

    .rating {
      color: gold;
    }

    .quantity {
      display: flex;
      flex-direction: row;
      max-width: 40px;
    }
  }
}
</style>