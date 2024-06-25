<template>
  <div>
    <label for="name">Vorname</label>
    <input type="text" :v-model="firstName" @input="updateFirstName($event.target.value)" required />
    <label for="name">Nachname</label>
    <input type="text"  :v-model="lastName" @input="updateLastName($event.target.value)" required />

    <label for="street">Straße</label>
    <input type="text"  :v-model="street" @input="updateStreet($event.target.value)" required />

    <label for="city">Stadt</label>
    <input type="text"  :v-model="city" @input="updateCity($event.target.value)" required />

    <label for="zip">PLZ</label>
    <input type="text"  :v-model="zip" @input="updateZip($event.target.value)" required />
  </div>
</template>

<script setup>

 defineProps({
  firstName: String,
  lastName: String,
  street: String,
  city: String,
  zip: String
});

const emit = defineEmits(['update:firstName','update:lastName', 'update:street', 'update:city', 'update:zip']);

const updateFirstName = (value) => {
  emit('update:firstName', value);
};
const updateLastName = (value) => {
  emit('update:lastName', value);
};

const updateStreet = (value) => {
  emit('update:street', value);
};

const updateCity = (value) => {
  emit('update:city', value);
};

const updateZip = (value) => {
  emit('update:zip', value);
};
</script>


<style lang="scss" scoped>
div{
    margin-bottom: 30px;
}

label {
      display: block;
      margin-bottom: 5px;
     height: 20px;
     width: 100px;
    }
input{
    width: 300px;
    height: 20px;
}

</style>