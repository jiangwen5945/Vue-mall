<template>
  <div class="page-main">
    <site-header :siteParms="siteParms"></site-header>
    <Crumbs></Crumbs>
    <main>
      <!-- 左侧菜单栏 -->
      <div class="menu-wrapper">
        <div class="menu-box">
          <h3 class="title">订单中心</h3>
          <ul class="list">
            <li>
              <router-link to="/userCenter/orderPage">我的订单</router-link>
            </li>
            <li>
              <a></a>
              <router-link to="/userCenter/commentPage">评价晒单</router-link>
            </li>
          </ul>
        </div>
        <div class="menu-box">
          <h3 class="title">个人中心</h3>
          <ul class="list">
            <li>
              <router-link to="/userCenter/messagePage">消息通知</router-link>
            </li>
            <li>
              <router-link to="/userCenter/addressPage">收货地址</router-link>
            </li>
            <li>
              <router-link to="/userCenter/couponPage">优惠券</router-link>
            </li>
            <li>
              <router-link to="/userCenter/favoritePage">我的收藏</router-link>
            </li>
          </ul>
        </div>
        <div class="menu-box">
          <h3 class="title">售后服务</h3>
          <ul class="list">
            <li>
              <router-link to="/userCenter/recordPage">服务记录</router-link>
            </li>
            <li>
              <router-link to="/userCenter/applyPage">申请服务</router-link>
            </li>
          </ul>
        </div>
        <div class="menu-box">
          <h3 class="title">账户管理</h3>
          <ul class="list">
            <li>
              <router-link to="/userCenter/userInfoPage">个人信息</router-link>
            </li>
            <li>
              <router-link to="/userCenter/passwordPage">修改密码</router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容区域 -->
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>

    <Footer></Footer>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import Footer from "@/components/Footer/Footer";
import Crumbs from "@/components/Crumbs/Crumbs";
export default {
  name: "user",
  components: {
    SiteHeader,
    Footer,
    Crumbs,
  },
  data() {
    return {
      siteParms: {
        title: "个人中心",
        userName: "jiangwen",
        desc: "欢迎回来！",
      },
    };
  },
  computed: {},
  watch: {
    // $route (to, from) {
    //   // 对路由变化作出响应...
    //   this.log()
    //   console.log(to);
    //   console.log(from);
    // }
  },
};
</script>

<style lang="scss" scoped>
.page-main {
  background: #f5f5f5;
}
main {
  width: 1226px;
  margin: 0 auto;
  padding-bottom: 20px;
  overflow: hidden;
  .menu-wrapper {
    width: 234px;
    background: #fff;
    float: left;
    margin-right: 20px;
    min-height: 600px;
    padding-top: 20px;
    .menu-box {
      margin: 0 48px 12px;
      cursor: pointer;
      h3 {
        font-size: 16px;
        font-weight: 400;
        line-height: 52px;
        color: #333;
      }
      ul {
        li {
          padding: 6px 0;
          a {
            color: #757575;
          }
        }
      }
    }
  }
  .content-wrapper {
    min-height: 600px;
    background: #fff;
    border: 1px solid #eee;
    overflow: hidden;
    padding-top: 20px;
    .uc-content-box {
      margin: 0 48px;
      .box-hd {
        .title {
          margin: 0;
          font-size: 30px;
          font-weight: 400;
          line-height: 68px;
          color: #757575;
        }
        .small {
          margin-left: 10px;
          font-size: 12px;
          line-height: 1.5;
        }
        .more {
          border-bottom: 0;
        }
        .filter-list {
          float: left;
          margin: 0;
          padding: 18px 0;
          list-style-type: none;
          font-size: 16px;
          line-height: 1.25;

          li {
            float: left;
            padding: 0 20px;
            border-left: 1px solid #e0e0e0;
            color: #757575;
            &:first-child {
              padding-left: 0;
              border-left: 0;
            }
          }
        }
      }
      .box-bd {
        .empty {
          margin: 40px 0;
          font-size: 18px;
          text-align: center;
          color: #b0b0b0;
        }
      }
    }
  }
}
</style>