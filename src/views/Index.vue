<template>
  <div class="GoodsList">
    <category :categoryList="categoryList">
      <ad-swiper :slideList="slideList"></ad-swiper>
    </category>
    <div class="bg-box">
      <div class="container" style="background:#eee">
        <flash-bar :GoodList="goodsListData.GoodList3"></flash-bar>
        <banner></banner>
        <goods-class :GoodList="goodsListData.GoodList1">
          <template v-slot:title>默认模块1</template>
          <template v-slot:item>
            <router-link to="Classify">查看全部</router-link>
            
            <i class="iconfont icon-more"></i>
          </template>
        </goods-class>
        <banner></banner>
        <goods-class :GoodList="goodsListData.GoodList2">默认模块2</goods-class>
        <banner></banner>
        <goods-class :GoodList="goodsListData.GoodList3">默认模块3</goods-class>
        <banner></banner>
        <slide-class :listClass="slideListData"></slide-class>
        <banner></banner>
        <video-class :videoList="videoList"></video-class>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category/Category";
import FlashBar from "@/components/FlashBar/FlashBar";
import Banner from "@/components/Banner/Banner";
import GoodsClass from "@/components/GoodsClass/GoodsClass";
import SlideClass from "@/components/SlideClass/SlideClass";
import VideoClass from "@/components/VideoClass/VideoClass";
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
    VideoClass
  },
  methods: {
    getCategoryList: function() {
      return this.$axios.post(
        "http://rap2.taobao.org:38080/app/mock/255953/categoryList"
      );
    },
    getSlideList: function() {
      return this.$axios.get(
        "http://rap2.taobao.org:38080/app/mock/255953/slideList"
      );
    },
    getGoodList: function() {
      return this.$axios.get("./mock/data.json");
    },
    getSlideListData: function() {
      return this.$axios.get(
        "http://rap2.taobao.org:38080/app/mock/255953/slideListData"
      );
    },
    getVideoList: function() {
      return this.$axios.get(
        "http://rap2.taobao.org:38080/app/mock/255953/videoList"
      );
    }
  },
  data() {
    return {
      imgUrl: "https://dummyimage.com/2560x120/02adea",
      categoryList: [],
      slideList: [],
      goodsListData: {},
      slideListData: [],
      videoList: []
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
        this.getVideoList()
      ])
      .then(
        this.$axios.spread(function(
          categoryList,
          slideList,
          goodsListData,
          slideListData,
          videoList
        ) {
          _this.categoryList = categoryList.data.categoryList;
          _this.slideList = slideList.data.slideList;
          _this.goodsListData = goodsListData.data.result[0];
          _this.slideListData = slideListData.data.slideListData;
          _this.videoList = videoList.data.videoList;
        })
      );
  }
};
</script>

<style lang="scss">
.container {
  width: 1226px;
  margin: 0 auto;
  padding-bottom: 24px;
}
.bg-box {
  background: #eee;
  width: 100%;
}
</style>
