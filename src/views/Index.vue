<template>
  <div class="container">
    <category :categoryList="categoryList">
      <ad-swiper :slideList="slideList"></ad-swiper>
    </category>
    <main>
      <flash-bar :GoodList="goodsListData.list"></flash-bar>
      <banner></banner>
      <title-bar>模块一</title-bar>
      <goods-class :GoodList="goodsListData.list"></goods-class>
      <banner></banner>
      <title-bar>
        模块二
        <template v-slot:inner-con>
          <a href="#">选项1</a>
          <a href="#">选项2</a>
          <a href="#">选项3</a>
        </template>
      </title-bar>
      <goods-class :GoodList="goodsListData.list"></goods-class>
      <banner></banner>
      <title-bar>模块三</title-bar>
      <goods-class :GoodList="goodsListData.list"></goods-class>
      <banner></banner>
      <slide-class :listClass="slideListData"></slide-class>
      <banner></banner>
      <video-class :videoList="videoList"></video-class>
      <tool-bar></tool-bar>
    </main>
  </div>
</template>

<script>
import Category from "@/components/Category/Category";
import FlashBar from "@/components/FlashBar/FlashBar";
import Banner from "@/components/Banner/Banner";
import GoodsClass from "@/components/GoodsClass/GoodsClass";
import SlideClass from "@/components/SlideClass/SlideClass";
import VideoClass from "@/components/VideoClass/VideoClass";
import TitleBar from "@/components/TitleBar/TitleBar";
import ToolBar from "@/components/ToolBar/ToolBar";

// 自定义封装swiper
import AdSwiper from "@/components/AdSwiper/AdSwiper";

export default {
  name: "GoodsList",
  components: {
    Category,
    AdSwiper,
    FlashBar,
    Banner,
    GoodsClass,
    SlideClass,
    VideoClass,
    TitleBar,
    ToolBar,
  },
  methods: {
    init() {},

    getCategoryList: function () {
      return this.$axios.post(
        "http://rap2.taobao.org:38080/app/mock/255953/categoryList"
      );
    },
    getSlideList: function () {
      return this.$axios.get(
        "http://rap2.taobao.org:38080/app/mock/255953/slideList"
      );
    },
    // 获取商品列表数据
    getGoodList: function () {
      return this.$axios.get(`${this.$api}/goods/list`);
    },
    getSlideListData: function () {
      return this.$axios.get(
        "http://rap2.taobao.org:38080/app/mock/255953/slideListData"
      );
    },
    getVideoList: function () {
      return this.$axios.get(
        "http://rap2.taobao.org:38080/app/mock/255953/videoList"
      );
    },
  },
  data() {
    return {
      imgUrl: "https://dummyimage.com/2560x120/02adea",
      categoryList: [],
      slideList: [],
      goodsListData: {},
      slideListData: [],
      videoList: [],
    };
  },
  mounted() {
    let _this = this;
    this.$axios
      .all([
        this.getCategoryList(),
        this.getSlideList(),
        this.getGoodList(),
        this.getSlideListData(),
        this.getVideoList(),
      ])
      .then(
        this.$axios.spread(function (
          categoryList,
          slideList,
          goodsListData,
          slideListData,
          videoList
        ) {
          _this.categoryList = categoryList.data.categoryList;
          _this.slideList = slideList.data.slideList;
          _this.goodsListData = goodsListData.data.result;

          console.log(goodsListData.data.result);

          _this.slideListData = slideListData.data.slideListData;
          _this.videoList = videoList.data.videoList;
        })
      );
  },
};
</script>

<style lang="scss">
.container {
  background: #eee;
  width: 100%;
  padding-bottom: 20px;
  main {
    width: 1226px;
    margin: 0 auto;
  }
}
</style>
