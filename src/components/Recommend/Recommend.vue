
<template>
  <div class="recommend-wrapper">
    <div class="recommend">
      <h2 class="recommend-title">
        <span>
          <slot>买购物车中商品的人还买了</slot>
        </span>
      </h2>
      <goods-class :GoodList="goodList"></goods-class>
    </div>
  </div>
</template>
<script>
// 引入轮播图组件
import "./recommend.css";
import GoodsClass from "@/components/GoodsClass/GoodsClass";
import TitleBar from "@/components/TitleBar/TitleBar";
export default {
  name: "recommend",
  components: {
    GoodsClass,
    TitleBar
  },
  props: {},
  data() {
    return {
      goodList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getGoodList();
    },
    getGoodList() {
      this.$axios
        .get(`${this.$api}/goods/list`, {
          params: {
            typeId: "2"
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.goodList = res.data.result.list;
          } else {
            this.goodList = [];
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
