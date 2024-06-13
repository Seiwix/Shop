<template>
  <div v-if="!isDashboardVisible" class="page-container">
    <main class="content">
    </main>
    <footer class="footer">
      <div class="container">
        <div class="payment-methods">
          <h3>Zahlungsarten</h3>
          <div class="payment-icons">
            <img src="@/assets/VISA.svg" alt="Visa" />
            <img src="@/assets/Mastercard.svg" alt="Mastercard" />
            <img src="@/assets/PayPal.svg" alt="PayPal" />
          </div>
        </div>
        <div class="additional-links">
          <div class="section">
            <h3>Gesetzliche Informationen</h3>
            <ul>
              <li><a>Impressum</a></li>
              <li><a>AGB</a></li>
            </ul>
          </div>
          <div class="section">
            <h3>Datenschutz</h3>
            <ul>
              <li><a>Datenschutzrichtlinien</a></li>
              <li><a>Cookie-Richtlinien</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; {{ currentYear }} Vue Store. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const isDashboardVisible = ref(false);
watch(route, (to) => {
  isDashboardVisible.value = to.path.startsWith("/dashboard");
});
const currentYear = ref(new Date().getFullYear());
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 60vh;
}

.content {
  flex: 1;
}

.footer {
  background-color: #131921;
  padding: 20px 0;
  margin-top: 20px; 
  color: white;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
  }

  .payment-methods,
  .additional-links {
    flex-basis: 30%;
  }

  .payment-icons {
    display: flex;
    gap: 20px;
  }

  .payment-icons img {
    max-width: 80px;
    height: auto;
  }

  .additional-links .section {
    margin-bottom: 20px;
  }

  .additional-links h3 {
    margin-top: 0;
  }

  .additional-links ul {
    list-style: none;
    padding: 0;
  }

  .additional-links ul li {
    margin-bottom: 5px;
  }

  .additional-links ul li a {
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .copyright {
    text-align: center;
    margin-top: 20px;
  }
}
</style>