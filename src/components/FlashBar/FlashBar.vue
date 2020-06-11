<template>
  <div class="flash-bar">
    <title-bar>
      FlashBar模块
      <template v-slot:sub-item>
        <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <i class="iconfont icon-back swiper-button-prev2" @click="prevHanddle"></i>
        <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <i class="iconfont icon-more swiper-button-next2" @click="nextHanddle"></i>
      </template>
    </title-bar>

    <div class="swiper-container2">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(list,index) in getFormatArray" :key="index" class="bar-page">
          <goods-card
            :goodsParm="item"
            v-for="(item,index) in list"
            :key="index"
            :topLineIndex="index"
          ></goods-card>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar/TitleBar.vue";
import GoodsCard from "@/components/GoodsCard/GoodsCard.vue";
import Tag from "@/components/Tag/Tag.vue";
// 引入轮播图组件
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "FlashBar",
  components: {
    GoodsCard,
    Swiper,
    SwiperSlide,
    TitleBar,
    Tag
  },
  computed: {
    getFormatArray: function() {
      // this is dev
      // function deepClone(item) {
      //   const target = item.constructor === Array ? [] : {};
      //   for (let keys in item) {
      //     if (item.hasOwnProperty(keys)) {
      //       if (item[keys] && typeof item[keys] === "object") {
      //         target[keys] = item[keys].constructor === Array ? [] : {};
      //         target[keys] = deepClone(item[keys]);
      //       } else {
      //         target[keys] = item[keys];
      //       }
      //     }
      //   }
      //   return target;
      // }
      // let copyDate =  deepClone(this.GoodList)
      // 深拷贝对象
      let copyDate = JSON.parse(JSON.stringify(this.GoodList)); // 方法2

      let len = copyDate.length;
      //   定义循环的次数
      let n = Math.ceil(len / 5);
      let tmpArr = [];

      for (let i = 0; i < n; i++) {
        tmpArr.push(copyDate.splice(0, 5));
      }
      return tmpArr;
    }
  },
  methods: {
    nextHanddle() {
      console.log("click nextHanddle");
    },
    prevHanddle() {
      console.log("click prevHanddle");
    }
  },
  props: {
    GoodList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: ".swiper-button-next2",
          prevEl: ".swiper-button-prev2"
        },
        autoplay: true,
        loop: false
      }
      // flashList: this.GoodList
    };
  }
};
</script>
<style lang='scss' scoped>
@import "./FlashBar.scss";
.swiper-container2 {
  position: relative;
  .bar-page {
    width: 1226px;
    float: left;
    display: flex;
    justify-content: space-between;
  }

  // .swiper-button-prev2,
  // .swiper-button-next2 {
  //   padding: 18px 10px;
  //   &:hover {
  //     color: #fff;
  //     background: rgba(0, 0, 0, 0.6);
  //   }
  // }
}
</style>