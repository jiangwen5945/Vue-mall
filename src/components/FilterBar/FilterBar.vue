<template>
  <div class="filter-bar">
    <div class="order-list-box">
      <ul class="order-list">
        <li class="order-item">
          <a goods-order-item href="javascript: void(0);">综合</a>
        </li>
        <li class="order-item">
          <a goods-order-item href="javascript: void(0);" @click="handleSort(sort)">价格</a>
          <i class="iconfont icon-arrow_up_fill" :style="sortStyle"></i>
        </li>
      </ul>
      <ul class="type-list">
        <li v-for="(item,index) in typeList" :key="index" :class="{checked: index == isCheck }">
          <span class="checkbox" @click="isCheck = index">
            <i class="iconfont icon-check" :class="{checked: index == isCheck }"></i>
          </span>
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  components: {},
  props: {},
  data() {
    return {
      isCheck: 0,
      typeList: ["促销", "分期", "现货"],
      sort: -1,
    };
  },
  computed: {
    sortStyle() {
      return this.sort === 1
        ? "transform: rotate(180deg)"
        : "transform: rotate(0deg)";
    },
  },
  watch: {},
  methods: {
    handleSort(e) {
      this.sort *= -1;
      this.$emit("postSort", e);
    },
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.filter-bar {
  width: 1226px;
  margin: 0 auto;
  padding-top: 20px;
}
.order-list-box {
  position: relative;
  height: 30px;
  .order-list {
    float: left;
    height: 30px;
    line-height: 30px;

    .order-item {
      float: left;
      padding: 0 30px;
      border-left: 1px solid #e0e0e0;
      color: #424242;
      &:hover {
        color: #ff6709;
      }
      &:first-child {
        border-left: none;
        color: #ff6709;
      }
      &:first-child a {
        color: #ff6709;
      }
      a {
        transition: color 0.2s;
        color: inherit;
        cursor: pointer;
      }
      i {
        transition: all 0.2s;
        display: inline-block;
      }
    }
  }
  .type-list {
    float: right;
    height: 30px;
    line-height: 30px;
    li {
      float: left;
      margin-left: 30px;
      color: #424242;
      transition: color 0.2s;
      &:hover {
        color: #ff6709;
      }
    }
    .checkbox {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 8px;
      border: 1px solid #e0e0e0;
      background-color: #fff;
      vertical-align: -2px;
      font-size: 16px;
      line-height: 18px;
      text-align: center;
      i {
        visibility: hidden;
      }
      .checked {
        visibility: visible;
        color: #ff6709;
      }
    }
  }
}
</style>