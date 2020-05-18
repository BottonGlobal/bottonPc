import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'
import i18n from './i18n/i18n'
import { bus } from './bus';
import AppHeader from './components/header'
import AppAlert from './components/appAlert'
import AppPasword from './components/appPassword'
import Echarts from 'echarts'
import VueClipboard from 'vue-clipboard2'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from 'axios'
import DES3 from './des3'
Vue.config.productionTip = false
Vue.prototype.$Echarts = Echarts;
Vue.prototype.$bus = bus;
Vue.prototype.$http = http;
Vue.prototype.$DES3 = DES3
// Vue.prototype.$host1 = 'http://testnodeserver.botton.io';
// Vue.prototype.$host2 = 'http://testnode.botton.io';
Vue.prototype.$host1 = 'https://twodownload.botton.io';
Vue.prototype.$host2 = 'https://twodownload.botton.io';

// import 'amfe-flexible'
Vue.use(AppHeader)
Vue.use(AppAlert)
Vue.use(AppPasword)
Vue.use(i18n)
Vue.use(VueClipboard)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
