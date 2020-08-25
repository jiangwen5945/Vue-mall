<template>
  <div class="tool-bar">
    <div class="home-tool-bar home-tool-bar-large">
      <a class="item" @click="toUserCenter" href="javascript:void(0);">
        <i class="icon iconfont icon-my"></i>
        个人中心
      </a>
      <a class="item" href="javascript:void(0);">
        <i class="icon iconfont icon-choiceness"></i>

        <span>售后服务</span>
      </a>
      <a class="item" href="javascript:void(0);">
        <i class="icon iconfont icon-service"></i>
        <span class="text">人工客服</span>
      </a>
      <a class="item item-image" href="javascript:void(0);">
        <i class="icon iconfont icon-we"></i>
        <span class="text">关于</span>
        <div class="pop-content">
          <img src="../../assets/imgs/myCode.png" />
          <span class="desc">欢迎扫码了解我</span>
        </div>
      </a>
      <a class="item"  @click="toCart" href="javascript:void(0);" >
        <i class="icon iconfont icon-cart"></i>
        购物车
        <span class="cart-num">{{cartList.count || 0}}</span>
      </a>

      <a class="item" href="javascript:void(0);" @click="backTop()" :style="visibility">
        <i class="icon iconfont icon-top"></i>
        <span class="text">回顶部</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
  props: {
    navParms: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      visibility: "visibility:hidden",
    };
  },
  // 购物车数量
  computed: {
    cartList() {
      let cartList = this.$store.state.userInfo.cartList;
      return cartList ? cartList : [];
    },
    userName() {
      return this.$store.state.userInfo.userName;
    },
  },
  mounted() {
    window.addEventListener(
      "scroll",
      this.$thorttle((e) => {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        this.visibility =
          scrollTop > 600 ? "visibility:visible" : "visibility:hidden";
      })
    );
  },
  methods: {
    backTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.visibility = "visibility:hidden";
    },
    toUserCenter() {
      if (this.userName) {
        this.$router.push("userCenter");
      } else {
        alert("用户未登录");
      }
    },
    toCart() {
      if (this.userName) {
        this.$router.push("Cart");
      } else {
        alert("用户未登录");
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.home-tool-bar {
  position: fixed;
  bottom: 150px;
  right: 0;
  z-index: 99;

  .item {
    position: relative;
    display: block;
    width: 82px;
    height: 90px;
    margin-top: -1px;
    background-color: #fff;
    border: 1px solid #f5f5f5;
    text-align: center;
    color: #757575;
    opacity: 1;
    &:last-child {
      margin-top: 15px;
      transition: all 0.4s;
    }

    &:hover {
      color: #ff6700;
    }
    .icon {
      position: relative;
      width: 30px;
      height: 30px;
      margin: 0 auto 8px;
      padding-top: 18px;
      font-size: 30px;
      display: block;
      color: inherit;
    }
    .cart-num {
      position: absolute;
      right: 14px;
      top: 18px;
      padding: 0 5px;
      height: 14px;
      line-height: 14px;
      color: #fff;
      font-size: 10px;
      background-color: #ff6700;
      border: 2px solid #fff;
      border-radius: 9px;
    }
    .pop-content {
      position: absolute;
      left: 0;
      top: 0;
      padding: 10px;
      background: #fff;
      border: 1px solid #f5f5f5;
      transition: opacity 0.3s;
      transform: translateZ(0);
      opacity: 0;
      visibility: hidden;
      &:before {
        right: -19px;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #f5f5f5;
        z-index: 1;

        content: "";
        position: absolute;
        top: 21%;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        overflow: hidden;
      }
      &:after {
        right: -18px;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #fff;
        z-index: 2;

        content: "";
        position: absolute;
        top: 21%;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        overflow: hidden;
      }

      img {
        display: block;
        width: 100px;
        height: 100px;
        margin: 6px auto;
      }
      .desc {
        display: block;
        width: 88px;
        margin: 14px auto 0;
        color: #757575;
        text-align: center;
        font-size: 12px;
      }
    }
    &:hover .pop-content {
      transform: translate3d(-110%, 0, 0);
      opacity: 1;
      visibility: visible;
    }
  }
  //  .item-image{
  //   width: 82px;
  //   height: 82px;
  // }
}
</style>