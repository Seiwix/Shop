<template>
  <div id="app">
    <Navigation /> 
    <router-view /> 

  </div>
</template>

<script>
import Navigation from '@/components/NavigationShop.vue'; // Stelle sicher, dass der Pfad zu deiner Navigationskomponente korrekt ist


export default {
  components: {
    Navigation,
    
  },

}
</script>
<style>
* {
            margin: 0px;
 } 

</style>
