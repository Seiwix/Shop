<template>
  <div class="box">
    <form @submit.prevent="registerUser">
      <h1>Registrierung</h1>
      <fieldset>
        <label for="username">Benutzername:</label>
        <input type="text" v-model="formData.username" name="username" required autocomplete="username">
        <label for="email">E-Mail:</label>
        <input type="email" v-model="formData.email" name="email" required autocomplete="email">
      </fieldset>
      <fieldset>
        <label for="password">Passwort:</label>
        <input type="password" v-model="formData.password" name="password" required autocomplete="new-password">
        <label for="confirm_password">Passwort bestätigen:</label>
        <input type="password" v-model="confirmPassword" name="confirm_password" required autocomplete="new-password">
        <p v-if="passwordsDoNotMatch" style="color: red;">Passwörter stimmen nicht überein!</p>
        <p v-if="registrationError" style="color: red;">{{ registrationError }}</p>
      </fieldset>
      <button type="submit" :disabled="passwordsDoNotMatch || registrationSuccess">Registrieren</button>
      <p v-if="registrationSuccess">Registrierung erfolgreich!</p>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const formData = ref({
  username: '',
  email: '',
  password: ''
});
const confirmPassword = ref('');
const registrationSuccess = ref(false);
const passwordsDoNotMatch = ref(false);
const registrationError = ref('');
const store = useStore();
const router = useRouter();


watch(confirmPassword, (newValue) => {
  passwordsDoNotMatch.value = formData.value.password !== newValue;
});

function registerUser() {
  passwordsDoNotMatch.value = false;

  if (formData.value.password !== confirmPassword.value) {
    passwordsDoNotMatch.value = true;
    return;
  }

  try {
     store.dispatch('register', formData.value);
    registrationSuccess.value = true;
    setTimeout(() => {
      router.push('/');
    }, 2000);
  } catch (error) {
      registrationError.value = 'Die Email adresse Existerit bereits.';
    }
  
}
</script>

<style lang="scss" scoped>
.box{
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  

}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  background-color: #f5eded;
  padding: 20px;
  border-radius: 10px;
    h1{
      text-align: center;
       margin-bottom: 20px;
    }
    fieldset {
      border: none;
      padding: 0;
      margin-right: 20px;
      label {
        display: block;
        margin-bottom: 10px;
      }
    
    }
    input{
        width: auto;
        padding: 10px;
        min-width: 400px;
        border-radius: 5px;
        width: 100%;

      } 
    button{
        width: 100%;
        padding: 10px;
         background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
      }
      @media only screen and (max-width: 767px) {
        input{
          min-width: 200px;
        }
      }

}

</style>