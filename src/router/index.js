import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 主页
    path: '/',
    name: 'Index',
    components: {
      default: Index
    }
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
    path: '*',
    name: 'Error-404',
    component: ()=>import('../views/Error-404')
  }
  // {
  //   path: '/user/:id',
  //   name: 'user',
  //   props: true,
  //   component: () => import('../views/User'),
  //   children: [
  //     {
  //       path: 'aoo',
  //       // component: Aoo
  //       component: () => import('../views/Regist.vue'),
  //     },
  //     {
  //       path: 'foo',
  //       // component: Foo
  //       component: () => import('../views/Regist.vue'),
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
