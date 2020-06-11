<template>
  <div class="small-googs-card">
    <div class="small-box">
      <a href="#">
        <img src="https://dummyimage.com/80x80" />
        <h3 href="#" class="name">xxxx</h3>
        <a href="#" class="price">xx元</a>
      </a>
    </div>
    <div class="small-box">
      <a href="#">
        <img src="https://dummyimage.com/80x80" />
        <h3 href class="name">xxxx</h3>
        <a href class="price">xx元</a>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallGoodsCard",
  props: {
    goodsParm: {
      type: Object,
      default: () => {
        return {};
      }
    },
    topLineIndex: {
      type: Number,
      default: NaN
    }
  },
  data() {
    return {
      hasTopLine: true
    };
  }
};
</script>
<style lang='scss' scoped>
.small-googs-card {
  .small-box {
    width: 234px;
    height: 144px;
    position: relative;
    transition: all 0.5s 0.1s;
    box-sizing: border-box;
    background-color: #fff;
    padding: 60px 20px 0 24px;
    font-size: 14px;
    line-height: 21px;
    &:first-child {
      margin-bottom: 12px;
    }
    &:hover {
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
      transform: translate3d(0, -2px, 0);
    }
    .name {
      color: rgb(33, 33, 33);
    }
    .price {
      color: #ff6709;
    }
    img {
      position: absolute;
      right: 20px;
      top: 38px;
      width: 80px;
      height: 80px;
    }
  }
}
</style>