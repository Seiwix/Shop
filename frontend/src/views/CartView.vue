<template>
  <div class="card">
    <section >
      <h1>Warenkorb</h1>
      <ShowCart :cartItems="cartItems" @removeCartItem="removeItemFromCart" />
      <div class="sum">
        <span class="price">Gesamtsumme:</span>
        <span class="price">{{ totalPrice }}€</span>
      </div>
      <router-link class="ToCheckout" :to="'/checkout/'">
        <button>Bezahlen</button>
      </router-link>
    </section>
  </div>
</template>

<script setup >
import ShowCart from "@/components/ShowCart";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const cartItems = computed(() => store.getters.cartItems);
const cartPrice = computed(() => store.getters.cartPrice);
const totalPrice = computed(() => cartPrice.value.toFixed(2));

const removeItemFromCart = (item) => {
  store.dispatch("removeCartItem", item);
};
</script>


<style lang="scss" scoped>
.card {
  margin-top: 250px;
}
section {
  width: 80%;
  margin: 0 auto;
  h1 {
    text-align: center;
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .sum {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding-top: 10px;
    font-weight: bold;
  }
  .ToCheckout
  {
    text-decoration: none;
  }
  .price{
    font-size: 20px;
  }
  button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: goldenrod;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    margin-top: 20px;
    text-decoration: none;
  }
}
</style>