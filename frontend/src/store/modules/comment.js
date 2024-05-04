const state = {
    comments: [],
    averageStar:[],
  };
  
  const mutations = {
    setComments(state, payload) {
      state.comments = payload;
    },
    setAverageStar(state,payload){
      state.averageStar = payload;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
    
  };
  
  const actions = {
    async fetchComments({ commit }, productId) {
      try {
        const response = await fetch(`http://localhost:3000/api/comments/${productId}`);
        const {comments}  = await response.json();
        commit('setComments', comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async fetchAverageStar({ commit }, productId) {
      try {
          const response = await fetch(`http://localhost:3000/api/comments/star/${productId}`);
          const data = await response.json();
          const avgRating = data.rating[0].avgRating; // Extrahiere den Durchschnittswert der Sterne
          commit('setAverageStar', avgRating);
      } catch (error) {
          console.error("Error in fetching average star:", error);
      }
  },
    async addComment({ commit }, { productId, commentData }) {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
          body: JSON.stringify(commentData),
        });
        const newComment = await response.json();
        commit('addComment', newComment);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
  };
  
  const getters = {
    getComments: state => state.comments,
    getAverageStar: state => state.averageStar,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  };