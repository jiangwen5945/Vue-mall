<template>
  <ul class="crumbs">
    <li v-for="(item,index) in breadList" :key="index">
      <router-link :to="item.path">{{item.meta.title}}</router-link>
      <span class="sep" v-if="breadList.length-1>index">/</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Crumbs",
  props: {
    navParms: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      breadList: [], // 路由集合
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    isHome(route) {
      return route.name === "index";
    },

    getBreadcrumb() {
      // 获取存在title属性的match
      let matched = this.$route.matched.filter((e) => {
        return e.meta.title;
      });

      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/", meta: { title: "首页" } }].concat(matched);
      }
      this.breadList = matched;
    },
  },
};
</script>

<style lang='scss' scoped>
.crumbs {
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  background: #f5f5f5;
  color: #757575;
  width: 1226px;
  margin: 0 auto;
  li {
    display: inline-block;
    a {
      color: #757575;
    }
    .sep {
      margin: 0 0.4em;
      color: #b0b0b0;
    }
  }
}
</style>