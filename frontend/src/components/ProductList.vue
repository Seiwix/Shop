<template>
  <main>
    <article v-for="product in products" :key="product.id">
      <h2>{{ product.name }}</h2>
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <section>
        <p class="product-description">{{ product.description }}</p>
      </section>
      <div class="rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        <a class="price"></a>
      </div>
      <a>{{ product.price }}€</a>
      <div class="btn-box">
        <button class="btn2"><router-link :to="'/product/' + product.id">Details anzeigen</router-link></button>
        <button class="btn" @click="addToCart(product)">Zum Warenkorb hinzufügen</button>
      </div>
    </article>
  </main>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: "ProductList",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    
    const addToCart = (product) => {
      const { id, name, price, imageUrl } = product;
      const cartItem = {
        id,
        name,
        price,
        imageUrl,
        quantity: 1, 
      };
      store.dispatch("addCartItem", cartItem);
    };
    return {
      addToCart
    };
  }
};
</script>
<style scoped lang="scss">
main { 
        max-width: 100%;
        margin-right: 50px;
        margin-left: 30px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 50px;
 }
  article {
    border: 1px solid #ccc;
    background-color: gray;
    padding: 10px;
    width: auto;
    margin: auto;
    min-width: 300px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 10%;

    h2 {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 5px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border: blue 1px solid;
    }

    .rating {
      color: gold;

      > a {
        color: black;
      }
    }

    > a {
      margin-top: 20px;
      font-size: 25px;
      margin-bottom: 10px;
    }

    .btn-box {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .btn {
        width: 100px;
        background-color: goldenrod;
        font-size: 15px;
      }
      .btn2 {
        width: 100px;
        background-color: gray;
        font-size: 15px;
      }
    }
  }
@media (max-width: 768px) {
  main {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>