import {
  createRouter,
  createWebHistory
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView';
import CartView from '../views/CartView.vue';
import DahsbordView from '../views/DashbordViwe.vue';
import RegisterUser from '@/components/Auth/RegisterUser.vue';
import LoginUser from '@/components/Auth/LoginUser.vue';
import store from '@/store';

const routes = [{
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
    name: 'Register',
    component: RegisterUser
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginUser
  },
  {
    path: '/dashboard',
    name: 'DahsbordView',
    component: DahsbordView,
    meta: {
      requiresAdmin: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    console.log(store.getters.user.role)
    const userRole = store.getters.user.role;
    console.log(userRole);
    if (userRole === 'admin') {
      next();
    } else {
      next({
        name: 'home'
      });
    }
  } else {
    next();
  }
});





export default router