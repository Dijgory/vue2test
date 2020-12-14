import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/globle.css'
import { config } from 'shelljs';
// require('../mock/kcglzhu.js')

Vue.use(ElementUI);
Vue.config.productionTip = false
// const url='http://192.168.1.108:8080'
// const url='http://192.168.43.222:8080'
// const url='http://localhost:8080'
const url='http://teachmanagesystem.free.idcfengye.com'
Vue.prototype.$http = axios

axios.interceptors.request.use(config=>{
  if (config.url.indexOf(url) === -1) {
    config.url = url + config.url;
    console.log(config)
   }
  return config
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
