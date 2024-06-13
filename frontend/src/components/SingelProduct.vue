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

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

// Define props directly without importing defineProps
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

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
      stockQuantity,
    };
    store.dispatch("addCartItem", cartItem);
  } else {
    console.log("Die gewählte Menge ist nicht verfügbar");
  }
};
</script>

<style scoped lang="scss">
section {
  margin: 50px auto;
  padding: 20px;
  max-width: 1200px;
  display: grid;
  grid-template-areas:
    "img details"
    "reviews reviews";
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  .productImg {
    grid-area: img;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .productDetails {
    grid-area: details;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h2 {
      font-size: 2rem;
      margin-bottom: 10px;
      text-align: center;
      width: 100%;
    }

    .rating {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      color: gold;

      i {
        margin-right: 5px;
      }

      a {
        margin-left: 10px;
        font-size: 0.9rem;
        color: #555;
      }
    }

    p {
      margin: 10px 0;
      font-size: 1rem;
      line-height: 1.5;
      color: #333;
      width: 100%;
    }

    label {
      font-size: 1rem;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .quantity {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      select {
        padding: 5px;
        font-size: 1rem;
      }
    }

    button {
      align-self: center;
      padding: 10px 20px;
      font-size: 1rem;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}

@media (max-width: 768px) {
  section {
    grid-template-areas:
      "img"
      "details"
      "reviews";
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .productDetails {
    padding: 15px;

    h2 {
      font-size: 1.8rem;
    }

    .rating {
      i {
        font-size: 1.2rem;
      }

      a {
        font-size: 0.9rem;
      }
    }

    p,
    label {
      font-size: 1rem;
    }

    button {
      padding: 8px 16px;
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 480px) {
  .productDetails {
    padding: 10px;

    h2 {
      font-size: 1.5rem;
    }

    .rating {
      i {
        font-size: 1rem;
      }

      a {
        font-size: 0.8rem;
      }
    }

    p,
    label {
      font-size: 0.9rem;
    }

    button {
      padding: 6px 12px;
      font-size: 0.8rem;
    }
  }
}
</style>