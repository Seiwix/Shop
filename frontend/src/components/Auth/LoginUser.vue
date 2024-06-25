<template>
  <div class="box">
    <form @submit.prevent="loginUser">
      <h1>Login</h1>
      <fieldset>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required autocomplete="email">
      </fieldset>
      <fieldset>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required autocomplete="current-password">
      </fieldset>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const store = useStore();
const router = useRouter();

const loginUser = async () => {
  try {
    const credentials = {
      email: email.value,
      password: password.value
    };
    await store.dispatch('login', credentials);

    const userRole = store.getters.user.role;

    if (userRole === 'admin') {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  } catch (error) {
   
      errorMessage.value = 'Login fehlgeschlagen. Bitte versuchen Sie es später erneut / Benutzer existiert nicht oder falsches Password.';
    }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  background-color: #f5eded;
  padding: 20px;
  border-radius: 10px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  fieldset {
    border: none;
    padding: 0;
    margin-bottom: 20px;
    width: 100%;

    label {
      display: block;
      margin-bottom: 10px;
    }
  }

  input {
    width: calc(100% - 20px); 
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    box-sizing: border-box; 
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  .error {
  margin-top: 16px;
  color: red;
}

  @media only screen and (max-width: 767px) {
    input {
      min-width: 200px;
    }
  }
}
</style>
