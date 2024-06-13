<template>
  <div>
    <SideNave />
    <div v-if="isWelcomeVisible">
      <h1>Willkommen im Backend</h1>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SideNave from "@/components/Dashboard/SideNave";

const route = useRoute();
const isWelcomeVisible = ref(route.path === '/dashboard');

watch(route, (to) => {
  isWelcomeVisible.value = to.path === '/dashboard';
});
</script>

<style lang="scss" scoped>
div {
  display: flex;
}
</style>