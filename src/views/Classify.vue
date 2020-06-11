<template>
  <div class="classify">
    <ul class="card-wrapper">
      <li v-for="(item,index) in items" :key="index">
        <goods-card :goodsParm="item">
          <tag :tag="item.tag" v-if="item.tag">{{item.title}}</tag>
        </goods-card>
      </li>
    </ul>
  </div>
</template>

<script>
import GoodsCard from "@/components/GoodsCard/GoodsCard";
import Tag from "@/components/Tag/Tag.vue";
export default {
  name: "Classify",
  components: {
    GoodsCard,
    Tag
  },
  mounted() {
    this.$axios.get("./mock/data.json").then(res => {
      this.items = res.data.result[0].GoodList1;
      console.log(this.items);
    });
  },
  props: {},
  data() {
    return {
      items: []
    };
  }
};
</script>

<style lang="scss" scoped>
.classify {
  display: flex;
  justify-content: center;
  background: #f5f5f5;
  .card-wrapper {
    width: 1226px;
    min-height: 614px;
    padding: 20px 0;
    // box-sizing: border-box;
    li{
      float: left;
      width: 25%;
      margin: 20px auto;
    }
  }
}
</style>