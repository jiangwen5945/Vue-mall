<template>
  <div class="cart-container">
    <site-header :siteParms="siteParms"></site-header>
    <div class="cart-goods-list" v-if="CartList.length !== 0">
      <!-- 表头 -->
      <div class="list-head">
        <div class="col col-check" @click="handleAllCheck()">
          <span class="checkbox">
            <i class="iconfont" :class="[isAllCheck?'icon-check' : '']"></i>
          </span>
          全选
        </div>
        <div class="col col-img">&nbsp;</div>
        <div class="col col-name">商品名称</div>
        <div class="col col-price">单价</div>
        <div class="col col-num">数量</div>
        <div class="col col-total">小计</div>
        <div class="col col-action">操作</div>
      </div>
      <!-- 表主体 -->
      <div class="list-body">
        <div class="item-box">
          <div class="item-table">
            <!-- 商品 -->
            <div class="item-row" v-for="(item,index) in CartList" :key="index">
              <!-- 勾选 -->
              <div class="col col-check">
                <span class="checkbox" @click="editNum(null,item)">
                  <i class="iconfont" :class="[item.checked==1?'icon-check' : '']"></i>
                </span>
              </div>
              <!-- 状态 -->
              <!-- <div class="col col-status"> -->
              <!-- <span>售罄</span> -->
              <!-- </div> -->
              <!-- 图片 -->
              <div class="col col-img">
                <span>
                  <a href="javascript:void(0)">
                    <img :src="item.productImgUrl" width="80" height="80" />
                  </a>
                </span>
              </div>
              <!-- 名称 -->
              <div class="col col-name">
                <h3 class="name">
                  <a href="javascript:void(0)">{{item.productName}}</a>
                </h3>
              </div>
              <!-- 价格 -->
              <div class="col col-price">{{item.productPrice|currency("¥")}}</div>
              <!-- 数量 -->
              <div class="col col-num">
                <div class="change-goods-num">
                  <a href="javascript:void(0)" @click="editNum(-1,item)">
                    <i class="iconfont">-</i>
                  </a>
                  <input
                    type="text"
                    autocomplete="off"
                    class="goods-num"
                    v-model="item.productNum"
                    @blur="editNum(0,item)"
                  />
                  <a href="javascript:void(0)" @click="editNum(1,item)">
                    <i class="iconfont">+</i>
                  </a>
                </div>
              </div>
              <div class="col col-total">{{item.productPrice * item.productNum|currency("¥")}}</div>
              <!-- 操作 -->
              <div class="col col-action">
                <i class="iconfont icon-roundclosefill" @click="isShow(true,item)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-bar">
        <div class="section-left">
          <router-link to="/" class="back-shopping">继续购物</router-link>
          <span class="cart-total">
            共
            <i>1</i> 件商品，已选择
            <i>1</i>件
          </span>
        </div>
        <span class="total-price">
          合计：
          <em>{{getTotalPrice | currency("¥")}}</em>元
          <a
            href="javascript:void(0);"
            class="btn btn-primary"
            :class="[checkedCount?'':'btn-disabled']"
            @click="checkOut"
          >去结算</a>
        </span>
        <!-- 没有勾选商品时提示 -->
        <div class="no-select-tip" v-show="!checkedCount">
          请勾选需要结算的商品
          <i class="arrow arrow-a"></i>
          <i class="arrow arrow-b"></i>
        </div>
      </div>
    </div>

    <!-- 购物车为空 -->
    <div class="cart-goods-list" v-else>
      <div class="empty-cart-top">
        <img src="../../assets/imgs/null_cart.gif" alt />
        <h2 class="login-tip is-login">您的购物车还是空的！</h2>
        <router-link to="/" class="btn btn-primary btn-shoping-yeslogin">马上去购物</router-link>
      </div>
    </div>

    <Recommend></Recommend>
    <Footer></Footer>
    <!-- 操作确认模态框 -->
    <confirm-box
      :show="show"
      :title="operateTitle"
      @isShow="isShow"
      @handleConfirm="handleConfirm(productId)"
    ></confirm-box>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import Footer from "@/components/Footer/Footer";
import ConfirmBox from "@/components/ConfirmBox/ConfirmBox";
import Recommend from "@/components/Recommend/Recommend";
// import {currency} from "@/util/currency"
export default {
  name: "Regist",
  data() {
    return {
      operateTitle: "确认删除？",
      CartList: [],
      totalPrice: 0,
      show: false,
      productId: "",
      siteParms: {
        title: "我的购物车",
        userName: "jiangwen",
        desc: "温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算",
      },
    };
  },
  components: {
    ConfirmBox,
    Recommend,
    SiteHeader,
    Footer,
  },
  // 局部过滤器
  // filters:{
  //   currency:currency
  // },

  mounted() {
    this.init();
  },
  computed: {
    getTotalPrice() {
      let totalPrice = 0;
      this.CartList.forEach((e) => {
        if (e.checked == "1") {
          totalPrice += e.productNum * e.productPrice;
        }
      });
      return totalPrice;
    },
    isAllCheck() {
      return this.CartList.every((e) => e.checked == "1");
    },
    checkedCount() {
      let num = 0;
      this.CartList.forEach((e) => {
        if (e.checked == "1") {
          num++;
        }
      });
      return num;
    },
  },
  methods: {
    // 初始化数据
    init() {
      this.$axios.post(`${this.$api}/users/cartList`).then((res) => {
        if (res.data.status == "0") {
          this.CartList = res.data.result;
        } else if (res.data.status == "10001") {
          console.log(res.data.msg);
        }
      });
    },
    // 修改数量
    editNum(e, item) {
      switch (e) {
        case 1:
          item.productNum++;
          break;
        case -1:
          if (item.productNum > 1) {
            item.productNum--;
          }
          break;
        case 0:
          item.productNum;
        default:
          item.checked = -1 * parseInt(item.checked);
          break;
      }
      this.$axios.get(
        `${this.$api}/users/cartList/edit`,
        {
          params: {
            productNum: item.productNum,
            productId: item.productId,
            checked: item.checked,
          },
        },
        (response) => {
          let res = response.data;
          if (res.status !== "0") {
            alert("操作失败" + res.msg);
          }
        }
      );
    },
    // 显示隐藏消息模态框
    isShow(e, params) {
      console.log(1);
      if (params) {
        this.productName = params.productName;
        this.productImg = params.productImgUrl;
        this.productId = params.productId;
      } else {
        this.productName = "";
        this.productImg = "";
        this.productId = "";
      }
      this.show = e;
    },
    // 删除
    handleConfirm(pId) {
      this.$axios
        .post(`${this.$api}/users/cartList/del`, {
          productId: pId,
        })
        .then((res) => {
          if (res.data.status == "0") {
            this.isShow(false);
            this.init();
          } else {
            alert(res.data.msg);
          }
        });
    },
    // 全选
    handleAllCheck() {
      let _f = !this.isAllCheck ? "1" : "-1";
      this.CartList.forEach((e) => {
        e.checked = _f;
      });
      this.$axios.get(
        `${this.$api}/users/cartList/edit`,
        {
          params: {
            allChecked: this.isAllCheck,
          },
        },
        (response) => {
          let res = response.data;
          if (res.status !== "0") {
            alert("操作失败" + res.msg);
          }
        }
      );
    },
    // 结算
    checkOut() {
      if (this.checkedCount > 0) {
        this.$router.push({
          path: "address",
        });
      }
    },

    setState(e) {
      this.show = e;
    },
  },
};
</script>

<style scoped  lang="scss">
@import "./Cart";
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

