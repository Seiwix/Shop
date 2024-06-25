<template>
  <div class="container">
    <h1>Bestellungen</h1>
    <div v-for="(orders, date) in groupedOrders" :key="date" class="orderssection">
      <h2>{{ date }}</h2>
      <ul class="orderlist">
        <li v-for="order in orders" :key="order.checkoutId" class="orderitem">
          <div class="order">
            <p><strong>Bestellnummer:</strong> {{ order.checkoutId }}</p>
            <p><strong>Name:</strong> {{ order.firstName }} {{ order.lastName }}</p>
            <p><strong>Adresse:</strong> {{ order.address }}, {{ order.city }}, {{ order.zip }}</p>
            <p><strong>Total:</strong> {{ order.total }} €</p>
            <ul class="itemlist">
              <li v-for="item in order.items" :key="item.checkoutItemId" class="item">
                <p><strong>Produkt-ID:</strong> {{ item.productId }}</p>
                <p><strong>Menge:</strong> {{ item.quantity }}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';


    const store = useStore();
    const userId = ref(localStorage.getItem('userId'));

    const fetchOrders = async () => {
      await store.dispatch('fetchCheckoutsByUserID', { id: userId.value });
    };

    onMounted(() => {
      fetchOrders();
    });

    const groupedOrders = computed(() => {
      const orders = store.getters.checkouts;
      // Format der Zeit geändert
      return orders.reduce((acc, order) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(order);
        return acc;
      }, {});
    });

   
</script>

<style lang="scss" scoped>

.container{
  margin-top: 100px;
}
 
h1 {
  text-align: center;
  color: #333;
}
.orderssection {
  margin-bottom: 2em;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.orderssection h2 {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.orderlist {
  list-style-type: none;
  padding: 0;
}
.orderitem {
  margin-bottom: 20px;
}
.order {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  background: #f9f9f9;
}
.order p {
  margin: 5px 0;
}
.itemlist {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}
.item {
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
}
.item p {
  margin: 2px 0;
}
</style>