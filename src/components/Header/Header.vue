
<template>
  <div class="Header">
    <!--顶部地址导航-->
    <div class="topbar-wrapper">
      <div id="site-topbar">
        <div class="lside">
          <a href="#" v-for="(item, index) in siteList" :key="index">{{item}}</a>
        </div>
        <!--购物车部分-->
        <div class="rside">
          <a @click="showLoginPanel">登录</a>
          <!-- 声明式路由 -->
          <router-link to="./Regist">注册</router-link>
          <!-- <a href="./Regist">注册</a> -->
          <a href="#">消息通知</a>
          <div class="shopping_car">
            <div class="title">
              <i class="iconfont icon-gouwuchekong"></i>
              <a>购物车（0）</a>
            </div>
            <!--购物车下拉隐藏菜单-->
            <div class="menu">
              <p>购物车中还没有商品，赶紧选购吧！</p>
            </div>
            <!--购物车下拉菜单结束-->
          </div>
        </div>
      </div>
    </div>
    <!--头部商品导航-->
    <div class="header-wrapper">
      <div id="site-header">
        <!--左侧logo区-->
        <div class="logo">
          <router-link to="/">
            <img src="https://dummyimage.com/56x56/f27998" />
          </router-link>
        </div>
        <!-- 商品标题 -->
        <ul id="header-nav">
          <li
            @mouseenter="showMenu"
            @mouseleave="hideMenu"
            v-for="(items,index) in goodsList"
            :key="index"
            :data-index="index"
          >
            <a href class="title">{{items.title}}</a>
            <transition name="slide-fade">
              <div class="menu-wrapper" v-show="isShow === index">
                <div class="menu-list">
                  <div href class="menu-item" v-for="(item,index) in items.menuList" :key="index">
                    <tag :tag="item.tag" v-if="item.tag"></tag>
                    <img :src="item.imgUrl" />
                    <a>{{item.title}}</a>
                    <p class="price">{{item.price}}</p>
                  </div>
                </div>
              </div>
            </transition>
          </li>
        </ul>
        <!--右边查询区-->
        <div class="search" id="search">
          <input type="text" class="text" />
          <i class="icon iconfont icon-fangdajing"></i>

          <p class="tags">
            <a href>查询记录 1</a>
            <a href>查询记录 2</a>
          </p>
        </div>
      </div>
    </div>

    <!-- 登录面板 -->
    <login-box :isShow="isShade" @getState="getState"></login-box>
  </div>
</template>

<script>
import "./Header.css";
import Tag from "@/components/Tag/Tag.vue";
import LoginBox from "@/components/LoginBox/LoginBox";
export default {
  name: "Header",
  props: {
    goodsList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    siteList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      isShow: NaN,
      isShade: false
    };
  },
  components: {
    Tag,
    LoginBox
  },
  methods: {
    showMenu(e) {
      this.isShow = parseInt(e.target.dataset.index);
    },
    hideMenu() {
      this.isShow = NaN;
    },
    showLoginPanel() {
      this.isShade = true;
    },
    getState(e) {
      this.isShade = e;
    }
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
