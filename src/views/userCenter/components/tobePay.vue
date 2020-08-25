<template>
  <ul class="tobePay">
    <li v-for="(item,index) in orderList" :key="index">
      <order-card :orderParam="item"></order-card>
    </li>
  </ul>
</template>

<script>
import orderCard from "./orderCard";
export default {
  name: "tobePay",
  props: {
    orderList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    orderCard,
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
  li{
    margin-bottom: 20px;
  }
</style>
