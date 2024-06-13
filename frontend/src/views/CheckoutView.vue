<template>
  <div class="checkout">
    <div class="checkout-form">
      <form @submit.prevent="placeOrder">
        <CheckoutForm
          :firstName="formData.firstName"
          :lastName="formData.lastName"
          :street="formData.street"
          :city="formData.city"
          :zip="formData.zip"
          @update:firstName="updateFormData('firstName', $event)"
          @update:lastName="updateFormData('lastName', $event)"
          @update:street="updateFormData('street', $event)"
          @update:city="updateFormData('city', $event)"
          @update:zip="updateFormData('zip', $event)"
        />
        <PaymentSection
          :selectedMethod="paymentData.method"
          @update:method="updatePaymentMethod"
        />
        <ProductList :cartItems="cartItems" />
        <span>{{ totalPrice }} €</span>
        <button type="submit" :disabled="!isLoggedIn">Bestellen: {{ totalPrice }} €</button>
        <div v-if="!isLoggedIn">
          <p>Bitte <a @click="redirectToLogin">einloggen</a> oder <a @click="redirectToRegister">registrieren</a>, um die Bestellung abzuschließen.</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import CheckoutForm from "@/components/Checkout/CheckoutForm.vue";
import PaymentSection from "@/components/Checkout/PaymentSection.vue";
import ProductList from "@/components/Checkout/ProductList.vue";
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.getters.cartItems);
const cartPrice = computed(() => store.getters.cartPrice);
const totalPrice = computed(() => cartPrice.value.toFixed(2));
const isLoggedIn = computed(() => store.getters.isLoggedIn);

const formData = reactive({
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  zip: ''
});

const paymentData = reactive({
  method: 'credit_card'
});

const updateFormData = (field, value) => {
  formData[field] = value;
};

const updatePaymentMethod = (value) => {
  paymentData.method = value;
};

const redirectToLogin = () => {
  router.push({ name: 'Login' });
};

const redirectToRegister = () => {
  router.push({ name: 'Register' });
};

const placeOrder = async () => {
  const userId = localStorage.getItem('userId'); // Holen der Benutzer-ID aus dem localStorage
  if (!userId) {
    console.error("Benutzer-ID nicht gefunden");
    return;
  }

  const checkoutData = {
    userId, // Benutzer-ID hinzufügen
    firstName: formData.firstName,
    lastName: formData.lastName,
    address: formData.street,
    city: formData.city,
    zip: formData.zip,
    total: totalPrice.value,
    items: cartItems.value.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }))
  };
  
  try {
    const response = await store.dispatch('createCheckout', checkoutData);
    console.log(response.message);
  } catch (error) {
    console.error(`Fehler beim Erstellen des Checkouts: ${error.message}`);
  }
};
</script>

<style lang="scss" scoped>
.checkout{
    margin-top: 100px;
    font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
}
.checkout-form {
      max-width: 600px;
      width: 100%;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #fff;
    }
</style>