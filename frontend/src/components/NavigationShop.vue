<template>
  <header v-if="!isDashboardVisible">
    <nav>
      <a class="logo">
        <router-link :to="'/'">
          <img src="@/assets/logo.png" alt="" />
        </router-link>
      </a>
      <form @submit.prevent="searchProducts" class="search-form">
        <input
          v-model="searchQuery"
          @input="handleInput"
          type="search"
          placeholder="Suche"
        />
        <div class="searchlist" v-if="showDropdown && searchResults.length > 0">
          <ul>
            <li v-for="result in searchResults" :key="result.id">
              <router-link
                class="dropdown-item"
                :to="'/product/' + result.id"
                @click="hideDropdown"
                >{{ result.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div
          v-if="showDropdown && searchResults.length === 0"
          class="searchlist"
        >
          <p>Nichts gefunden</p>
        </div>
      </form>
      <div class="icons">
        <ul>
          <li>
            <a class="fas fa-user" @click="menu"></a>
            <menu :class="{ 'menu-visible': showMenu }">
              <li v-if="!isLoggedIn">
                <a></a>
                <router-link :to="'/login'"><a>Anmelden</a></router-link>
              </li>
              <li v-if="isLoggedIn" class="li-drop">
                <router-link :to="'/orders'"><a>Bestellungen</a></router-link>
              </li>
              <li v-if="isLoggedIn" @click="logout"><a>Logout</a></li>
              <li v-if="!isLoggedIn" class="li-drop">
                <router-link :to="'/register'"
                  ><a>Registrierung</a></router-link
                >
              </li>
            </menu>
          </li>
          <li>
            <router-link class="cart-icon" :to="'/cart'">
              <a class="fas fa-shopping-cart">{{ cartItemCount }}</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const isDashboardVisible = ref(false);

const cartItemCount = computed(() => store.getters.cartItemCount);
const searchQuery = ref("");
const showDropdown = ref(false);
const showMenu = ref(false);

const searchResults = computed(() => {
  return store.getters.getProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const isLoggedIn = computed(() => store.getters.isLoggedIn);

const menu = () => {
  showMenu.value = !showMenu.value;
};

const hideDropdown = () => {
  showDropdown.value = false;
};

const handleInput = () => {
  showDropdown.value = searchQuery.value.length > 0;
};

const logout = () => {
  store.dispatch("logout");
};

watch(route, (to) => {
  isDashboardVisible.value = to.path.startsWith("/dashboard");
});
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #131921;
  z-index: 1000;
}

.fas {
  color: white;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

  .logo img {
    width: 70px;
    height: 70px;
  }

  .search-form {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    max-width: 600px;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #febd69;
      font-size: 16px;
      border-radius: 4px;
    }
  }

  .icons {
    display: flex;
    align-items: center;
    font-size: 25px;
    text-decoration: none;

    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      align-items: center;

      li {
        list-style: none;
        margin-left: 20px;
        position: relative;
        text-align: center;
        text-decoration: none;

        .fas {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          cursor: pointer;
          text-decoration: none;
        }
        .cart-icon {
          text-decoration: none;
        }

        menu {
          display: none;
          position: absolute;
          top: 100%;
          text-align: center;
          right: 0;
          background-color: #fff;
          color: #131921;
          border-radius: 8px;
          padding: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 200px;
          a {
            text-decoration: none;
            color: #131921;
            display: block;
            padding: 5px 0;
          }
        }

        .menu-visible {
          display: block;
        }
      }
    }
  }
}

.searchlist {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1000;
  overflow-y: auto;
  max-height: 200px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-bottom: none;
      }

      .dropdown-item {
        text-decoration: none;
        color: #333;
        display: block;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  nav {
    flex-direction: column;

    .logo img {
      width: 50px;
      height: 50px;
      margin: 0 auto;
    }

    .search-form {
      max-width: 100%;
      width: 300x;
      margin: 10px 0;

      input {
        width: calc(100% - 20px);
        font-size: 14px;
        padding: 8px;
      }
    }

    .icons {
      justify-content: center;
      width: 100%;
      margin-top: 10px;

      ul {
        justify-content: flex-end;
        width: auto;

        li {
          font-size: 16px;
        }
      }
    }
  }

  menu {
    right: 0;
    left: auto;
  }
}
</style>
