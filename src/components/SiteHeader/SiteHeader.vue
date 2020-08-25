<template>
  <div class="site-header">
    <div class="site-header-wrapper">
        <div class="header-logo">
          <router-link to="/" class="logo ir"></router-link>
        </div>
        <div class="header-title">
          <h2>{{title}}</h2>
          <p>{{desc}}</p>
        </div>
        <div class="site-topbar">
          <div class="topbar-info">
            <span class="user">
              <a class="user-name">
                <span class="name" v-if="userInfo.userName">{{userInfo.userName}}</span>
                <span class="name" v-else @click="getState(true)">请登录</span>
                <i class="iconfont-arrow-down-mini"></i>
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
            <span class="sep">|</span>
            <router-link :to="{ name: 'orderPage'}">我的订单</router-link>
          </div>
        </div>
    </div>
    <!-- 登录面板 -->
    <login-box :isShow="isShade" @getState="getState"></login-box>
  </div>
</template>

<script>
import LoginBox from "@/components/LoginBox/LoginBox";
export default {
  name: "site-header",
  components: {
    LoginBox,
  },
  props: {
    siteParms: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      title: this.siteParms.title,
      desc: this.siteParms.desc,
      isShade: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios.post(`${this.$api}/users/userInfo`).then((res) => {
        if (res.data.status == "0") {
          console.log("用户信息", res.data.result);
          this.$store.commit("setUserInfo", res.data.result);
        }
      });
    },
    // 退出登录
    handleLogout() {
      this.$axios.post(`${this.$api}/users/logout`).then((response) => {
        let res = response.data;
        if (res.status === "0") {
          this.$store.commit("setUserInfo", res.result);
          this.$router.push({ path: "/" });
        }
      });
    },
    // 设置登录面板显示状态
    getState(e) {
      this.isShade = e;
    },
  },
  computed: {
    // 获取vuex用户信息
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./SiteHeader";
</style>