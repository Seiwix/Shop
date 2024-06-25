<template>
  <div class="checkout">
    <div class="checkoutForm">
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
        <div class="totalPrice">
          <span>Gesamtsumme:</span>
          <span>{{ totalPrice }} €</span>
        </div>
        <button type="submit" :disabled="!isLoggedIn">
          Bestellen: {{ totalPrice }} €
        </button>
        <div v-if="!isLoggedIn" class="RegisterLogin">
          <p>
            Bitte <a @click="redirectToLogin">einloggen</a> oder
            <a @click="redirectToRegister">registrieren</a> um die Bestellung
            abzuschließen
          </p>
        </div>
      </form>
      <p v-if="orderSuccessMessage" class="SuccesMessage">
        {{ orderSuccessMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import CheckoutForm from "@/components/Checkout/CheckoutForm.vue";
import PaymentSection from "@/components/Checkout/PaymentSection.vue";
import ProductList from "@/components/Checkout/ProductList.vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.getters.cartItems);
const cartPrice = computed(() => store.getters.cartPrice);

const totalPrice = computed(() => cartPrice.value.toFixed(2));
const isLoggedIn = computed(() => store.getters.isLoggedIn);

const formData = reactive({
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  zip: "",
});

const paymentData = reactive({
  method: "credit_card",
});

const updateFormData = (field, value) => {
  formData[field] = value;
};

const updatePaymentMethod = (value) => {
  paymentData.method = value;
};

const redirectToLogin = () => {
  router.push({ name: "Login" });
};

const redirectToRegister = () => {
  router.push({ name: "Register" });
};

const orderSuccessMessage = ref("");

const placeOrder = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("Benutzer nicht gefunden");
    return;
  }

  const checkoutData = {
    userId,
    firstName: formData.firstName,
    lastName: formData.lastName,
    address: formData.street,
    city: formData.city,
    zip: formData.zip,
    total: totalPrice.value,
    items: cartItems.value.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };

  try {
    await store.dispatch("createCheckout", checkoutData);
    orderSuccessMessage.value = "Bestellung erfolgreich!";
    store.dispatch("clearCart");
    setTimeout(() => {
      router.push({ name: "UserOrder" });
    }, 3000);
  } catch (error) {
    console.error(`Fehler im Checkout: ${error.message}`);
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  .checkoutForm {
    max-width: 600px;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    overflow-y: auto;
    max-height: 80vh;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    form {
      display: flex;
      flex-direction: column;
    }

    .totalPrice {
      display: flex;
      justify-content: space-between;
      font-size: 1.2em;
      margin-top: 20px;
    }
  }

  button {
    background-color: goldenrod;
    color: #000000;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 1em;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .RegisterLogin{
    margin-top: 20px;
    text-align: center;

    a {
      color: #007bff;
      cursor: pointer;
    }
  }

  .SuccesMessage {
    color: green;
    text-align: center;
    margin-top: 20px;
    font-size: 1.2em;
  }
}
</style>