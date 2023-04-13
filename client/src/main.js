import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './routers/index'
import store from './store/index'
import axios from 'axios'
import api from './network/api'

axios.defaults.baseURL = 'http://localhost:8080'

Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.use(Element, { size: 'small', zIndex: 3000 });

Vue.prototype.$api = api

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

