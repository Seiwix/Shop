<template>
  <header>
    <nav>
      <a class="logo"
        ><router-link :to="'/'"
          ><img src="@/assets/logo.png" alt="" /></router-link
      ></a>
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
              <li class="li-drop"><a>Anmelden</a></li>
              <li class="li-drop">
                <router-link :to="'/register'"><a>Regsiter</a></router-link>
              </li>
            </menu>
          </li>
          <li>
            <router-link :to="'/cart'"
              ><a class="fas fa-shopping-cart">{{
                cartItemCount
              }}</a></router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  name: "NavigationShop",
  setup() {
    const searchQuery = ref("");
    const showDropdown = ref(false);
    const showMenu = ref(false);
    const store = useStore();

    const cartItemCount = computed(() => store.getters.cartItemCount);
    const searchResults = computed(() => {
      return store.getters.getProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const menu = () => {
      showMenu.value = !showMenu.value;
    };

    const hideDropdown = () => {
      showDropdown.value = false;
    };

    const handleInput = () => {
      showDropdown.value = searchQuery.value.length > 0;
    };

    return {
      searchQuery,
      showDropdown,
      showMenu,
      cartItemCount,
      searchResults,
      handleInput,
      hideDropdown,
      menu,
    };
  },
};
</script>




<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #131921;
  position: fixed;
  width: 100%;
  color: #ffffff;
  height: 100px;
  .logo img {
    margin-left: 70px;
    width: 70px;
    height: 70px;
  }

  .search-form {
    width: 1000px;
    height: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      font-size: 20px;
      text-align: center;
      padding: 0 20px;
      width: 600px;
      border-color: #febd69;
      height: 40px;
    }

    > button {
      background-color: #febd69;

      > i {
        font-size: 23px;
      }
    }
  }

  .icons {
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      list-style: none;

      > li {
        position: relative;
        list-style: none;
        font-size: 20px;
        list-style: none;
        padding: 20px;
      }
    }
  }
}
.searchlist {
  margin-top: 240px;
  color: black;
  overflow: hidden;
  position: absolute;
  height: 200px;
  width: 600px;
  background-color: #ffffff;

  > ul {
    > li {
      list-style: none;
      text-align: center;
      padding: 5px;
      > .dropdown-item {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black;
        font-size: 30px;
      }
    }
  }
}
menu {
  list-style: none;
  position: absolute;
  margin-left: -50px;
  padding: 30px;
  background-color: #ffffff;
  color: #131921;
  border-radius: 20px;
  margin-top: 5px;
  display: none;
}
.menu-visible {
  display: block;
}

@media only screen and (max-width: 767px) {
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #131921;
    position: fixed;
    width: 100%;
    color: #ffffff;
    height: 50px;

    .logo img {
      width: 50px;
      height: 50px;
      display: block;
    }

    .search-form {
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        font-size: 10px;
        text-align: center;
        display: block;
        padding: 0 20px;
        width: 100;
        border-color: #febd69;
        height: 20px;
      }

      > button {
        background-color: #febd69;
        display: block;
        > i {
          font-size: 15px;
        }
      }
    }
    .icons {
      ul {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
        list-style: none;

        > li {
          position: relative;
          list-style: none;
          font-size: 10px;
          list-style: none;
          padding: 5px;
        }
      }
    }
  }
}
</style>