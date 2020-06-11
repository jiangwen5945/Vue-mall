import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

import '@/assets/css/reset.css'
import '@/assets/css/variable.css'
import '@/assets/font/font_icon/iconfont.css'
import '@/assets/font/font_icon2/iconfont2.css'
// import '@/assets/css/index.css'

Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.use(VueLazyload,{
  loading: require('@/assets/imgs/loading-spinning-bubbles.svg'),
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
