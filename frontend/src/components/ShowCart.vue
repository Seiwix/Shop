<template>
  <div>
    <article v-for="(item, index) in cartItems" :key="index">
      <img :src="item.imageUrl" :alt="item.name" />
      <h3>{{ item.name }}</h3>
      <div class="actions">
        <select class="dropdown" v-model="item.quantity">
          <option
            v-for="quantity in getAvailableQuantities(item)"
            :key="quantity"
            :value="quantity"
          >
            {{ quantity }}
          </option>
        </select>
        <p>{{ item.price }}€</p>
        <button @click="removeFromCart(item)">Löschen</button>
      </div>
    </article>
  </div>
</template>

<script setup>

defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['removeCartItem']);

const getAvailableQuantities = (item) => {
  return Array.from(
    { length: item.stockQuantity },
    (_, index) => index + 1
  );
};

const removeFromCart = (item) => {
  emit("removeCartItem", item);
};
</script>

<style lang="scss" scoped>
article {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;

  img {
    max-width: 100px;
    max-height: 100px;
    margin-right: 20px;
  }

  h3 {
    flex-grow: 1;
    text-align: center;
    margin: 0;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    .dropdown {
      width: 80px;
      font-size: 16px;
    }

    p {
      margin: 0;
    }

    button {
      background-color: red;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
}
</style>

