<template>
  <div class="page-box">
    <page-header :title="title"></page-header>
    <!-- <address-list></address-list> -->
    <address-list></address-list>
  </div>
</template>

<script>
import pageHeader from "./components/pageHeader";
import AddressList from "@/components/AddressList/AddressList";
export default {
  name: "addressPage",
  components: {
    pageHeader,
    AddressList,
  },
  data() {
    return {
      title: "收货地址",
    };
  },
};
</script>

<style lang="scss" scoped>
.page-box {
  padding: 0 48px;
  background: #fff;
}
</style>