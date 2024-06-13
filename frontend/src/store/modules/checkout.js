const state = {
  checkouts: [],
};

const getters = {
  checkouts: state => state.checkouts,
};

const mutations = {
  SET_CHECKOUTS(state, checkouts) {
    state.checkouts = checkouts;
  },
  ADD_CHECKOUT(state, checkout) {
    state.checkouts.push(checkout);
  },
};

const actions = {
  async createCheckout({ commit }, checkoutData) {
    try {
      const response = await fetch('http://localhost:3000/api/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });
      if (response.status === 201) {
        commit('ADD_CHECKOUT', checkoutData);
        return { message: 'Checkout erfolgreich abgeschlossen' };
      }
    } catch (error) {
      return { message: `Fehler beim Erstellen des Checkouts: ${error.message}` };
    }
  },
  async fetchAllCheckouts({ commit }) {
    try {
      const response = await fetch('http://localhost:3000/api/checkout/');
      const data = await response.json();
      commit('SET_CHECKOUTS', data);
    } catch (error) {
      console.error(`Fehler beim Abrufen der Checkouts: ${error.message}`);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};