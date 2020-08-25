<template>
  <div class="classify">
    <FilterBar @postSort="handleSort"></FilterBar>
    <ul class="card-wrapper">
      <li v-for="(item,index) in goodList" :key="index">
        <goods-card :goodsParm="item">
          <div class="addBtn" @click.stop="addCart(item.productId,1)">加入购物车</div>
        </goods-card>
      </li>

      <!-- 加载图标 -->
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="30"
        infinite-scroll-immediate-check="true"
        class="load-more"
        v-show="this.loading"
      >
        <img src="./../assets/imgs/loading-spinning-bubbles.svg" />
      </div>
    </ul>
    <tool-bar></tool-bar>
    <login-box :isShow="isShow" @getState="getState"></login-box>
  </div>
</template>

<script>
import GoodsCard from "@/components/GoodsCard/GoodsCard";
import Tag from "@/components/Tag/Tag.vue";
import LoginBox from "@/components/LoginBox/LoginBox.vue";
import FilterBar from "@/components/FilterBar/FilterBar.vue";
import ToolBar from "@/components/ToolBar/ToolBar";
export default {
  name: "Classify",
  components: {
    GoodsCard,
    Tag,
    LoginBox,
    FilterBar,
    ToolBar
  },
  mounted() {
    this.getGoodsList();
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin; // 检测是否登录
    },
  },

  props: {},
  data() {
    return {
      goodList: [],
      page: 1,
      pageSize: 8,
      sortFlag: undefined,
      busy: true, // 默认关闭滚动加载
      loading: false,
      priceLevel: undefined,
      isShow: false, // 登录框显示
    };
  },
  methods: {
    getGoodsList(flag) {
      // 显示加载图标
      this.loading = true;
      // 获取请求数据参数
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag === undefined ? undefined : this.sortFlag,
        priceLevel: this.priceLevel,
      };
      // 异步请求数据
      this.$axios
        .get(`${this.$api}/goods/list`, {
          params: param,
        })
        .then((res) => {
          console.log(res.data.result);

          if (res.data.status == "0") {
            if (!flag) {
              // 正常进入加载首页数据
              this.goodList = res.data.result.list;
              this.busy = false;
            } else {
              // 下拉加载数据（累加数组）
              this.goodList = this.goodList.concat(res.data.result.list);
              this.loading = false;
              // 剩余条数小于每页条数时关闭下次数据请求
              if (res.data.result.count < this.pageSize) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            }
          } else {
            // 接口请求失败
            this.goodList = [];
          }
        });
    },
    // 价格排序
    handleSort(e) {
      console.log(e);
      this.sortFlag = e;
      this.page = 1;
      this.getGoodsList();
    },
    // 滚动加载
    loadMore: function () {
      console.log("loadMore...");
      this.busy = true;
      let timer = setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
        this.busy = false;
      }, 1000);
    },
    // 加入购物车
    addCart(e, num) {
      console.log(e);
      this.$axios
        .post(`${this.$api}/goods/addCart`, {
          productId: e,
        })
        .then((res) => {
          if (res.data.status == 0) {
            this.$store.commit("addCartList", num);
          } else {
            console.log(res.data.msg);
            this.isShow = true;
          }
        });
    },
    // 关闭登录框
    getState(e) {
      this.isShow = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.classify {
  justify-content: center;
  background: #f5f5f5;
  overflow: hidden;
  .card-wrapper {
    width: 1226px;
    min-height: 614px;
    padding: 20px 0;
    margin: 0 auto;
    li {
      float: left;
      width: 25%;
      margin: 20px auto;
    }
  }
}

.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
  width: 100%;
  overflow: hidden;
}
</style>