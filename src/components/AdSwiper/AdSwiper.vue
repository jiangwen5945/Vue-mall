<template>
  <div class="swiper-container">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(slide,index) in slideList" :key="index">
        <img v-lazy="slide.url" />
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="swiper-button-prev" style=" outline: none "></div>
    <div class="swiper-button-next" style="outline: none "></div>
  </div>
</template>
<script>
// 引入轮播图组件
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "JSwiper",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    slideList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        effect: "fade"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 460px;
  --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
  --swiper-navigation-color: #c4c4c4; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px; /* 设置按钮大小 */
  .swiper-button-prev {
    position: absolute;
    left: 234px;
  }
  .swiper-button-next {
    position: absolute;
    right: 0;
  }
  .swiper-button-prev,
  .swiper-button-next {
    padding: 18px 10px;
    &:hover {
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
