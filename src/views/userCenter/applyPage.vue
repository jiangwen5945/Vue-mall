<template>
  <div class="page-box">
    <page-header :title="title"></page-header>
    <div class="page-bd">
      <p class="empty">当前没有申请记录哦~</p>
    </div>
  </div>
</template>

<script>
import pageHeader from "./components/pageHeader";
import AddressList from "@/components/AddressList/AddressList";
export default {
  name: "applyPage",
  components: {
    pageHeader,
    AddressList,
  },
  data() {
    return {
      title: "申请记录",
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