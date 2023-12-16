import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import OrdersView from '../views/OrdersView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import NewItemView from '../views/NewItemView.vue'
import NewCategoryView from '../views/NewCategoryView.vue'
import EditItemView from '../views/EditItemView.vue'
import EditCategoryView from '../views/EditCategoryView.vue'
import EditOrderView from '../views/EditOrderView.vue'
import NewOrderView from '../views/NewOrderView.vue'


Vue.use(VueRouter)

// const routes: Array<RouteConfig> = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
// ]

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView
  },
  {
    path: '/new-item',
    name: 'new-item',
    component: NewItemView
  },
  {
    path: '/new-category',
    name: 'new-category',
    component: NewCategoryView
  },
  {
    path: '/new-order',
    name: 'new-order',
    component: NewOrderView
  },
  {
    path: '/item/:id',
    name: 'edit-item',
    component: EditItemView,
    props: true
  },
  {
    path: '/category/:id',
    name: 'edit-category',
    component: EditCategoryView,
    props: true
  },
  {
    path: '/order/:id',
    name: 'edit-order',
    component: EditOrderView,
    props: true
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
