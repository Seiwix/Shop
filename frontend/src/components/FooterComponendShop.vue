<template>
  <div v-if="!isDashboardVisible" class="container">
    <main class="content">
    </main>
    <footer class="footer">
      <section class="containerS">
        <section class="paymentMethods">
          <h3>Zahlungsarten</h3>
          <div class="payment-icons">
            <img src="@/assets/VISA.svg" alt="Visa" />
            <img src="@/assets/Mastercard.svg" alt="Mastercard" />
            <img src="@/assets/PayPal.svg" alt="PayPal" />
          </div>
        </section>
        <section class="links">
          <article>
            <h3>Gesetzliche Informationen</h3>
            <ul>
              <li><a>Impressum</a></li>
              <li><a>AGB</a></li>
            </ul>
          </article>
          <article>
            <h3>Datenschutz</h3>
            <ul>
              <li><a>Datenschutzrichtlinien</a></li>
              <li><a>Cookie-Richtlinien</a></li>
            </ul>
          </article>
        </section>
      </section>
      <section class="copyright">
        <p>&copy; {{ currentYear }} Vue Store. Alle Rechte vorbehalten.</p>
      </section>
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
.container {
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

  .containerS {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;

    .paymentMethods,
    .links {
      flex-basis: 30%;
      margin-bottom: 20px;
    }

    .payment-icons {
      display: flex;
      gap: 20px;

      img {
        max-width: 80px;
        height: auto;
      }
    }

    .links {
      article {
        margin-bottom: 20px;

        h3 {
          margin-top: 0;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            margin-bottom: 5px;

            a {
              cursor: pointer;
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }

  .copyright {
    text-align: center;
    margin-top: 20px;
  }
}
</style>