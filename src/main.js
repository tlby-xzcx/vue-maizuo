import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'  //简化缓存机制，离线缓存，仅在生产环境有效，详情查看笔记17
import router from './router'
import store from './store'
import "lib-flexible";  //淘宝适配所需的
import "@/styles/index.scss";  //引入样式文件
import "@/utils/cpt";
import "@/utils/vant";//引入vant所使用的组件
import { axios } from "@/utils/axios";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
