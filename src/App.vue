<template>
  <div id="app">
    <top-ad :imgUrl="imgUrl" v-if="hasTopAd"></top-ad>
    <v-header :goodsList="headerData.goodsList" :siteList="headerData.siteList" v-if="hasCommon"></v-header>
    <router-view></router-view>
    <v-footer v-if="hasCommon"></v-footer>
  </div>
</template>


<script>
import TopAd from "@/components/TopAd/TopAd";
import vHeader from "@/components/Header/Header";
import vFooter from "@/components/Footer/Footer";
export default {
  methods: {
    getHeader: function() {
      return this.$axios.get(
        "http://rap2.taobao.org:38080/app/mock/255953/header"
      );
    }
  },
  data() {
    return {
      imgUrl: "https://dummyimage.com/2560x120/02adea",
      headerData: {},
      // 有公共部分的页面
      pathArr: ["/", "/GoodsDetails", "/Classify"]
    };
  },
  computed: {
    hasCommon() {
      for (const path of this.pathArr) {
        if (this.$route.path === path) {
          return true;
        }
      }
      return false;
    },
    hasTopAd() {
      if (this.$route.path === "/") {
        return true;
      }
      return false;
    }
  },
  mounted() {
    let _this = this;
    this.$axios.all([this.getHeader()]).then(
      this.$axios.spread(function(headerData) {
        _this.headerData = headerData.data;
      })
    );
  },
  components: {
    vHeader,
    TopAd,
    vFooter
  }
};
</script>