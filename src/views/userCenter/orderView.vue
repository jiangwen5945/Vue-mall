<template>
  <div class="content-box">
    <page-header :title="title"></page-header>
    <div class="more">
      <h2 class="subtitle">订单号：{{ orderId }}</h2>
      <div class="actions">
        <div class="status-btn-box">
          <a
            title="取消订单"
            class="btn btn-small btn-line-gray btn-contract"
            v-if="this.orderStatus != 0"
            @click="handleModal(true)"
          >取消订单</a>

          <router-link
            title="立即付款"
            class="btn btn-small btn-primary"
            v-if="this.orderStatus == 1"
            :to="{ name: 'Confirm',query: { orderId: orderId }}"
          >立即付款</router-link>
        </div>
      </div>
    </div>
    <div class="box-bd">
      <div class="order-detail uc-order-item-pay">
        <div class="order-summary">
          <div class="order-status">
            <div style="display: inline-block;">等待付款</div>
          </div>
          <div class="order-progress">
            <ol class="progress-list clearfix">
              <li
                class="step"
                v-for="(item,index) in stepList"
                :key="index"
                :class="currentStep == index?'step-active':''"
              >
                <div class="progress">
                  <span class="text">{{item.name}}</span>
                </div>
                <div class="info">{{ item.time }}</div>
              </li>
            </ol>
          </div>
        </div>
        <div class="order-goods">
          <table class="goods-table">
            <tr class="goods-box" v-for="(item,index) in goodsList" :key="index">
              <td class="col col-thumb">
                <div class="figure figure-thumb">
                  <a href="#">
                    <img :src="item.productImgUrl" width="80" height="80" />
                  </a>
                </div>
              </td>
              <td class="col col-info">
                <div class="col-info-box">
                  <tr class="goods-box-info">
                    <td class="col col-name">
                      <a href="#">{{item.productName}}</a>
                    </td>
                    <td class="col col-price">
                      <p class="price">{{item.productPrice}}元 × {{item.productNum}}</p>
                    </td>
                    <td class="col col-actions"></td>
                  </tr>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="order-detail-info">
        <h3>收货信息</h3>
        <table class="info-table">
          <tbody>
            <tr>
              <th>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</th>
              <td>{{addressInfo.consignee}}</td>
            </tr>
            <tr>
              <th>联系电话：</th>
              <td>{{addressInfo.tel}}</td>
            </tr>
            <tr>
              <th>收货地址：</th>
              <td>{{addressInfo.addressName}}</td>
            </tr>
          </tbody>
        </table>
        <div class="actions">
          <a class="btn btn-small btn-line-gray">修改</a>
        </div>
      </div>
      <div class="order-detail-info">
        <h3>支付方式</h3>
        <table class="info-table">
          <tbody>
            <tr>
              <th>支付方式：</th>
              <td>在线支付</td>
            </tr>
          </tbody>
        </table>
        <div class="actions"></div>
      </div>
      <div>
        <div class="order-detail-info">
          <h3>发票信息</h3>
          <table class="info-table">
            <tbody>
              <tr>
                <th>发票类型：</th>
                <td>电子普通发票</td>
              </tr>
              <tr>
                <th>发票内容：</th>
                <td>购买商品明细</td>
              </tr>
              <tr>
                <th>发票抬头：</th>
                <td>个人</td>
              </tr>
            </tbody>
          </table>
          <div class="actions"></div>
        </div>
      </div>
      <div class="order-detail-total">
        <table class="total-table">
          <tbody>
            <tr>
              <th>商品总价：</th>
              <td>
                <span class="num">{{orderTotal}}</span>元
              </td>
            </tr>
            <tr>
              <th>运费：</th>
              <td>
                <span class="num">0</span>元
              </td>
            </tr>
            <tr>
              <th class="total">应付金额：</th>
              <td class="total">
                <span class="num numPlus">{{orderTotal}}</span>元
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Shade :isShow="isShow" @setState="setState">
      <div slot="msg-box" class="messageBox">
        <p>确认取消该订单？</p>

        <div class="btn-group">
          <span class="btn btn-normal" @click="handleCancel">确认</span>
          <span class="btn" @click="handleModal(false)">取消</span>
        </div>
      </div>
    </Shade>
  </div>
</template>

