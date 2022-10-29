import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index.js'
import store from '../store/index.js'
import http from 'axios'
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http
new Vue({
  store,
  render: (h) => h(App),
  router,
}).$mount('#app')
