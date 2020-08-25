<template>
  <div class="flash-bar">
    <title-bar>
      新品模块
      <template v-slot:inner-con>
        <i class="iconfont icon-back swiper-button-prev2"></i>
        <i class="iconfont icon-right swiper-button-next2"></i>
      </template>
    </title-bar>

    <div class="swiper-container2">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(list,index) in getFormatArray" :key="index" class="bar-page">
          <goods-card
            :goodsParm="item"
            :topLineIndex="index"
            v-for="(item,index) in list"
            :key="index"
            class="hover-card"
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
    Tag,
  },
  computed: {
    getFormatArray: function () {
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
    },
  },
  methods: {},
  props: {
    GoodList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: ".swiper-button-next2",
          prevEl: ".swiper-button-prev2",
        },
        autoplay: false,
        loop: false,
      },
      // flashList: this.GoodList
    };
  },
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/index";

.swiper-container2 {
  position: relative;
  .bar-page {
    width: 1226px;
    display: flex;
    justify-content: space-between;
    .hover-card{
      &:hover {
        box-shadow: 0 -3px 12px 3px rgba(0, 0, 0, 0.1);
        transform: none
      }
    }
  }
}

.iconfont {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  padding: 2px 12px;
  margin: 0 2px;
  color: #e0e0e0;
  background: #fff;
}

.icon-back,
.icon-right {
  &:hover {
    color: #fff;
    background: $base-color;
  }
}
</style>