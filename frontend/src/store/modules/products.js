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

  },
  deleteProduct(state, productId) {
    state.products = state.products.filter(product => product.id !== productId);
  },
  updateProduct(state, updatedProduct) {
    const index = state.products.findIndex(product => product.id  === updatedProduct.id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },
  addProduct(state, newProduct) {
    state.products.push(newProduct);
  }
};

const actions = {
  async fetchProducts({
    commit
  }) {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const {
        products
      } = await response.json();
      commit('setProducts',  products);
    } catch (error) {
      console.error('Error beim fetchen des produktes', error);
    }
  },
  async fetchSingleProduct({
    commit
  }, productId) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`);
      const {
        product
      } = await response.json();
      commit('setSingleProduct',  product);
    } catch (error) {
      console.error('Error fetchen von SingleProduct:', error);
    }
  },
  async addProductWithImage({
    commit
  }, formData) {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `${localStorage.getItem('jwtToken')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newProduct = await response.json();
        commit('addProduct', newProduct);
      } else {
        throw new Error('Fehler beim hinzufügen von Produkt');
      }
    } catch (error) {
      console.error( error);
    }
  },
  async updateProductWithoutImage({
    commit
  }, product) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        commit('updateProduct', updatedProduct);
      } else {
        throw new Error('Fehler beim Updaten eines Produktes');
      }
    } catch (error) {
      console.error( error);
    }
  },
  async updateProductWithImage({
    commit
  }, {
    id,
    formData
  }) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${localStorage.getItem('jwtToken')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        commit('updateProduct', updatedProduct);
      } else {
        throw new Error('Fehler beim Updaten des Produktes');
      }
    } catch (error) {
      console.error( error);
    }
  },
  async deleteProduct({
    commit
  }, productId) {
    try {
      console.log(productId);
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        headers: {
          'Authorization': `${localStorage.getItem('jwtToken')}`,
        },
        method: 'DELETE',
      });

      if (response.ok) {
        commit('deleteProduct', productId);
      } else {
        throw new Error('Fehler beim löschen eines Produktes');
      }
    } catch (error) {
      console.error( error);
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