<script>
import pageHeader from "./components/pageHeader";
import Shade from "@/components/Shade/Shade";
export default {
  name: "orderView",
  components: {
    pageHeader,
    Shade,
  },
  data() {
    return {
      orderId: "",
      orderStatus: "",
      orderTotal: "",
      createDate: "",
      payDate: "",
      addressInfo: "",
      goodsList: "",
      title: "订单详情",
      isShow: false,
    };
  },
  created() {
    this.init();
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
        .then((response) => {
          let res = response.data.result;
          console.log(res);
          if (response.data.status == 0) {
            this.createDate = res.createDate;
            this.payDate = res.payDate;
            this.orderTotal = res.orderTotal;
            this.orderStatus = res.orderStatus;
            this.addressInfo = res.addressInfo;
            this.goodsList = res.goodsList;
          }
        });
    },
    // 取消订单
    handleCancel() {
      this.$axios
        .get(`${this.$api}/users/editOrder`, {
          params: {
            orderId: this.orderId,
            orderStatus: 0,
          },
        })
        .then((res) => {
          if (res.data.status == 0) {
            this.handleModal(false);
            this.$router.push("/userCenter/orderList");
          }
        });
    },
    // 显示隐藏消息模态框
    handleModal(e) {
      this.isShow = e;
    },
    setState(e) {
      this.isShow = e;
    },
  },
  computed: {
    currentStep() {
      // 订单失效时候不进行计算
      if (this.orderStatus != 0) {
        return parseInt(this.orderStatus) - 1;
      }
    },
    stepList() {
      return [
        {
          name: "下单",
          time: this.createDate,
        },
        {
          name: "付款",
          time: this.payDate,
        },
        {
          name: "配货",
          time: "",
        },
        {
          name: "出库",
          time: "",
        },
        {
          name: "交易成功",
          time: "",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  padding: 0 48px 20px;
  background: #fff;
  .more {
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
    overflow: hidden;
    .subtitle {
      float: left;
      font-size: 18px;
      line-height: 36px;
      font-weight: 400;
      color: #333;
    }
    .actions {
      float: right;
      padding-top: 5px;
    }
  }

  .box-bd {
    .order-detail {
      padding: 25px 0;
      .order-status {
        color: #ff6700;
        margin-bottom: 25px;
        font-size: 18px;
      }
      .order-progress {
        height: 65px;
        margin-bottom: 15px;
        .progress-list {
          width: 880px;
          height: 20px;
          margin: 0 auto;
          padding: 0;
          list-style-type: none;
          border-radius: 20px;
          font-size: 12px;
          line-height: 20px;
          text-align: center;
          color: #424242;
          background-color: #eee;
          display: flex;
          .step {
            flex: 0 1 176px;
            height: 20px;
            &:first-child {
              border-top-left-radius: 20px;
              border-bottom-left-radius: 20px;
            }
            .info {
              margin-top: 15px;
              color: #757575;
            }
          }
          .step-active {
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            background-color: #83c44e;
            color: #fff;
          }
        }
      }

      .goods-table {
        width: 100%;
        .figure-thumb {
          width: 80px;
          a {
            display: block;
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
        .goods-box {
          border-bottom: 1px solid #e0e0e0;
          padding-top: 10px;
          .col {
            text-align: left;
            color: #333;
          }
          .col-name {
            width: 350px;
            color: #333;
            a {
              color: #333;
            }
          }
          .col-actions {
            width: 120px;
            padding: 0;
            text-align: right;
          }
          .col-thumb {
            width: 100px;
          }

          .col-info {
            flex: 1;
            align-items: center;
            .col-info-box {
              width: 100%;
              .goods-box-info {
                display: flex;
                width: 100%;
              }
            }
          }
        }
      }
    }
    .order-detail-info {
      position: relative;
      height: auto;
      min-height: 120px;
      padding: 6px 0 12px;
      margin-bottom: 30px;
      border-bottom: 1px solid #e0e0e0;
      h3 {
        margin: 0 0 15px;
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }
      .info-table {
        color: #757575;
        th {
          padding-right: 0.3em;
        }
        td {
          padding: 3px 0;
          text-align: left;
        }
      }
      .actions {
        position: absolute;
        top: 5px;
        right: 0;
      }
    }
    .order-detail-total {
      .total-table {
        margin: 0 0 0 auto;
        color: #757575;
      }

      th {
        width: 200px;
        font-weight: 400;
        text-align: right;
      }
      td {
        text-align: right;
        color: #ff6700;
      }
      .num {
        margin-right: 0.125em;
      }
      .numPlus {
        font-size: 30px;
        font-weight: 200;
        line-height: 1;
      }
    }
  }
}
.messageBox {
  width: 50%;
  height: 400px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  p {
    font: bold 24px/36px arial, sans-serif;
    text-align: center;
    padding: 100px 0;
  }

  .btn-group {
    justify-content: space-around;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    .btn {
      display: inline-block;
      width: 40%;
      height: 48px;
      line-height: 48px;
      background-color: #fff;
      border: 1px solid #ff6700;
      color: #ff6700;
      text-align: center;
      margin: 20px;
      cursor: pointer;
      border-radius: 4px;
    }
    .btn-normal {
      background-color: #ff6700;
      color: #fff;
    }
  }
}
</style>