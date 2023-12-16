import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/vendor/fontawesome-free/css/all.min.css';
import '@/assets/css/sb-admin-2.css';
import '@/assets/css/main.css';


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
