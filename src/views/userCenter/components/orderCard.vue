<template>
  <div class="order-detail">
    <table class="order-detail-table" :style="{border:'1px solid'+statusColor}">
      <thead>
        <tr class="summary" :style="{border:'1px dashed'+ statusColor}">
          <th class="col-main">
            <div class="order-status" :style="{color: statusColor}">{{statusText}}</div>
            <p class="caption-info">
              {{orderParam.createDate}}
              <span class="sep">|</span>
              <span v-if="orderParam.addressInfo">{{orderParam.addressInfo.consignee}}</span>

              <span class="sep">|</span>
              订单号：
              <a>{{orderParam.orderId}}</a>
              <span class="sep">|</span>
              在线支付
            </p>
          </th>
          <th class="col-sub">
            <p class="caption-price">
              应付金额：
              <span class="num">{{orderParam.orderTotal | currency("¥")}}</span>元
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 每笔订单 -->
        <tr>
          <td class="order-items">
            <ul class="goods-list">
              <!-- 订单商品 -->
              <li v-for="(item,index) in orderParam.goodsList" :key="index">
                <div class="figure figure-thumb">
                  <a>
                    <img :src="item.productImgUrl" width="80" height="80" :alt="item.productName" />
                  </a>
                </div>
                <p class="name">
                  <a>{{item.productName}}</a>
                </p>
                <p class="price">{{item.productPrice}}元 × {{item.productNum}}</p>
              </li>
            </ul>
          </td>

          <!-- 待支付状态 -->
          <td class="order-actions" v-if="this.orderParam.orderStatus == 1">
            <router-link
              class="btn btn-small btn-primary"
              :to="{ name: 'Confirm',query: { orderId: orderParam.orderId }}"
            >立即付款</router-link>

            <router-link
              class="btn btn-small btn-line-gray"
              :to="{ name: 'orderView',query: { orderId: orderParam.orderId }}"
            >订单详情</router-link>
          </td>
          <!-- 待收货状态 -->
          <td class="order-actions" v-if="this.orderParam.orderStatus == 2">
            <router-link
              class="btn btn-small btn-primary"
              :to="{ name: 'Confirm',query: { orderId: orderParam.orderId }}"
            >确认收货</router-link>

            <router-link
              class="btn btn-small btn-line-gray"
              :to="{ name: 'orderView',query: { orderId: orderParam.orderId }}"
            >订单详情</router-link>
          </td>
          <!-- 待评价状态 -->
          <td class="order-actions" v-if="this.orderParam.orderStatus == 3">
            <router-link
              class="btn btn-small btn-primary"
              :to="{ name: 'Confirm',query: { orderId: orderParam.orderId }}"
            >前往评价</router-link>

            <router-link
              class="btn btn-small btn-line-gray"
              :to="{ name: 'orderView',query: { orderId: orderParam.orderId }}"
            >订单详情</router-link>
          </td>
          <!-- 失效状态 -->
          <td class="order-actions" v-if="this.orderParam.orderStatus == 0">
            <router-link
              class="btn btn-small btn-primary"
              :to="{ name: 'Confirm',query: { orderId: orderParam.orderId }}"
            >重新下单</router-link>

            <router-link
              class="btn btn-small btn-line-gray"
              :to="{ name: 'orderView',query: { orderId: orderParam.orderId }}"
            >订单详情</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "orderCard",
  props: {
    orderParam: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      btnText: "",
      statusText: "",
      statusColor: "#ff6700",
    };
  },
  mounted() {
    this.orderStatus();
  },
  methods: {
    // 计算订单状态
    orderStatus() {
      let s = this.orderParam.orderStatus;
      // 0：失效订单，1:待付款，2:待收货 3：待评价
      switch (s) {
        case "0":
          this.statusText = "已失效";
          this.statusColor = "#b0b0b0";
          break;
        case "1":
          this.statusText = "待付款";
          this.statusColor = "#ff6700";
          break;
        case "2":
          this.statusText = "待收货";
          this.statusColor = "#8bc34a";
          break;
        case "3":
          this.statusText = "待评价";
          this.statusColor = "#ffac00";
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-detail {
  border: 1px solid #faf4e8;
}

.order-status {
  color: #ff6700;
  font-size: 18px;
  padding: 14px 0;
}
.order-detail-table {
  width: 100%;
  th {
    padding-right: 10px;
    height: 28px;
    padding: 0 30px 24px;

    font-weight: 400;
    text-align: left;
    color: #757575;
    vertical-align: bottom;
    .sep {
      color: #e0e0e0;
      margin: 0 0.25em;
    }
    .num {
      height: 18px;
      margin-right: 5px;
      font-size: 28px;
      font-weight: 200;
      line-height: 1;
      color: #333;
    }
  }
  .col-sub {
    width: 240px;
    padding-left: 10px;
    text-align: right;
  }

  td {
    padding: 0 30px;
  }
  .goods-list {
    margin: 0;
    padding: 10px 0;
    list-style-type: none;
    li {
      position: relative;
      height: 44px;
      margin: 10px 0;
      padding: 18px 18px 18px 100px;
      line-height: 22px;
      color: #333;
      .figure-thumb {
        position: absolute;
        left: 0;
        top: 0;
      }
      .name {
        margin: 0;
      }
      .price {
        margin: 0;
      }
    }
  }
  .order-actions {
    text-align: right;
    vertical-align: center;
    .btn {
      display: block;
      margin: 0 0 10px auto;
    }
    .btn-primary {
      background: #ff6700;
      border-color: #ff6700;
      color: #fff;
    }
    .btn-line-gray {
      border-color: #b0b0b0;
      background: #fff;
      color: #757575;
    }
    .btn-small {
      width: 118px;
      height: 28px;
      font-size: 12px;
      line-height: 28px;
    }
  }
}
</style>