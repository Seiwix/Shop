<template>
  <nav>
    <ul>
      <li>
        <i class="fas fa-box"></i>
        <span>Produkte</span>
      </li>
      <li>
        <i class="fas fa-user"></i>
        <span>Kunden</span>
      </li>
      <li>
        <i class="fas fa-wallet"></i>
        <span>Umsatz</span>
      </li>
      <li>
        <a href="#" class="logout" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Log out</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex'; 

export default {
  name: 'SideNav',
  setup() {
    const router = useRouter(); 
    const store = useStore(); 

    const logout = () => {
      store.dispatch('logout'); 
      router.push('/'); 
    };

    return {
      logout
    };
  }
};
</script>


<style lang="scss" scoped>

nav{
  position: relative;
  top: 0;
  bottom: 0;
  height: 100vh;
  left: 0;
  background: #fff;
  width: 280px;
  overflow: hidden;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  list-style: none;
  .fas{
  position: relative;
  width: 70px;
  height: 40px;
  top: 14px;
  font-size: 20px;
  text-align: center;
  
  }
  li {
     list-style: none;
  }
  span{
    position: relative;
    top: 12px;
     margin-left: 10px;
  }
  .logout{
  position: absolute;
  bottom: 0;
  }

}


</style>