<template>
  <div class="product-list">
    <ul id="productList">
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - {{ item.price }}€<br> Anzahl: {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script setup>

 defineProps({
  cartItems: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.product-list ul {
      list-style-type: none;
      padding: 0;
    }
    .product-list li {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }


</style>