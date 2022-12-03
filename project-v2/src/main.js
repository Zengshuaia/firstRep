import Vue from 'vue'
import App from './App.vue'
import '../plugins/element'
import 'font-awesome/css/font-awesome.min.css'
// import axios from 'axios'
import router from '../src/router/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Service from '../src/service.js'
import echarts from 'echarts'

Vue.use(Element);
Vue.prototype.$echarts=echarts;
// Vue.prototype.$axios=axios;//挂載到原型上
Vue.prototype.service=Service;//挂載到原型上
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(!localStorage.getItem('username')){//判断有没有用户名
    if(to.path!=='/Login')//如果跳转的路由不是登录页
    {
      next('/Login')//就强制跳转到登录页
    }else next()
  }next();
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


