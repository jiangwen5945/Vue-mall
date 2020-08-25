<template>
  <div class="orderList">
    <page-header :title="title" :info='info'></page-header>
    <div class="more">
      <ul class="filter-list">
        <li
          v-for="(item ,index) in sortList"
          :class="currentTabComponent == item.component?'active':''"
          :key="index"
          @click="handleActive(item,index)"
        >
          <a>{{item.title}}</a>
        </li>
      </ul>

      <div class="search-form">
        <input
          type="search"
          name="keywords"
          autocomplete="off"
          placeholder="输入商品名称、订单号"
          class="search-text"
          v-model="search"
        />
        <i data-v-3193f032 class="search-btn iconfont icon-search" @click="handleSearch"></i>
      </div>
    </div>

    <div class="box-bd">
      <keep-alive>
        <component :is="currentTabComponent" :orderList="currenOrderList"></component>
      </keep-alive>
      <!-- 订单数量为空 -->
      <ul class="order-list" v-if="currentTabList.length == 0">
        <p class="empty">当前没有交易订单。</p>
      </ul>
    </div>
  </div>
</template>

<script>
import tobeComment from "./components/tobeComment";
import tobePay from "./components/tobePay";
import tobeReceived from "./components/tobeReceived";
import effect from "./components/effect";
import invalid from "./components/invalid";
import pageHeader from "./components/pageHeader";
export default {
  name: "orderList",
  components: {
    tobeComment,
    tobePay,
    tobeReceived,
    effect,
    invalid,
    pageHeader,
  },
  data() {
    return {
      currentTab: "effect", // 默认tab
      currenOrderList: [], // 默认全部有效订单
      sortList: [
        {
          title: "全部有效订单",
          component: "effect",
          orderList: [],
        },
        {
          title: "待支付",
          component: "tobePay",
          orderList: [],
        },
        {
          title: "待收货",
          component: "tobeReceived",
          orderList: [],
        },
        {
          title: "待评价",
          component: "tobeComment",
          orderList: [],
        },
        {
          title: "订单回收站",
          component: "invalid",
          orderList: [],
        },
      ],
      search: "",
      orderList: [],
      title: "我的订单",
      info: '请谨防钓鱼链接或诈骗电话'
    };
  },
  mounted() {
    this.init();
    let params = Object.keys(this.$route.params).length;
    // 如果存在路由参数指定tab，则跳转至该tab
    if (params) {
      this.currentTab = this.$route.params.component;
    }
  },

  methods: {
    init() {
      // 获取所有订单
      this.getOrderList();
      // 将订单分类处理
      this.sortOrder();
      // 初始化订单tab
      this.currentTab = "effect";
    },
    getOrderList() {
      this.orderList = this.$store.state.userInfo.orderList;
    },
    // 分类订单
    sortOrder() {
      let effectList = this.orderList.filter((e) => e.orderStatus != 0);
      let tobePay = this.orderList.filter((e) => e.orderStatus == 1);
      let tobeReceived = this.orderList.filter((e) => e.orderStatus == 2);
      let tobeComment = this.orderList.filter((e) => e.orderStatus == 3);
      let invalid = this.orderList.filter((e) => e.orderStatus == 0);
      let arr = [effectList, tobePay, tobeReceived, tobeComment, invalid];
      this.sortList.forEach((e, i) => {
        e.orderList = arr[i];
      });
    },
    // 切换tab
    handleActive(item, index) {
      this.currentTab = item.component;
    },
    // 搜索订单
    handleSearch() {
      let search = this.search; // 获取查询条件
      // 没有条件时，显示所有
      if (search == "") {
        this.getOrderList();
      } else {
        // 根据订单号或商品名称模糊查询
        this.orderList = this.orderList.filter((e) => {
          return (
            e.orderId.indexOf(search) != -1 ||
            e.goodsList.some((item) => item.productName.indexOf(search) != -1)
          );
        });
      }
      // 由于计算属性关联着currenOrderList属性，所以不能从当前到tab订单列表中改变数据（由于监听到计算属性改变后又会重新计算赋值），必须从数据源筛选订单后重新分类一次
      this.sortOrder();
    },
  },
  computed: {
    currentTabComponent() {
      return this.currentTab;
    },
    currentTabList() {
      this.sortList.forEach((e) => {
        if (e.component == this.currentTab) {
          this.currenOrderList = e.orderList;
        }
      });
      return this.currenOrderList;
    },
  },
};
</script>

<style lang="scss" scoped>
.orderList {
  padding: 0 48px;
  .more {
    border-bottom: 0;
    overflow: hidden;
  }
  .filter-list {
    float: left;
    margin: 0;
    padding: 18px 0;
    list-style-type: none;
    font-size: 16px;
    line-height: 1.25;

    .active {
      color: #ff6700;
    }
    li {
      float: left;
      padding: 0 20px;
      border-left: 1px solid #e0e0e0;
      color: #757575;
      cursor: pointer;
      &:first-child {
        padding-left: 0;
        border-left: 0;
      }
    }
  }
  .search-form {
    float: right;
    position: relative;
    width: 262px;
    height: 40px;
    margin-top: 8px;
    .search-text,
    .search-btn {
      position: absolute;
      top: 0;
      border: 1px solid #e0e0e0;
      outline: 0;
      transition: all 0.2s;
      box-sizing: content-box;
      color: #757575;
    }
    .search-text {
      right: 39px;
      z-index: 1;
      width: 189px;
      height: 40px;
      padding: 0 15px;
      font-size: 12px;
      line-height: 40px;
      color: #757575;
    }
    .search-btn {
      right: 0;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #fff;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #ff6700;
      }
    }
  }

  .box-bd {
    .order-list {
      .order-item {
        margin-bottom: 20px;
      }
    }
    .empty {
      margin: 40px 0;
      font-size: 18px;
      text-align: center;
      color: #b0b0b0;
    }
  }
}
</style>