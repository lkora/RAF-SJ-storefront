"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const App_vue_1 = __importDefault(require("./App.vue"));
const router_1 = __importDefault(require("./router"));
require("@/assets/vendor/fontawesome-free/css/all.min.css");
require("@/assets/css/sb-admin-2.css");
require("@/assets/css/main.css");
vue_1.default.config.productionTip = false;
new vue_1.default({
    router: router_1.default,
    render: h => h(App_vue_1.default)
}).$mount('#app');
//# sourceMappingURL=main.js.map