import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    // name: 'Home',
    component: Home,
    children: [
      {
        path: '/wants',
        component: () => import('../views/Banner.vue')
      },
      {
        path: '/shop',
        component: () => import('../views/Shop.vue')
      },
      {
        path: '/cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/Product.vue')
      }
    ]
  },
  {
    path: '/back',
    component: () => import('@/views/Back.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'goods',
        component: () => import('@/views/Goods.vue')
      },
      {
        path: 'coupons',
        component: () => import('@/views/Coupons.vue')
      },
      {
        path: 'orders',
        component: () => import('@/views/Orders.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
