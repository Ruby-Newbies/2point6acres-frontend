import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '~/routers/index.js'
import Conf from './config/config.json';
import store from '~/vuex/store.js'

Vue.prototype.$appConfig = Conf;
Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
