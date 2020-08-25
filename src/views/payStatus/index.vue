<template>
  <div class="pay-status">
    <site-header :siteParms="siteParms"></site-header>
    <div class="pay-status-box">
      <!-- 支付失败 -->
      <div class="l-box fail" v-if="currentOrder.orderStatus == '0'">
        <h2 class="title">支付失败</h2>
        <p class="price">
          <em>{{currentOrder.orderTotal | currency("")}}</em>元
        </p>
        <router-link
          class="btn"
          :to="{path:'/'}"
        >重新下单</router-link>
        <p class="state">谨防钓鱼链接或诈骗电话</p>
      </div>
      <!-- 待支付 -->
      <div class="l-box" v-if="currentOrder.orderStatus == '1'">
        <h2 class="title">支付成功</h2>
        <p class="price">
          <em>{{currentOrder.orderTotal | currency("")}}</em>元
        </p>
        <router-link
          class="btn"
          :to="{path:'userCenter/orderView',query:{orderId:currentOrder.orderId}}"
        >查看订单详情</router-link>
        <p class="state">谨防钓鱼链接或诈骗电话</p>
      </div>
      <!-- 支付成功 -->
      <div class="l-box success" v-if="currentOrder.orderStatus == '2'">
        <h2 class="title">支付成功</h2>
        <p class="price">
          <em>{{currentOrder.orderTotal | currency("")}}</em>元
        </p>
        <router-link
          class="btn"
          :to="{path:'userCenter/orderView',query:{orderId:currentOrder.orderId}}"
        >查看订单详情</router-link>
        <p class="state">谨防钓鱼链接或诈骗电话</p>
      </div>

      <div class="info">
        <ul>
          <li class="clearfix">
            <div class="label">订单编号：</div>
            <div class="content">{{currentOrder.orderId}}</div>
          </li>
          <li class="clearfix">
            <div class="label">收货信息：</div>
            <div class="content" v-if="currentOrder.addressInfo">
              {{currentOrder.addressInfo.consignee}} {{currentOrder.addressInfo.tel}}
              <br />
              {{currentOrder.addressInfo.addressName}}
            </div>
          </li>
          <li class="clearfix">
            <div class="label">商品名称：</div>
            <div class="content">
              <p
                v-for="(item,index) in currentOrder.goodsList"
                :key="index"
              >{{item.productName}} ✕ {{item.productNum}}</p>
            </div>
          </li>
          <li class="clearfix">
            <div class="label">发票信息：</div>
            <div class="content">电子普通发票 个人</div>
          </li>
        </ul>
        <div class="my-code">
          <img src="../../assets/imgs/myCode.png" alt />
          扫码,了解更多...
        </div>
      </div>
    </div>
    <Recommend>为你推荐</Recommend>
    <Footer></Footer>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import Footer from "@/components/Footer/Footer";
import Recommend from "@/components/Recommend/Recommend";
export default {
  name: "payStatus",
  data() {
    return {
      siteParms: {
        title: "支付状态",
        userName: "jiangwen",
        // desc: "恭喜！支付成功",
      },
      currentOrder: {},
    };
  },
  components: {
    SiteHeader,
    Footer,
    Recommend,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .get(`${this.$api}/users/getOrder`, {
          params: {
            orderId: this.$route.query.orderId,
          },
        })
        .then((res) => {
          if (res.data.status == 0) {
            this.currentOrder = res.data.result;
            console.log("this.currentOrder ", this.currentOrder);
          }
        });
    },
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.pay-status {
  background: #f5f5f5;
}
.pay-status-box {
  width: 1226px;
  margin: 40px auto 80px;
  overflow: hidden;
  .success{
     background: #8bc34a;
  }
  .fail{
     background: #e0e0e0;
  }
  .wait{
     background: #ff6700;
  }
  .l-box {
    float: left;
    width: 506px;
    height: 400px;
    text-align: center;
    .title {
      font-size: 48px;
      color: #fff;
      line-height: 1;
      margin-top: 70px;
      margin-bottom: 10px;
      font-weight: 400;
    }
    .price {
      margin: 20px 0 30px;
      color: #ff0;
      em {
        font-style: normal;
        font-size: 24px;
      }
    }
    .btn {
      margin-bottom: 30px;
      border-color: #fff;
      background: none;
      color: #fff;
    }
    .state {
      font-size: 12px;
      color: #f5f5f5;
    }
  }
  .info {
    float: left;
    width: 660px;
    min-height: 400px;
    padding-left: 60px;
    font-size: 12px;
    background-color: #fff;
    position: relative;
    ul {
      width: 480px;
      padding-top: 50px;
      padding-bottom: 50px;
      font-size: 14px;
      li {
        line-height: 24px;
        margin-bottom: 8px;
        .label {
          float: left;
          color: #b0b0b0;
        }
        .content {
          float: left;
          color: #757575;
        }
      }
    }
    .my-code {
      position: absolute;
      right: 40px;
      bottom: 25px;
      text-align: center;
      img {
        display: block;
        width: 86px;
        height: 86px;
        margin: 0 auto 10px;
      }
    }
  }
}
</style>