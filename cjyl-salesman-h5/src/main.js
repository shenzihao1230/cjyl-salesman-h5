import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Calendar from 'vue2-datepick';
import { Toast } from 'vant';
// import {WechatPlugin} from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/index.css'


// Vue.use(WechatPlugin);
Vue.use(Calendar);
Vue.use(Toast);
Vue.config.productionTip = false
Vue.use(ElementUI);
// console.log(Vue.wechat);

// 跨域配置
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'        //关键代码


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
