// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './APP.vue'
import router from './router'
import store from './store/index'
import TopHeader from './components/TopHeader/TopHeader.vue'
import CartControl from './components/CartControl/CartControl.vue'
import './mock/mockServer'

Vue.component('TopHeader', TopHeader)
Vue.component(Button.name, Button)
Vue.component('CartControl',CartControl)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>',
  render:h=> h(App),
  store
})
