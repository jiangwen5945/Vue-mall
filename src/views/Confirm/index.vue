<template>
  <div>
    <!-- 头部 -->
    <site-header :siteParms="siteParms"></site-header>
    <!-- <Crumbs></Crumbs> -->
    <!-- 主体内容 -->
    <div class="page-main">
      <div class="confirm-context">
        <!-- 订单信息 -->
        <div class="confirm-order">
          <div class="section section-order">
            <div class="order-info">
              <!-- 待支付状态 -->
              <div class="fl" v-if="orderStatus ==1">
                <i class="iconfont icon-check"></i>
                <h2 class="title">订单提交成功！等待支付...</h2>
                <p class="order-time">
                  <span>
                    请在
                    <span class="pay-time-tip">{{h+'小时' +m+ '分'+s+'秒' }}</span>
                    <span>内完成支付, 超时后将取消订单</span>
                  </span>
                </p>

                <transition name="info">
                  <p
                    class="post-info"
                    v-show="!isActive"
                    v-if="payOrder.addressInfo"
                  >收货信息：{{payOrder.addressInfo.consignee}} {{payOrder.addressInfo.tel}} {{payOrder.addressInfo.addressName}}</p>
                </transition>
              </div>
              <!-- 支付失败状态 -->
              <div class="fl" v-if="orderStatus ==0">
                <i class="iconfont icon-close"></i>
                <h2 class="title">支付超时！请重新下单</h2>
                <transition name="info">
                  <p
                    class="post-info"
                    v-show="!isActive"
                    v-if="payOrder.addressInfo"
                  >收货信息：{{payOrder.addressInfo.consignee}} {{payOrder.addressInfo.tel}} {{payOrder.addressInfo.addressName}}</p>
                </transition>
              </div>
              <!-- 支付成功状态 -->
              <div class="fl" v-if="orderStatus ==2">
                <i class="iconfont icon-evaluate"></i>
                <h2 class="title">恭喜你！支付成功</h2>
                <transition name="info">
                  <p
                    class="post-info"
                    v-show="!isActive"
                    v-if="payOrder.addressInfo"
                  >收货信息：{{payOrder.addressInfo.consignee}} {{payOrder.addressInfo.tel}} {{payOrder.addressInfo.addressName}}</p>
                </transition>
              </div>

              <div class="fr">
                <div class="total">
                  应付总额：
                  <span class="money">
                    <em>{{payOrder.orderTotal | currency("")}}</em>
                    <span>元</span>
                  </span>
                </div>
                <a href="javascript:void(0);" class="show-detail" @click="isActive = !isActive">
                  订单详情
                  <i class="iconfont icon-unfold"></i>
                </a>
              </div>
            </div>

            <!-- 折叠订单详情 -->
            <div
              class="order-detail"
              :style="{'height': isActive? (190+payOrder.goodsList.length *24)+'px' : 0}"
            >
              <ul>
                <li class="clearfix">
                  <div class="label">订单号：</div>
                  <div class="content">
                    <span class="order-num">{{payOrder.orderId}}</span>
                  </div>
                </li>
                <li class="clearfix">
                  <div class="label">收货信息：</div>
                  <div
                    class="content"
                    v-if="payOrder.addressInfo"
                  >{{payOrder.addressInfo.consignee}} {{payOrder.addressInfo.tel}} {{payOrder.addressInfo.addressName}}</div>
                </li>
                <li class="clearfix">
                  <div class="label">商品名称：</div>
                  <div class="content">
                    <div
                      v-for="(item,index) in payOrder.goodsList"
                      :key="index"
                    >{{item.productName}}</div>
                  </div>
                </li>
                <li class="clearfix hide">
                  <div class="label">配送时间：</div>
                  <div class="content">不限送货时间</div>
                </li>
                <li class="clearfix">
                  <div class="label">发票信息：</div>
                  <div class="content">电子普通发票 个人</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 支付方式 -->
        <div class="confirm-pay" v-if="orderStatus ==1">
          <div class="section section-payment">
            <div class="cash-title">
              <div>选择以下支付方式付款</div>
            </div>

            <div class="payment-box" v-for="(item,index) in payTypeList" :key="index">
              <div class="payment-header clearfix">
                <h3 class="title">{{item.title}}</h3>
                <span class="desc"></span>
              </div>
              <div class="payment-body">
                <ul class="clearfix payment-list payment-list-much J_paymentList">
                  <li v-for="(url,index) in item.list" :key="index" @click="handleModal(true)">
                    <img :src="url" />
                  </li>
                  <li v-if="item.list.length>5">
                    <span class="text">查看更多</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
    <!-- 确定操作模态框 -->
    <Shade :show="show" v-bind="$attrs">
      <div slot="msg-box" class="messageBox">
        <header>
          正在支付...
          <i class="iconfont icon-round_close_fill_light" @click="handleModal(false)"></i>
        </header>

        <div class="loading-box">
          <img src="../../assets/imgs/pay.gif"/>
          <span>支付中，请稍后...</span>
        </div>
      </div>
    </Shade>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import Shade from "@/components/Shade/Shade";
