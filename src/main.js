import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import { currency } from "@/util/currency" // 全局过滤器引入
import common from "@/util/common" //引入工具类函数
import Vuex from "vuex"  //引入vuex

import '@/assets/css/reset.css'
import '@/assets/css/variable.css'
import '@/assets/css/index.css'

axios.defaults.withCredentials=true //允许axios携带cookies

// vue滚动插件
Vue.use(infiniteScroll)
Vue.use(Vuex) // 使用vuex
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$thorttle = common.thorttle
Vue.prototype.$dateFormat = common.dateFormat
Vue.prototype.$getCookie = common.getCookie
Vue.prototype.$api = process.env.VUE_APP_API_URL

Vue.filter("currency", currency) // 全局过滤器使用
Vue.use(VueLazyload, {
  loading: require('@/assets/imgs/loading-spinning-bubbles.svg'),
})

// Vue.prototype.$api = 
console.log('process.env.VUE_APP_API_URL',process.env.VUE_APP_API_URL);


const store = new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: null
  },
  mutations: {
    setLoginInfo(state,status){
      state.isLogin = status
    },
    // 加入购物车
    addCartList(state, num) {
      state.userInfo.cartList.count += num
      console.log('state.cartList.count:', state.userInfo.cartList.count);
    },

    // 设置用户数据
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      // 计算购物车商品数量
      if (state.userInfo) {
        // 创建一个新的带有count属性的对象保持vue对对象属性对监听（vue只会跟踪所有在对象创建时就存在的属性）
        let newCartList = Object.assign({},state.userInfo.cartList, { count: 0 })
        // 遍历购物车商品数量累加到count属性
        for (const key in newCartList) {
          if (newCartList.hasOwnProperty(key) && newCartList[key]['productNum']) { // count属性不参与遍历
            newCartList.count += newCartList[key]['productNum'];
          }
        }
        state.userInfo.cartList = newCartList
      }
    }
  },
  actions: {
    setLoginInfo(context,e){
      context.commit('setLoginInfo',e)
    }
  }

})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
