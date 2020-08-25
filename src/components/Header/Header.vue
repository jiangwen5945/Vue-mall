
<template>
  <div class="Header">
    <!--顶部地址导航-->
    <div class="topbar-wrapper">
      <div id="site-topbar">
        <div class="lside">
          <a v-for="(item, index) in siteList" :key="index">{{item}}</a>
        </div>
        <!--购物车部分-->
        <div class="rside">
          <span v-if="!userName">
            <a @click="isShow(true)">登录</a>
            <router-link to="./Regist">注册</router-link>
          </span>

          <span v-else class="user">
            <a href="#" class="user-name">
              <span class="name">{{userName}}</span>
              <i class="iconfont icon-unfold"></i>
            </a>
            <div class="user-menu-wrapper">
              <ul class="user-menu">
                <li>
                  <router-link :to="{ name: 'userCenter'}">个人中心</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'commentPage'}">评价晒单</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'favoritePage'}">我的收藏</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'userInfoPage'}">账户信息</router-link>
                </li>
                <li>
                  <a @click="handleLogout">退出登录</a>
                </li>
              </ul>
            </div>
          </span>

          <router-link :to="{ path: 'userCenter/messagePage'}">消息通知</router-link>
          <router-link :to="{ path: 'userCenter/orderPage'}">我的订单</router-link>
          <div
            class="shopping_car"
            @click="toCart"
            @mouseenter="setCartListStatu(true)"
            @mouseleave="setCartListStatu(false)"
          >
            <span>
              <i class="iconfont icon-cart"></i>
              <a>购物车（{{cartList.count || 0}}）</a>
            </span>

            <!--购物车下拉隐藏菜单-->
            <div class="menu" :style="menuStyle">
              <ul class="cart-list" v-if="cartList.count">
                <li class="cart-item" v-for="(item,index) in newCartList" :key="index">
                  <a class="thumb">
                    <img :src="item.productImgUrl" alt />
                  </a>
                  <a class="name">{{item.productName}}</a>
                  <a class="price">{{item.productPrice}} × {{item.productNum}}</a>
                </li>
              </ul>
              <ul class="cart-list" v-else>
                <li class="cart-item" style="padding: 20px ">购物车中还没有商品，赶紧选购吧！</li>
              </ul>
            </div>
            <!--购物车下拉菜单结束-->
          </div>
        </div>
      </div>
    </div>

    <!-- 登录面板 -->
    <login-box :show.sync="show"></login-box>
  </div>
</template>

<script>
import "./Header.css";
import Tag from "@/components/Tag/Tag.vue";
import LoginBox from "@/components/LoginBox/LoginBox";
export default {
  name: "Header",
  props: {
    siteList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  // provide() {
  //   return {
  //     isShow: this.isShow
  //   };
  // },
  data() {
    return {
      menuStyle: {
        height: "0px",
      },
      show: false,
    };
  },
  components: {
    Tag,
    LoginBox,
  },
  mounted() {
    this.init();
  },
  computed: {
    cartList() {
      let cartList = this.$store.state.userInfo.cartList;
      return cartList ? cartList : [];
    },
    // 将cartList对象转为数组，并去除count属性的元素
    newCartList() {
      let arr = [],
        cartList = this.cartList;
      for (const key in cartList) {
        if (cartList.hasOwnProperty(key)) {
          if (key != "count") {
            arr.push(cartList[key]);
          }
        }
      }
      return arr;
    },
    userName: {
      get: function () {
        console.log("this.$store.state.userInfo", this.$store.state.userInfo);
        return this.$store.state.userInfo.userName;
      },
      set: function (newValue) {
        this.$store.state.userInfo.userName = newValue;
      },
    },
  },
  methods: {
    init() {
      this.checkLogin(); // 检测用户是否登陆
      this.getUserInfo(); // 获取用户信息
    },
    setCartListStatu(e) {
      if (e) {
        let count = this.newCartList.length;
        this.menuStyle.height = count == 0 ? "70px" : count * 90 + "px";
      } else {
        this.menuStyle.height = 0;
      }
    },
    // 设置登录面板显示状态
    isShow(e) {
      this.show = e;
    },
    // 退出登录
    handleLogout() {
      this.$axios.post(`${this.$api}/users/logout`).then((response) => {
        let res = response.data;
        if (res.status === "0") {
          this.$store.dispatch("setLoginInfo", false); //设置登录状态为false
          this.$store.commit("setUserInfo", res.result); // 接收后台返回的空对象，清空用户数据
        }
      });
    },
    // 检测登录
    checkLogin() {
      this.$axios.get(`${this.$api}/users/checkLogin`).then((res) => {
        if (res.data.status == "0") {
          // 异步时使用action的dispatch
          this.$store.dispatch("setLoginInfo", true);
        }
      });
    },
    // 获取用户信息
    getUserInfo() {
      this.$axios.post(`${this.$api}/users/userInfo`).then((res) => {
        if (res.data.status == "0") {
          console.log("当前用户信息", res.data.result);
          this.$store.commit("setUserInfo", res.data.result);
        }
      });
    },
    // 用户未登录时阻止跳转购物车
    toCart() {
      if (this.userName) {
        this.$router.push({ path: "Cart" });
      } else {
        alert("用户未登录");
      }
    },
  },
};
</script>