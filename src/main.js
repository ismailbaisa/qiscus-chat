import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qiscus from './services/qiscus';
import './assets/scss/styles.scss';

Vue.prototype.qiscus = qiscus;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
