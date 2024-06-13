<template>
  <div id="app">
    <Navigation />
    <div class="contentMain">
      <router-view />
    </div>
    <FooterComponendShop />
  </div>
</template>

<script setup>
import Navigation from '@/components/NavigationShop.vue'; 
import FooterComponendShop from '@/components/FooterComponendShop.vue';
</script>

<style>
* {
  margin: 0;
}

h1, h2, h3 {
  font-family: 'Roboto', sans-serif;
}

p, a {
  font-family: 'Open Sans', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contentMain {
  flex: 1;
  
}

</style>
