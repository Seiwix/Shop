<template>
<div class="form">
  <RegisterUser />
</div>
</template>

<script>
import RegisterUser from '@/components/Auth/RegisterUser.vue';
export default {
    name:'LoginRegisterView',
    components:{
        RegisterUser
    }

}
</script>

<style lang="css" scoped>

form{
    margin-top: 200px;
}
</style>