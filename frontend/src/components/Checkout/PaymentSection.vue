<template>
  <div class="payment-method">
    <h2>Zahlungsmethode</h2>
    <select :value="selectedMethod" @change="updatePaymentMethod">
      <option value="credit_card">Kreditkarte</option>
      <option value="paypal">PayPal</option>
      <option value="bank_transfer">Überweisung</option>
    </select>
  </div>
</template>

<script setup>

 defineProps({
  selectedMethod: String
});

const emit = defineEmits(['update:method']);

const updatePaymentMethod = (event) => {
  emit('update:method', event.target.value);
};
</script>
<style>

</style>