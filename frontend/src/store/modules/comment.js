const state = {
  comments: [],
  averageStar: {},
};

const mutations = {
  setComments(state, payload) {
    state.comments = payload;
  },
  setAverageStar(state, {
    productId,
    averageStar
  }) {
    state.averageStar = {
      ...state.averageStar,
      [productId]: averageStar
    };
  },
  addComment(state, comment) {
    state.comments.push(comment);
  },
};

const actions = {
  async fetchComments({
    commit
  }, productId) {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${productId}`);
      const {
        comments
      } = await response.json();
      commit('setComments', comments);
    } catch (error) {
      console.error('Fehler beim fetchen der Kommentare:', error);
    }
  },
  async fetchAverageStar({
    commit
  }, productId) {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/star/${productId}`);
      const data = await response.json();
      const avgRating = data.rating[0].avgRating;
      commit('setAverageStar', {
        productId,
        averageStar: avgRating
      });
    } catch (error) {
      console.error("Fehler beim fetchen derdurchschnitlichen Sterne :", error);
    }
  },
  async addComment({
    commit
  }, {
    productId,
    comment,
    star
  }) {
    try {
      console.log(comment);
      const userId = localStorage.getItem('userId');
      const commentData = {
        userID: userId,
        productID: productId,
        commentText: comment,
        starRating: star,
      };
      console.log(commentData);
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
      console.error('Fehler beim hinzufügen des Kommentares :', error);
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
  getters
};