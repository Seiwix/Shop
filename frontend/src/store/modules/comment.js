const state = {
  comments: [],
  averageStar: {},
};

const mutations = {
  setComments(state, payload) {
    state.comments = payload;
  },
  setAverageStar(state, { productId, averageStar }) {
    state.averageStar = {
      ...state.averageStar,
      [productId]: averageStar,
    };
  },
  addComment(state, comment) {
    state.comments.push(comment);
  },
  updateComment(state, updatedComment) {
    const index = state.comments.findIndex(comment => comment.commentID === updatedComment.commentID);
    if (index !== -1) {
      state.comments.splice(index, 1, updatedComment);
    }
  },
  deleteComment(state, deletedCommentId) {
    state.comments = state.comments.filter(comment => comment.commentID !== deletedCommentId);
  },
};

const actions = {
  async fetchComments({ commit }, productId) {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${productId}`);
      const { comments } = await response.json();
      commit('setComments', comments);
    } catch (error) {
      console.error('Fehler beim fetchen der Kommentare:', error);
    }
  },
  async fetchAverageStar({ commit }, productId) {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/star/${productId}`);
      const data = await response.json();
      const avgRating = data.rating[0].avgRating;
      commit('setAverageStar', {
        productId,
        averageStar: avgRating,
      });
    } catch (error) {
      console.error("Fehler beim fetchen der durchschnittlichen Sterne:", error);
    }
  },
  async addComment({ commit }, { productId, comment, star }) {
    try {
      const userId = localStorage.getItem('userId');
      const commentData = {
        userID: userId,
        productID: productId,
        commentText: comment,
        starRating: star,
      };
      const response = await fetch(`http://localhost:3000/api/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(commentData),
      });
      const newComment = await response.json();
      commit('addComment', newComment);
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Kommentars:', error);
    }
  },
  async updateComment({ commit }, { userID, commentID, commentText, starRating }) {
    try {
      console.log(userID, commentID, commentText, starRating);
      const response = await fetch(`http://localhost:3000/api/comments/${commentID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, commentID, commentText, starRating }),
      });
      const updatedComment = await response.json();
      console.log(updatedComment);
      commit('updateComment', updatedComment);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Kommentars:', error);
    }
  },
  async deleteComment({ commit }, { comment_id, userID }) {
    
    try {
      const response = await fetch(`http://localhost:3000/api/comments/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment_id, userID }),
      });
      const { commentID } = await response.json();
      commit('deleteComment', commentID);
    } catch (error) {
      console.error('Fehler beim Löschen des Kommentars:', error);
    }
  },
};

const getters = {
  getComments: state => state.comments,
  getAverageStar: (state) => (productId) => {
    return state.averageStar[productId] || 0;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};