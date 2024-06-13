import jwt_decode from 'jwt-decode';

const state = {
  token: localStorage.getItem('jwtToken') || null,
  userId: localStorage.getItem('userId') || null,
  userRole: localStorage.getItem('userRole') || null
};

const getters = {
  isLoggedIn: state => state.token !== null,
  user: state => {
    return {
      id: state.userId,
      role: state.userRole
    };
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
        const decodedToken = jwt_decode(data.token);
        commit('setUserDetails', { token: data.token, id: decodedToken.id, role: decodedToken.role });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
      throw error;
    }
  },
  logout({ commit }) {
    commit('clearUserData');
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
        const decodedToken = jwt_decode(data.token);
        commit('setUserDetails', { token: data.token, id: decodedToken.id, role: decodedToken.role });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Registration fehlgeschlagen:', error);
      throw error;
    }
  },
};

const mutations = {
  setUserDetails(state, { token, id, role }) {
    state.token = token;
    state.userId = id;
    state.userRole = role;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userId', id);
    localStorage.setItem('userRole', role);
  },
  clearUserData(state) {
    state.token = null;
    state.userId = null;
    state.userRole = null;
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
