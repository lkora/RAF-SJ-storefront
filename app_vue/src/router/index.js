"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vue_router_1 = __importDefault(require("vue-router"));
const HomeView_vue_1 = __importDefault(require("../views/HomeView.vue"));
const CatalogView_vue_1 = __importDefault(require("../views/CatalogView.vue"));
const OrdersView_vue_1 = __importDefault(require("../views/OrdersView.vue"));
const CategoriesView_vue_1 = __importDefault(require("../views/CategoriesView.vue"));
vue_1.default.use(vue_router_1.default);
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
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView_vue_1.default
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: CatalogView_vue_1.default
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersView_vue_1.default
    },
    {
        path: '/categories',
        name: 'categories',
        component: CategoriesView_vue_1.default
    },
];
const router = new vue_router_1.default({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
exports.default = router;
//# sourceMappingURL=index.js.map