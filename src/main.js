// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 1、 引入reset.css 
import "./assets/css/reset.css"

// 2、引入公用组件
import Components from "./components"
for (let i in Components) {
  Vue.component(i, Components[i])
}

// 3、引入公用过滤器
import Filters from "./filters"
for (let i in Filters) {
  Vue.filter(i, Filters[i])
}

// 4、引入仓库
import store from "./store"

// 6、引入element-ui 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 公用地址
// Vue.prototype.$preImg = "http://localhost:3000";
Vue.prototype.$preImg = "";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 挂载仓库
  components: { App },
  template: '<App/>'
})
