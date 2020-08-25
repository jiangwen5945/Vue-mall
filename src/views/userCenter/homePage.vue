<template>
  <div class="page-box">
    <div class="portal-main clearfix">
      <div class="user-card">
        <h2 class="username">{{userInfo.userName}}</h2>
        <p class="greet">{{greetings}}</p>
        <a class="link">修改个人信息</a>
        <i class="iconfont icon-right"></i>

        <img src="../../assets/imgs/default_avatar.png" width="150" height="150" class="avatar" />
      </div>
      <div class="user-actions">
        <ul class="action-list">
          <li>
            账户安全：
            <span class="level level-2">普通</span>
          </li>
          <li>
            绑定手机：
            <span>
              <span class="tel">{{userInfo.tel || '未绑定'}}</span>
            </span>
          </li>
          <li>
            绑定邮箱：
            <span>
              <span class="tel">{{userInfo.email || '未绑定'}}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="portal-sub">
      <ul class="info-list clearfix">
        <li>
          <h3>
            待支付的订单：
            <span class="num">{{waitingPayOrder('1')}}</span>
          </h3>
          <router-link :to="{name:'orderPage',params:{component:'tobePay'}}">查看待支付订单</router-link>
          <i class="iconfont icon-right"></i>
          <div class="icon-box">
            <i class="iconfont icon-pay"></i>
          </div>
        </li>
        <li>
          <h3>
            待收货的订单：
            <span class="num">{{waitingPayOrder('2')}}</span>
          </h3>
           <router-link :to="{name:'orderPage',params:{component:'tobeReceived'}}">查看待收货订单</router-link>
          <i class="iconfont icon-right"></i>
          <div class="icon-box">
            <i class="iconfont icon-deliver_fill"></i>
          </div>
        </li>
        <li>
          <h3>
            待评价商品数：
            <span class="num">{{waitingPayOrder('3')}}</span>
          </h3>
          <router-link :to="{name:'orderPage',params:{component:'tobeComment'}}">查看待评价商品</router-link>
          <i class="iconfont icon-right"></i>
          <div class="icon-box">
            <i class="iconfont icon-edit"></i>
          </div>
        </li>
        <li>
          <h3>
            喜欢的商品：
            <span class="num">{{waitingPayOrder('5')}}</span>
          </h3>
          <router-link to="/userCenter/favoritePage">查看喜欢的商品</router-link>
          <i class="iconfont icon-right"></i>
          <div class="icon-box">
            <i class="iconfont icon-like"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  components: {},
  data() {
    return {};
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
    // 待支付订单数量
    waitingPayOrder(statu) {
      let len = 0;
      if (this.userInfo.orderList) {
        this.userInfo.orderList.forEach((e) => {
          if (e.orderStatus == statu) len++;
        });
      }
      return len;
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    // 问候语
    greetings() {
      let d = new Date().getHours();
      if (6 <= d && d < 11) {
        return "早上好！";
      }
      if (11 <= d && d < 14) {
        return "中午好！";
      }
      if (14 <= d && d < 18) {
        return "下午好！";
      }
      if (18 <= d && d < 24) {
        return "晚上好！";
      }
      if (0 <= d && d < 6) {
        return "夜深了，请注意休息...";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-box {
  padding-top: 24px;
  margin: 0 48px;
  .user-card {
    position: relative;
    float: left;
    width: 302px;
    height: 160px;
    padding-left: 180px;
    padding-top: 40px;
    .username {
      margin: 0;
      font-size: 24px;
      font-weight: 400;
      color: #616161;
    }
    .greet {
      margin: 0 0 10px;
      color: #b0b0b0;
    }
    .link {
      font-size: 12px;
      color: #ff6700;
    }
    i {
      color: #ff6700;
      font-size: 12px;
    }
    .avatar {
      position: absolute;
      left: 0;
      top: 0;
      padding: 4px;
      border: 1px solid #e0e0e0;
      border-radius: 150px;
    }
  }
  .user-actions {
    float: right;
    width: 358px;
    margin-top: 35px;
    .action-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      color: #757575;
      li {
        position: relative;
        padding: 6px 0;
        .level {
          color: #ffac13;
        }
      }
    }
  }
  .portal-sub {
    border-top: 1px solid #e0e0e0;
    .info-list {
      margin: 0;
      padding: 60px 0 0;
      list-style-type: none;
      color: #757575;

      li {
        position: relative;
        float: left;
        width: 276px;
        height: 65px;
        padding-left: 112px;
        padding-top: 15px;
        margin-left: 14px;
        margin-bottom: 80px;

        a {
          color: #757575;
          &:hover {
            color: #ff6700;
          }
          .iconfont {
            font-size: 16px;
            line-height: 16px;
            vertical-align: -1px;
          }
        }
        i {
          font-size: 12px;
        }
        h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 400;
          .num {
            color: #ff6700;
          }
        }
        .icon-box {
          position: absolute;
          left: -10px;
          top: -10px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          text-align: center;

          i {
            line-height: 100px;
            color: #fff;
            font-size: 60px;
          }
        }

        &:nth-of-type(1) .icon-box {
          background: #ff6700;
        }
        &:nth-of-type(2) .icon-box {
          background: #8bc34a;
        }
        &:nth-of-type(3) .icon-box {
          background: #2396f3;
        }
        &:nth-of-type(4) .icon-box {
          background: #ffac00;
        }
      }
    }
  }
}
</style>