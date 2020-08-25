<template>
  <div class="page-box">
    <page-header :title='title'></page-header>
    <div class="more">
      <ul class="filter-list">
        <li
          class="first"
          v-for="(item,index) in titleList"
          :key="index"
          :class="index==currentIndex?'active':''"
          @click="switchTab(item,index)"
        >
          <a href="#">{{item}}</a>
          <span class="num"></span>
        </li>
      </ul>
    </div>
    <div class="page-bd">
      <div class="empty" type="activity">暂无数据</div>
    </div>
  </div>
</template>

<script>
import pageHeader from "./components/pageHeader";
export default {
  name: "messagePage",
  components: {
    pageHeader,
  },
  data() {
    return {
      titleList: ["全部消息", "物流动态", "优惠活动"],
      currentIndex: 0,
      title: '消息通知'
    };
  },
  methods: {
    init() {},
    switchTab(item, index) {
      this.currentIndex = index;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.page-box {
  padding: 0 48px;
  background: #fff;
}
.more {
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  .filter-list {
    float: left;
    margin: 0;
    padding: 18px 0;
    list-style-type: none;
    font-size: 16px;
    line-height: 1.25;
    li {
      float: left;
      padding: 0 20px;
      border-left: 1px solid #e0e0e0;
      color: #757575;
      &:first-child {
        padding-left: 0;
        border-left: 0;
      }
      a {
        color: inherit;
      }
    }
    .active {
      color: #ff6700;
    }
  }
}
.page-bd {
  .empty {
    margin: 40px 0;
    font-size: 18px;
    text-align: center;
    color: #b0b0b0;
  }
}
</style>