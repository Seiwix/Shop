<template>
  <div>
    <article v-for="(item, index) in cartItems" :key="index">
      <img :src="item.imageUrl" :alt="item.name" />
      <div>
        <h3>{{ item.name }}</h3>
        <p>
          <select class="dropdown" v-model="item.quantity">
            <option v-for="quantity in getAvailableQuantities(item.quantity)" :key="quantity" :value="quantity">{{ quantity }}</option>
          </select>
        </p>
        <p>{{ item.price }}€</p>
        <button @click="removeFromCart(item)">Löschen</button>
      </div>
    </article>
  </div>
</template>

<script>


export default {
  name: 'ShowCart',
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const getAvailableQuantities = (stockQuantity) => {
      return Array.from({ length: stockQuantity }, (_, index) => index + 1);
    };

    const removeFromCart = (item) => {
      emit('removeCartItem', item); 
    };

    return {
      getAvailableQuantities,
      removeFromCart
    };
  }
};
</script>

<style lang="scss" scoped>
article{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;

    img{
        max-width: 100px;
        max-height: 100px;
        margin-right: 20px;
    }
    .dropdown{
        width: 80px;
        font-size: 16px;
    }
    button{
      background-color: red;
    }
}
</style>
