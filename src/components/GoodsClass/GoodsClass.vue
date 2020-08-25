<template>
  <div class="googs-class">
    <div class="block-box">
      <!-- 避免数据返回前报错 -->
      <div v-if="this.GoodList[0]">
        <div class="left-box" v-if="this.GoodList[0].cardType === 1">
          <img src="https://dummyimage.com/234x614" />
        </div>
      </div>

      <ul class="right-box">
        <li v-for="(item,index) in newArray" :key="index">
          <goods-card :goodsParm="item" v-if="item.cardType===2" >
            <tag :tag="item.tag" v-if="item.tag">{{item.title}}</tag>
          </goods-card>
          <small-goods-card v-if="item.cardType===3" :goodsParm="item"></small-goods-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import GoodsCard from "@/components/GoodsCard/GoodsCard";
import SmallGoodsCard from "@/components/SmallGoodsCard/SmallGoodsCard";
import Tag from "@/components/Tag/Tag.vue";
import TitleBar from "@/components/TitleBar/TitleBar.vue";
export default {
  name: "GoodsClass",
  props: {
    GoodList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {
    GoodsCard,
    SmallGoodsCard,
    Tag,
    TitleBar
  },
  computed: {
    newArray() {
      let arr;
      if (this.GoodList[0]) {
        // 判断第一个产品是否为主推大图
        if (this.GoodList[0].cardType === 1) {
          arr = this.GoodList.slice(1, 9);
          return arr;
        } else {
          return this.GoodList.slice(0, 10);
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./GoodsClass";
</style>