// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import {createStore} from './vuex/index'


//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)// i18n
})
// i18n
import i18n from './i18n/i18n'
Vue.config.productionTip = false;
// vuex
Vue.use(Vuex);
const store=createStore();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  i18n
});

