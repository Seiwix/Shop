import jwt_decode from 'jwt-decode';

const state = {
  token: localStorage.getItem('jwtToken') || null
};

const getters = {
  isLoggedIn: state => state.token !== null,
  user: state => {
    if (state.token) {
      return jwt_decode(state.token); 
    } else {
      return null;
    }
  }
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (response.ok) {
        commit('setUser', jwt_decode(data.token));
        commit('setToken', data.token);
        localStorage.setItem('jwtToken', data.token);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout({ commit }) {
    commit('setUser', null);
    commit('setToken', null);
    localStorage.removeItem('jwtToken');
  },
  async register({ commit }, userData) {
    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        commit('setUser', jwt_decode(data.token)); 
        commit('setToken', data.token); 
        localStorage.setItem('jwtToken', data.token); 
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};


