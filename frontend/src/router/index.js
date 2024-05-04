import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView';
import CartView from '../views/CartView.vue';
import LoginRegisterView from '../views/LoginRegisterView.vue';
import DahsbordView from  '../views/DashbordViwe.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product/:id',
    name: 'SingleProduct',
    component: ProductView
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView
  },
  {
    path: '/register',
    name: 'LoginRegisterView',
    component: LoginRegisterView
  },
  {
    path: '/dashbord',
    name: 'DahsbordView ',
    component: DahsbordView ,
    meta: { requiresAdmin: true }
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});





export default router
