<template>
  <section class="orders-dashboard">
    <header class="top">
      <h1>Bestellungen</h1>
    </header>
    <section class="orders-grid">
      <article class="order" v-for="order in orders" :key="order.checkoutId">
        <header>
          <h2>Bestellung {{ order.checkoutId }}</h2>
        </header>
        <section class="order-details">
          <p><strong>Name:</strong> {{ order.firstName }} {{ order.lastName }}</p>
          <p><strong>Adresse:</strong> {{ order.address }}, {{ order.city }}, {{ order.zip }}</p>
          <p><strong>Total:</strong> {{ order.total }} €</p>
        </section>
        <section class="order-items">
          <h3>Artikel</h3>
          <ul class="items-list">
            <li v-for="item in order.items" :key="item.checkoutItemId">
              <span><strong>Produkt ID:</strong> {{ item.productId }}</span>
              <span><strong>Menge:</strong> {{ item.quantity }}</span>
            </li>
          </ul>
        </section>
      </article>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const orders = computed(() => store.getters['checkouts']);

onMounted(() => {
  store.dispatch('fetchAllCheckouts');
});
</script>

<style lang="scss">
.orders-dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .orders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    border: 1px solid red; 
  }

  .order {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    
    &:hover {
      transform: scale(1.05);
    }

    header {
      margin-top: 0;
    }

    .order-details {
      p {
        margin: 5px 0;
      }
    }

    .order-items {
      h3 {
        margin-top: 20px;
      }

      .items-list {
        list-style-type: none;
        padding: 0;
        margin: 10px 0 0;

        li {
          background-color: #f1f1f1;
          padding: 10px;
          margin: 5px 0;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            display: block;
          }
        }
      }
    }
  }
}
</style>