<template>
  <div>
    <!-- 头部 -->
    <site-header :siteParms="siteParms"></site-header>
    <!-- 主体内容 -->
    <div class="page-main">
      <div class="address-wrapper">
        <!-- 地址吸顶栏 -->
        <div id="fixed-header" v-show="isFixed">
          <div class="fixed-address-choose">
            <span class="choose-btn btn btn-primary" @click="slideUp">修改收货地址</span>
            <div class="address-title">
              <span class="address-desc">{{currentAddress.consignee}}</span>
              <span class="address-desc">{{currentAddress.tel}}</span>
              <span class="address-desc">{{currentAddress.addressName}}</span>
            </div>
          </div>
        </div>

        <!-- 收货地址 -->
        <div class="detail-section">
          <div class="detail-header">收货地址</div>
          <address-list></address-list>
        </div>

        <!-- 商品及优惠券 -->
        <div class="detail-section">
          <div class="detail-header">商品及优惠券</div>
          <div class="goods-list">
            <div class="good-item" v-for="(item,index) in checkedOrder" :key="index">
              <div class="item-desc good-img">
                <img :src="item.productImgUrl" />
              </div>
              <div class="item-desc good-name">
                <a href="#">
                  <span>{{item.productName}}</span>
                </a>
              </div>
              <div class="item-desc">
                <div class="special-handling-differentiate">
                  <div class="item-desc good-price">{{item.productPrice}}元 x {{item.productNum}}</div>
                  <div class="item-desc good-status"></div>
                  <div class="item-desc good-total">{{item.productPrice * item.productNum}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 配送方式 -->
        <div class="detail-section">
          <div class="section-options section-shipment">
            <div class="options-desc options-header">
              <div class="title">配送方式</div>
            </div>
            <div class="options-desc options-body">
              <div class="options-list">
                <div
                  class="options-item selected"
                >{{this.confirmInfo.postage == 0? '包邮' : '请选择快递方式'}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 使用优惠券 -->
        <div class="detail-section count-detail">
          <div class="section-discount">
            <div class="coupon-box">
              <i class="iconfont icon-roundaddlight"></i>
              使用优惠券
            </div>
          </div>
          <div class="section-bill">
            <div class="bill-item">
              <div class="bill-name">商品件数：</div>
              <div class="bill-money">{{confirmInfo.nums}}件</div>
            </div>
            <div class="bill-item">
              <div class="bill-name">商品总价：</div>
              <div class="bill-money">{{confirmInfo.totalPrice | currency("¥")}}</div>
            </div>
            <div class="bill-item">
              <div class="bill-name">活动优惠：</div>
              <div class="bill-money">{{confirmInfo.activeMinus| currency("¥")}}</div>
            </div>
            <div class="bill-item">
              <div class="bill-name">优惠券抵扣：</div>
              <div class="bill-money">{{confirmInfo.couponMinus | currency("¥")}}</div>
            </div>
            <div class="bill-item">
              <div class="bill-name">运费：</div>
              <div class="bill-money">{{confirmInfo.postage | currency("¥")}}</div>
            </div>
            <div class="bill-item total-price">
              <div class="bill-name">应付总额：</div>
              <div class="bill-money">
                <em>{{realPay | currency("¥")}}</em>元
              </div>
            </div>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="detail-section footer-detail">
          <div class="btn-group">
            <router-link to="./Cart" class="btn btn-return">返回购物车</router-link>
            <!-- 生成订单并携带参数跳转 -->
            <span @click="createOrder" class="btn btn-primary">去结算</span>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import Footer from "@/components/Footer/Footer";
import AddressList from "@/components/AddressList/AddressList";
export default {
  name: "Address",
  data() {
    return {
      siteParms: {
        title: "确认订单",
        userName: "jiangwen",
        desc: "",
      },
      addressList: [],
      confirmInfo: {
        nums: 0,
        couponMinus: 20,
        postage: 0,
        activeMinus: 10,
        totalPrice: 0,
        realPay: 0,
      },
      checkedOrder: [],
      isFixed: false,
      isShow: false,
      isShow2: false,
      isError: false,
      isNewAddress: 1, // 默认新增地址
      // 当前地址
      currentAddress: {
        addressId: "",
        consignee: "",
        addressName: "",
        postCode: "",
        tel: "",
        isDefault: false,
      },
    };
  },
  components: {
    SiteHeader,
    Footer,
    AddressList,
  },
  computed: {
    realPay() {
      let r =
        this.confirmInfo.totalPrice +
        this.confirmInfo.postage -
        this.confirmInfo.couponMinus -
        this.confirmInfo.activeMinus;
      return r > 0 ? r : 0;
    },
  },
  methods: {
    init() {
      // 获取购物车确定购买商品
      this.$axios.post(`${this.$api}/users/cartList`).then((res) => {
        if (res.data.status == 0) {
          this.checkedOrder = res.data.result.filter((e) => e.checked == 1);
          this.checkedOrder.forEach((e) => {
            this.confirmInfo.totalPrice += e.productNum * e.productPrice;
            this.confirmInfo.nums += e.productNum;
          });
        }
      });
    },
    slideUp() {
      document.body.scrollIntoView({ behavior: "smooth" });
    },
    // 生成订单
    createOrder() {
      this.$axios
        .post(`${this.$api}/users/createOrder`, {
          orderTotal: this.realPay,
          addressId: this.currentAddress.addressId,
        })
        .then((res) => {
          if (res.data.status == 0) {
            let orderId = res.data.result.orderId,
              orderTotal = res.data.result.orderTotal;
            this.$router.push({
              path: "Confirm",
              query: { orderId: orderId },
            });
          } else {
            console.log(res.data.msg);
          }
        });
    },
  },

  mounted() {
    this.init();
    window.addEventListener(
      "scroll",
      this.$thorttle((e) => {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        this.isFixed = scrollTop > 220 ? true : false;
      })
    );
  },
};
</script>

<style lang='scss' scoped>
@import "./index.css";
</style>