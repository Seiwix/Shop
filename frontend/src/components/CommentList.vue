<template>
    <div>
  <div class="reviews-container" v-for="(comments, index) in comment" :key="index">
    <div class="review">
      <div class="review-header">
        <span class="review-date">{{ comments.commentDate }}</span>
        <div class="review-stars">
          <i v-for="n in 5" :class="{ 'fas fa-star': n <= comments.starRating, 'far fa-star': n > comments.starRating }" :key="n"></i>
        </div>
        <span class="review-name">{{comments.username}}</span>
      </div>
      <div class="review-text">
        {{ comments.commentText }}
      </div>
    </div>
  </div>
</div>
</template>
  
  <script>
export default {
  name: "commentList",
  props: {
    comment: {
      type: Array,
      required: true,
    },
  },
  created() {
    console.log("Kommentare:", this.comment);
  },
};
</script>

<style lang="scss" scoped>
.reviews-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }

  .review {
    margin-bottom: 40px;

    .review-header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .review-date {
        margin-right: auto;
      }

      .review-stars {
        margin-right: 10px;

        i {
          color: #ffc107;
          font-size: 18px;
        }
      }

      .review-name {
        margin-left: 10px;
      }
    }

    .review-text {
      font-size: 16px;
      line-height: 1.6;
    }
  }
}
</style>