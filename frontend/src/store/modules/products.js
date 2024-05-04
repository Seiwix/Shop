const state = {
  products: [],
  singleProduct: null
};

const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  setSingleProduct(state, payload) {
    state.singleProduct = payload;
  }
};

const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const { products } = await response.json(); 
      commit('setProducts', products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  async fetchSingleProduct({ commit }, productId) {
    try {
      console.log(productId);
      const response = await fetch(`http://localhost:3000/api/products/${productId}`);
      const { product} = await response.json(); 
      commit('setSingleProduct', product);
    } catch (error) {
      console.error('Error fetching single product:', error);
    }
  }
};

const getters = {
  getProducts: state => state.products,
  getSingleProduct: state => state.singleProduct
};

export default {
  state,
  mutations,
  actions,
  getters
};