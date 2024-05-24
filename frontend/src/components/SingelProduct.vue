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
        <label for="anzahl"
          >Verfügbare Anzahl: {{ product.stockQuantity }}</label
        >
        <select class="quantity" name="quantity" v-model="selectedQuantity">
          <option v-for="qty in availableQuantities" :key="qty" :value="qty">
            {{ qty }}
          </option>
        </select>
        <button @click="addToCart">In den Warenkorb</button>
        <p v-if="selectedQuantity > product.stockQuantity">
          Die gewählte Menge überschreitet die verfügbare Menge!
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "SingelProduct",
  props: ["product"],
  setup(props) {
    const store = useStore();
    const selectedQuantity = ref(1);
    const availableQuantities = Array.from(
      { length: props.product.stockQuantity },
      (_, index) => index + 1
    );

    const addToCart = () => {
      if (selectedQuantity.value <= props.product.stockQuantity) {
        const { id, name, price, imageUrl, stockQuantity } = props.product;
        const cartItem = {
          id,
          name,
          price,
          imageUrl,
          quantity: selectedQuantity.value,
          stockQuantity, // ist die verfügbare Menge des Produktes, dass der Korb nicht mehr Produkte hat als überhaupt im Lager sind
        };
        store.dispatch("addCartItem", cartItem);
      } else {
        console.log("Die gewählte Menge  ist nicht verfügbar");
      }
    };

    return {
      selectedQuantity,
      addToCart,
      availableQuantities,
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