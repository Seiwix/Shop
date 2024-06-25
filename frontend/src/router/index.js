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
import Checkout from '../views/CheckoutView.vue';
import store from '@/store';
import  ProductListDashboard from '@/components/Dashboard/ProductListDachboard.vue';
import  OrdersDashboard from '@/components/Dashboard/OrdersList.vue';
import UserOrder from '@/components/UserOrder.vue';

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
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/orders',
    name: 'UserOrder',
    component: UserOrder
  },
  {
    path: '/dashboard',
    component: DahsbordView,
    meta: { requiresAdmin: true },
    children: [
      
      { path: 'products', name: 'DashboardProducts', component: ProductListDashboard },
      { path: 'orders', name: 'DashboardOrders', component: OrdersDashboard },
     
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    const userRole = store.getters.user.role;
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