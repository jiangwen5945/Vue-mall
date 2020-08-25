<template>
  <div id="app">
    <v-header  :siteList="siteList" v-if="hasCommon"></v-header>
    <search-bar :goodsList="headerData.goodsList" v-if="hasCommon"></search-bar>
    <router-view></router-view>
    <v-footer v-if="hasCommon"></v-footer>
  </div>
</template>


<script>
import vHeader from "@/components/Header/Header";
import SearchBar from "@/components/SearchBar/SearchBar";
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
      siteList:[
        '橙狐',
        '站点1',
        '站点2',
        '站点3',
        '站点4',
        '站点5',
        '站点6',
        '站点7',
        '社区',
        '服务',
        '帮助中心',
        'Select Location' // 国际化
      ],
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
    SearchBar,
    vFooter
  }
};
</script>

<style lang="scss" >
// icon在线字体
@import url('http://at.alicdn.com/t/font_1981066_i18zdqmazfn.css');;
</style>