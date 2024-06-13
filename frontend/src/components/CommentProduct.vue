<template>
  <div>
    <div class="rating-form">
      <form v-if="isLoggedIn" @submit.prevent="submitForm">
        <h2>Bewertung abgeben</h2>
        <div class="stars">
          <label
            v-for="star in 5"
            :key="star"
            :for="'star' + star"
            class="star-label"
          >
            <input
              type="radio"
              :id="'star' + star"
              name="rating"
              :value="star"
              v-model="selectedStar"
              required
            />
            <i
              class="fas fa-star"
              :class="{ 'star-selected': star <= selectedStar }"
            ></i>
          </label>
        </div>
        <textarea
          placeholder="Deine Bewertung"
          v-model="commentText"
          required
        ></textarea>
        <button type="submit">Bewertung absenden</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";


const emit = defineEmits(['commentAdded']);

const store = useStore();
const route = useRoute();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const commentText = ref("");
const selectedStar = ref(0);

const submitForm = async () => {
  if (selectedStar.value === 0) {
    return;
  }

  if (!commentText.value.trim()) {
    return;
  }

  const productId = route.params.id;

  const comment = commentText.value.trim();
  const star = selectedStar.value;

  await store.dispatch("addComment", { productId, comment, star });

  resetForm();
  emit("commentAdded");
};

const resetForm = () => {
  selectedStar.value = 0;
  commentText.value = "";
};
</script>
  
  
  <style lang="scss" scoped>
.rating-form {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;

  form {
    margin-top: 20px;
  }

  h2 {
    margin-bottom: 20px;
  }

  .stars {
    display: inline-block;

    .star-label {
      font-size: 30px;
      cursor: pointer;

      .fas {
        color: #ccc;
        transition: color 0.3s;
      }

      input[type="radio"] {
        display: none;
      }

      .star-selected {
        color: #ffc107;
      }
    }
  }

  textarea {
    width: 400px;
    height: 200px;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
  