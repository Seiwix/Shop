<template>
  <div class="das">
    <div class="top">
      <h1>Produkte</h1>
      <button @click="openAddModal">Produkt Hinzufügen</button>
    </div>
    <section>
      <article class="produkt" v-for="product in products" :key="product.id">
        <img class="produktbild" :src="product.imageUrl" :alt="product.name">
        <h2>{{ product.name }}</h2>
        <p>Preis: {{ product.price }}</p>
        <div>
          <button class="delete-button" @click="deleteProduct(product.id)">Löschen</button>
          <button @click="openUpdateModal(product.id)">Updaten</button>
        </div>
      </article>
    </section>

    <!-- Modal kommt noch in eine extra component so  wie der code unten wird noch aufgeteilt mit props-->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h2>{{ isUpdating ? 'Produkt aktualisieren' : 'Neues Produkt hinzufügen' }}</h2>
        <form @submit.prevent="isUpdating ? updateProduct() : addProduct()">
          <label for="productName">Produkt Name:</label>
          <input type="text" v-model="productForm.name" required>
          <label for="productDescription">Beschreibung:</label>
          <input type="text" v-model="productForm.description">
          <label for="productPrice">Preis:</label>
          <input type="number" v-model.number="productForm.price" required>
          <label for="productQuantity">Quantity:</label>
          <input type="number" v-model.number="productForm.quantity" min="1" required>
          <label for="productImage">Bild hochladen:</label>
          <input type="file" @change="onFileChange" accept="image/*">
          <button type="submit">{{ isUpdating ? 'Aktualisieren' : 'Hinzufügen' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ProductListDashboard',
  setup() {
    const showModal = ref(false);
    const isUpdating = ref(false);
    const currentProductId = ref(null);
    const productForm = ref({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      imageFile: null,
    });
    const store = useStore();

    const products = computed(() => store.getters.getProducts);

    const openAddModal = () => {
      isUpdating.value = false;
      resetForm();
      showModal.value = true;
    };

    const openUpdateModal = async (productId) => {
      isUpdating.value = true;
      currentProductId.value = productId;
      await store.dispatch('fetchSingleProduct', productId);
      const product = store.getters.getSingleProduct;
      productForm.value = {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.stockQuantity,
        imageFile: null,
      };
      showModal.value = true;
    };

    const addProduct = async () => {
      const formData = new FormData();
      formData.append('name', productForm.value.name);
      formData.append('description', productForm.value.description);
      formData.append('price', productForm.value.price);
      formData.append('stockQuantity', productForm.value.quantity);
      formData.append('imageUrl', productForm.value.imageFile);

      await store.dispatch('addProductWithImage', formData);
      await store.dispatch('fetchProducts'); 

      resetForm();
      showModal.value = false;
    };

    const updateProduct = async () => {
      const formData = new FormData();
      formData.append('name', productForm.value.name);
      formData.append('description', productForm.value.description);
      formData.append('price', productForm.value.price);
      formData.append('stockQuantity', productForm.value.quantity);

      if (productForm.value.imageFile) {
        formData.append('imageUrl', productForm.value.imageFile);
        await store.dispatch('updateProductWithImage', { id: currentProductId.value, formData });
      } else {
        const product = {
          id: currentProductId.value,
          name: productForm.value.name,
          description: productForm.value.description,
          price: productForm.value.price,
          stockQuantity: productForm.value.quantity,
        };
        await store.dispatch('updateProductWithoutImage', product);
      }

      await store.dispatch('fetchProducts');  

      resetForm();
      showModal.value = false;
    };

    const deleteProduct = async (productId) => {
      await store.dispatch('deleteProduct', productId);
      await store.dispatch('fetchProducts');  
    };

    const closeModal = () => {
      showModal.value = false;
      store.dispatch('fetchProducts');  
    };

    const onFileChange = (event) => {
      productForm.value.imageFile = event.target.files[0];
    };

    const resetForm = () => {
      productForm.value = {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        imageFile: null,
      };
    };

    return {
      showModal,
      isUpdating,
      productForm,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      closeModal,
      openAddModal,
      openUpdateModal,
      onFileChange,
    };
  },
};
</script>


<style lang="scss" scoped>
.das{
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 100vh; 
  overflow-y: auto; 
}
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  h1{
    margin-left: 100px;
  }
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

article {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding-bottom: 10px;
  margin-top: 20px;
}

img {
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
  object-fit: cover;
}

.delete-button {
  background-color: #ff6347;
}

/* MOdla */

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4); 
  display: flex;
  justify-content: center;
  align-items: center;
}
    

    .modal-content {

      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 50%;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 10px;
    }

    input[type="text"], input[type="number"] {
      margin-bottom: 10px;
      padding: 5px;
    }

</style>