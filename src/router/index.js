import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)
const routes = [
  {
    // 主页
    path: '/',
    name: 'index',
    components: {
      default: Index
    },
    meta: { title: '首页' }
  },
  {
    // 注册界面
    path: '/Regist',
    name: 'Regist',
    alias: '/b', // 别名
    component: () => import(/* webpackChunkName: "about" */ '../views/Regist.vue')
  },
  {
    // 商品详情页
    path: '/GoodsDetails',
    name: 'GoodsDetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/GoodsDetails.vue')
  },
  {
    // 分类全部商品列表
    path: '/Classify',
    name: 'Classify',
    component: () => import(/* webpackChunkName: "about" */ '../views/Classify.vue')
  },
  {
    // 购物车
    path: '/Cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart/index.vue')
  },
  {
    // 结算支付
    path: '/Confirm',
    name: 'Confirm',
    component: () => import(/* webpackChunkName: "about" */ '../views/Confirm/index.vue')
  },
  {
    // 支付成功
    path: '/payStatus',
    name: 'payStatus',
    component: () => import(/* webpackChunkName: "about" */ '../views/payStatus/index.vue')
  },
  {
    // 收货地址
    path: '/Address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "about" */ '../views/Address/index.vue')
  },
  {
    // 用户中心
    path: '/userCenter',
    name: 'userCenter',
    redirect:'/userCenter/homePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/userCenter/index.vue'),
    meta: { title: '个人中心' },
    children: [
      {
        path: 'homePage',
        name:'homePage',
        component: () => import('../views/userCenter/homePage.vue'),
      },
      {
        path: 'orderPage',
        name:'orderPage',
        component: () => import('../views/userCenter/orderPage'),
        meta: { title: '我的订单' }
      },{
        path: 'orderView',
        name: 'orderView',
        component:()=>import('../views/userCenter/orderView'),
        meta: { title: '订单详情' }
      },
      {
        path: 'messagePage',
        name: 'messagePage',
        component:()=>import('../views/userCenter/messagePage'),
        meta: { title: '消息通知' }
      },
      {
        path: 'addressPage',
        name: 'addressPage',
        component:()=>import('../views/userCenter/addressPage'),
        meta: { title: '收货地址' }
      },
      {
        path: 'commentPage',
        name: 'commentPage',
        component:()=>import('../views/userCenter/commentPage'),
        meta: { title: '订单评论' }
      },
      {
        path: 'couponPage',
        name: 'couponPage',
        component:()=>import('../views/userCenter/couponPage'),
        meta: { title: '优惠券' }
      },
      {
        path: 'favoritePage',
        name: 'favoritePage',
        component:()=>import('../views/userCenter/favoritePage'),
        meta: { title: '我的收藏' }
      },
      {
        path: 'recordPage',
        name: 'recordPage',
        component:()=>import('../views/userCenter/recordPage'),
        meta: { title: '服务记录' }
      },
      {
        path: 'applyPage',
        name: 'applyPage',
        component:()=>import('../views/userCenter/applyPage'),
        meta: { title: '申请记录' }
      },
      {
        path: 'userInfoPage',
        name: 'userInfoPage',
        component:()=>import('../views/userCenter/userInfoPage'),
        meta: { title: '个人信息' }
      },
      {
        path: 'passwordPage',
        name: 'passwordPage',
        component:()=>import('../views/userCenter/passwordPage'),
        meta: { title: '修改密码' }
      },
      
    ]
  },

  // 404页面
  {
    path: '*',
    name: 'Error-404',
    component: () => import('../views/Error-404')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
