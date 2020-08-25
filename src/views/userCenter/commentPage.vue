<template>
  <div class="page-box">
    <page-header :title="title"></page-header>
    <div class="page-bd">
      <p class="empty">暂时没有符合条件的商品。</p>
    </div>
  </div>
</template>

<script>
import pageHeader from "./components/pageHeader";
import AddressList from "@/components/AddressList/AddressList";
export default {
  name: "commentPage",
  components: {
    pageHeader,
    AddressList,
  },
  data() {
    return {
      title: "订单评论",
    };
  },
};
</script>

<style lang="scss" scoped>
.page-box {
  padding: 0 48px;
  background: #fff;
}
.page-bd {
  margin-top: 15px;
  .empty {
    font-size: 18px;
    text-align: center;
    color: #b0b0b0;
    margin: 40px 0;
  }
}
</style>