<template>
  <div>
    <div class="rating-form">
        <form v-if="isLoggedIn == true">
          <h2>Bewertung abgeben</h2>
          <div class="stars">
            <input type="radio" id="star5" name="rating" value="5" />
            <label for="star5"><i class="fas fa-star"></i></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4"><i class="fas fa-star"></i></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3"><i class="fas fa-star"></i></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2"><i class="fas fa-star"></i></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1"><i class="fas fa-star"></i></label>
          </div>
          <textarea placeholder="Deine Bewertung"></textarea>
          <button type="submit">Bewertung absenden</button>
        </form>
      </div>
  </div>
</template>

<script>
export default {
    name:'commentProduct',
     computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }

}
</script >

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
        unicode-bidi: bidi-override;
        direction: rtl;

        input[type="radio"] {
            display: none;
        }

        label {
            font-size: 30px;
            color: #ccc;
            cursor: pointer;

            &:hover,
            &:hover ~ label {
                color: #ffc107;
            }

            input[type="radio"]:checked ~ & {
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