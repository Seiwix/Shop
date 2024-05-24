<template>
  <div id="app">
    <Navigation /> 
    <router-view /> 

  </div>
</template>

<script>
import Navigation from '@/components/NavigationShop.vue'; 


export default {
  components: {
    Navigation,
  },

}
</script>
<style >

*{
            margin: 0px;
 } 

</style>
