<template>
  <main>
    <article v-for="product in products" :key="product.id">
      <router-link class="rout" :to="'/product/' + product.id">
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="product-image"
        />
        <h2>{{ product.name }}</h2>
        <section>
          <p class="product-description">
            {{ shortText(product.description) }}
          </p>
          <router-link
            v-if="isTextShorted(product.description)"
            :to="'/product/' + product.id"
            >Erfahren Sie mehr...</router-link
          >
        </section>
        <div class="rating">
          <i
            v-for="(star, index) in getStars(product.averageStar)"
            :key="index"
            :class="star"
          ></i>
        </div>
        <a class="price">{{ product.price }}€</a>
      </router-link>
      <div class="btn-box">
        <button class="btn" @click="addToCart(product)">
          Zum Warenkorb hinzufügen
        </button>
      </div>
    </article>
  </main>
</template>

<script setup >
import { useStore} from "vuex";


  defineProps( {
    products: {
      type: Array,
      required: true,
    },
  });

    const store = useStore();

    const addToCart = (product) => {
      const { id, name, price, imageUrl, stockQuantity } = product;
      const cartItem = {
        id,
        name,
        price,
        imageUrl,
        quantity: 1,
        stockQuantity,
      };
      store.dispatch("addCartItem", cartItem);
    };

    const shortText = (text, length = 50) => {
      return text.length > length ? text.slice(0, length) + "..." : text;
    };

    const isTextShorted = (text, length = 100) => {
      return text.length > length;
    };

    const getStars = (averageStar) => {
      let stars = [];
      for (let i = 0; i < Math.floor(averageStar); i++) {
        stars.push("fas fa-star");
      }
      if (averageStar % 1 !== 0) {
        stars.push("fas fa-star-half-alt");
      }
      while (stars.length < 5) {
        stars.push("far fa-star");
      }
      return stars;
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
  text-decoration: none;
  color: black;
}

.rout {
  text-decoration: none;
  color: black;
}

article {
  padding: 20px;
  border: 1px solid #ccc;
  background-color: whitesmoke;
  width: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 10%;
}

.product-description {
  font-size: 1em;
  margin-bottom: 5px;
}
h2 {
  font-family: 'Roboto';
  font-size: 1.2em;
  margin-bottom: 5px;
}

img {
  margin-bottom: 5px;
  width: 100%;
  height: 200px; 
  object-fit: cover;
  object-position: center;
  border: blue 1px solid;
}

p {
  font-family: 'Roboto';
  font-size: 1em;
}

.rating {
  color: gold;
  font-size: 1em;

  a {
    color: black;
    font-family: 'Roboto';
    font-size: 1em;
  }
}

 a {
  margin-top: 20px;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.btn-box {
  margin-top: 10px;
  .btn {
    width: 100px;
    background-color: goldenrod;
    border-radius: 10%;
    border: none;
    font-size: 1em;
  }
}

@media (max-width: 768px) {
  main {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>