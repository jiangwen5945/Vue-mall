<template>
  <div class="googs-card" @click="toDetails(goodsParm)">
    <!-- 装饰横线 -->
    <span
      class="topline"
      :style="{borderTop:topline[topLineIndex]}"
      v-if="topLineIndex || topLineIndex==0"
    ></span>
    <p class="img-warpper">
      <img v-lazy="goodsParm.productImgUrl" />
    </p>

    <p href="# " class="title">{{goodsParm.productName}}</p>
    <p class="explain">{{goodsParm.productDesc}}</p>
    <p href=" " class="price">{{goodsParm.productPrice}}</p>

    <!-- 标签插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GoodsCard",
  props: {
    goodsParm: {
      type: Object,
      default: () => {
        return {};
      },
    },
    topLineIndex: {
      type: Number,
      default: NaN,
    },
  },
  data() {
    return {
      hasTopLine: true,
      topline: [
        "1px solid #83c44e",
        "1px solid #00c0a5",
        "1px solid #ffac13",
        "1px solid #e53935",
        "1px solid #2196f3",
      ],
    };
  },
  methods: {
    toDetails(e) {
      console.log("toDetails:", e);
      this.$router.push({
        path: "GoodsDetails",
        query: { productId: e.productId },
      });
      console.log(this.$router);
      console.log(this.$route);
    },
  },
};
</script>
<style lang='scss' scoped>
.googs-card {
  width: 234px;
  // height: 290px;
  margin-bottom: 10px;
  background: #fff;
  padding-bottom: 20px;
  margin: 0 auto;

  transition: all 0.5s;
  flex: none; // 0 0 auto 的简写形式
  position: relative;
  &:hover {
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }

  .topline {
    display: inline-block;
    width: 100%;
    height: 0;
    padding-bottom: 20px;
  }
  .img-warpper {
    text-align: center;
    padding: 20px;
    img {
      width: 160px;
      min-height: 160px;
    }
  }

  .title {
    font-size: 14px;
    line-height: 18px;
    color: rgb(33, 33, 33);
    text-align: center;
  }
  .explain {
    color: #b0b0b0;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    padding: 0 14px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    color: #ff6709;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
  }
  .addBtn {
    width: 80%;
    height: 20px;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
    background: #ff6709;
    color: #fff;
    &:hover {
      background: #f55618;
      cursor: pointer;
    }
  }
}
</style>