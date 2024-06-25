const state = {
  checkouts: [],
};

const getters = {
  checkouts: state => state.checkouts,
};

const mutations = {
 setCheckouts(state, checkouts) {
    state.checkouts = checkouts;
  },
 addCheckout(state, checkout) {
    state.checkouts.push(checkout);
  },
};

const actions = {
  async createCheckout({
    commit
  }, checkoutData) {
    try {
      const response = await fetch('http://localhost:3000/api/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(checkoutData),
      });
      if (response.status === 201) {
        commit('addCheckout', checkoutData);
        return {
          message: 'checkout erfolgrereich abgeschlossen'
        };
      }
    } catch (error) {
      return {
        message: `fehler beim erstellen des Checkoutes: ${error.message}`
      };
    }
  },
  async fetchAllCheckouts({
    commit
  }) {
    try {
      const response = await fetch('http://localhost:3000/api/checkout/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('jwtToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Response nicht ok');
      }

      const data = await response.json();
      commit('setCheckouts', data);
    } catch (error) {
      console.error(`Fehler beim Abrufen der Checkouts: ${error.message}`);
    }
  },
  async fetchCheckoutsByUserID({
    commit
  }, payload) {
    try {
      const response = await fetch(`http://localhost:3000/api/checkout/${payload.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('jwtToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Netzwerk Fehler');
      }

      const data = await response.json();
      commit('setCheckouts', data);
    } catch (error) {
      console.error(`fehler beim beim Abrufen des Checkouts${error.message}`);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};