import Footer from "@/components/Footer/Footer";
import Crumbs from "@/components/Crumbs/Crumbs";
export default {
  name: "Confirm",
  data() {
    return {
      siteParms: {
        title: "支付订单",
        desc: "",
      },
      payTypeList: [
        {
          title: "支付平台",
          list: [
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
          ],
        },
        {
          title: "银行借记卡及信用卡",
          list: [
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg",
          ],
        },
      ],

      show: false,
      isActive: false,
      active: {},
      test: "",
      payOrder: {},
      h: "",
      m: "",
      s: "",
      orderStatus: "",
      orderId: "",
      timer: true,
    };
  },
  components: {
    SiteHeader,
    Shade,
    Footer,
    Crumbs,
  },
  mounted() {
    this.init();
  },
  destroyed(){
    this.timer = false  // 离开页面后清除定时器
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    },
  },
  methods: {
    init() {
      this.orderId = this.$route.query.orderId;
      this.$axios
        .get(`${this.$api}/users/getOrder`, {
          params: {
            orderId: this.orderId,
          },
        })
        .then((res) => {
          if (res.data.status == 0) {
            this.payOrder = res.data.result;
            this.orderStatus = this.payOrder.orderStatus;
            // 判断当前订单状态是否为待支付（调用倒计时方法）
            if (this.orderStatus == 1) {
              this.countTime();
            }
          }
        });
    },
    // 支付操作
    handleModal(e) {
      this.show = e;
      // 向服务器发送请求，验证是否付款成功（模拟成功）
      this.$axios
        .post(`${this.$api}/users/checkPay`, {
          orderId: this.$route.query.orderId,
        })
        .then((response) => {
          let res = response.data;
          if (res.status == 0) {
            if (res.result == "2") {
              // 模拟支付接口：2=>支付成功
              setTimeout(() => {
                this.timer = false; //清除定时器
                this.$router.push({
                  path: "payStatus",
                  query: { orderId: this.orderId },
                });
              }, 3000);
            } else {
              alert("支付失败");
            }
          }
        });
    },
    // 订单付款有效时间倒计时
    countTime() {
      if (this.timer) {
        // 获取当前时间
        let nowTime = new Date().getTime();
        // 设置截止时间(订单创建2小时后)
        let createDate = this.payOrder.createDate; // 异步获取的数据，在回调成功后使用
        let starTime = new Date(createDate).getTime();
        let endTime = starTime + 1 * 60 * 60 * 1000;
        let t = endTime - nowTime;
        if (t >= 0) {
          this.h = Math.floor((t / 1000 / 60 / 60) % 24);
          this.m = Math.floor((t / 1000 / 60) % 60);
          this.s = Math.floor((t / 1000) % 60);
          setTimeout(this.countTime, 1000);
          console.log(t);
        } else {
          console.log("订单支付超时");
          this.orderStatus = "0";
          this.$axios
            .get(`${this.$api}/users/editOrder`, {
              params: {
                orderId: this.$route.query.orderId,
                orderStatus: this.orderStatus,
              },
            })
            .then((res) => {
              if (res.data.status == 0) {
                setTimeout(() => {
                  this.timer = false; //清除定时器
                  this.$router.push({
                    path: "payStatus",
                    query: { orderId: this.orderId },
                  });
                }, 2000);
              }
            });
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./index.css";

.messageBox {
  width: 30%;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  transition: all 1s;
  header {
    position: relative;
    height: 32px;
    padding: 14px 20px;
    line-height: 32px;
    background-color: #f5f5f5;
    border-radius: 2px;
    font-size: 18px;
    i {
      position: absolute;
      right: 14px;
      top: 10px;
      text-align: center;
      color: #757575;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 24px;
      &:hover {
        color: #ff6700;
      }
    }
  }

  main {
    background-image: url("https://s01.mifile.cn/i/pay/mitu.png");
    background-repeat: no-repeat;
    background-position: 64px 30px;
    position: relative;
    height: 200px;
    padding: 20px 60px 40px 270px;
    .info {
      width: 156px;
      margin-top: 60px;
      padding-bottom: 20px;
      h4 {
        margin: 0 0 10px;
        font-size: 18px;
        font-weight: 400;
        color: #757575;
      }
      p {
        a {
          color: #ff6700;
        }
        i {
          color: #ff6700;
          font-size: 14px;
        }
      }
    }
  }

  .loading-box {
    height: 200px;
    padding: 30px;
    img {
      width: 40%;
      vertical-align: middle;
    }
    span {
      padding: 40px;
      font-size: 18px;
      color: #747474;
    }
  }
}

.info-enter-active,
.info-leave-active {
  transition: all 0.5s;
}
.info-enter, .info-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
}
</style>