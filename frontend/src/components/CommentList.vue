<template>
  <div class="container">
    <div
      class="reviewsContainer"
      v-for="(comment, index) in comments"
      :key="index"
    >
      <div class="review">
        <div class="reviewHeader">
          <span class="reviewDate">{{ formatDate(comment.commentDate) }}</span>
          <div class="reviewStars">
            <i
              v-for="n in 5"
              :class="{
                'fas fa-star': n <= comment.starRating,
                'far fa-star': n > comment.starRating,
              }"
              :key="n"
            ></i>
          </div>
          <span class="reviewName">{{ comment.username }}</span>
          <button
            v-if="isCurrentUser(comment.userID)"
            @click="openEditPopup(comment)"
            class="edit-btn"
          >
            Bearbeiten
          </button>
          <button
            v-if="isCurrentUser(comment.userID)"
            @click="deleteComment(comment.comment_id)"
            class="delete-btn"
          >
            Löschen
          </button>
        </div>
        <div class="review-text">{{ comment.commentText }}</div>
      </div>
    </div>

    <div v-if="editPopupVisible" class="overlay" @click="closeEditPopup"></div>

    <div v-if="editPopupVisible" class="edit-popup">
      <div class="edit-popup-content">
        <div class="stars">
          <label
            v-for="star in 5"
            :key="star"
            :for="'edit-star' + star"
            class="star-label"
          >
            <input
              type="radio"
              :id="'edit-star' + star"
              name="rating"
              :value="star"
              v-model="editedStarRating"
              required
            />
            <i
              class="fas fa-star"
              :class="{ 'star-selected': star <= editedStarRating }"
            ></i>
          </label>
        </div>
        <textarea v-model="editedCommentText"></textarea>
        <button @click="saveEditedComment">Speichern</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["commentUpdated", "commentDeleted"]);

const store = useStore();
let editedComment = null;
const editPopupVisible = ref(false);
const editedCommentText = ref("");
const editedStarRating = ref(0);
let editedCommentID = 0;

const isCurrentUser = (userID) => {
  const currentUserID = localStorage.getItem("userId");
  return userID == currentUserID;
};

const openEditPopup = (comment) => {
  editedComment = comment;
  editedCommentText.value = comment.commentText;
  editedStarRating.value = comment.starRating;
  editedCommentID = comment.comment_id;
  editPopupVisible.value = true;
};

const closeEditPopup = () => {
  editPopupVisible.value = false;
};

const saveEditedComment = async () => {
  if (editedComment) {
    let userId = localStorage.getItem("userId");
    let commentID = editedCommentID;
    let commentText = editedCommentText.value;
    let starRating = editedStarRating.value;

    try {
      await store.dispatch("updateComment", {
        userID: userId,
        commentID,
        commentText,
        starRating,
      });
      emit("commentUpdated");
      editPopupVisible.value = false;
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Kommentre", error);
    }
  }
};

const deleteComment = async (commentID) => {
  const currentUserID = localStorage.getItem("userId");
  if (isCurrentUser(currentUserID)) {
    await store.dispatch("deleteComment", {
      comment_id: commentID,
      userID: currentUserID,
    });
    emit("commentDeleted");
  } else {
    console.error("Nur Autoren des Kommentars können löschen.");
  }
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("de-DE", options);
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
}
.reviewsContainer {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.review {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .reviewHeader {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .reviewDate {
      margin-right: auto;
      font-weight: bold;
      color: #555;
    }

    .reviewStars {
      margin-right: 10px;

      i {
        color: #ffc107;
        font-size: 18px;
      }
    }

    .reviewName {
      margin-left: 10px;
      font-weight: bold;
      color: #333;
    }

    .edit-btn {
      background-color: #40811b;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      margin-left: 5px;
      cursor: pointer;
    }
    .delete-btn {
      background-color: #b11500;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      margin-left: 5px;
      cursor: pointer;
    }

    .edit-btn:hover,
    .delete-btn:hover {
      background-color: #0056b3;
    }
  }

  .review-text {
    font-size: 16px;
    line-height: 1.6;
    color: #666;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.edit-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 9999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  .edit-popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  .stars {
    display: inline-block;
    margin-bottom: 20px;

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
}
</style>