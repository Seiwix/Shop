import { createStore } from 'vuex';
import products from './modules/products';
import cart from  './modules/cart';
import user from './modules/auth/user';
import comment from './modules/comment';

export default createStore({
  modules: {
    products,
    cart,
    user,
    comment
  }
});