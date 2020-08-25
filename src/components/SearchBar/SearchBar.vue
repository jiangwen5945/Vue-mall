
<template>
  <div class="searchBar">
    <!--头部商品导航-->
    <div id="site-header">
      <!--左侧logo区-->
      <div class="logo">
        <router-link to="/">
          <img src="../../assets/imgs/logo.png" />
        </router-link>
        <span class="gif-img">
          <img src="../../assets/imgs/tack.gif" />
        </span>
      </div>
      <!-- 商品标题 -->
      <ul id="header-nav">
        <li
          @mouseenter="showMenu"
          @mouseleave="hideMenu"
          v-for="(items,index) in goodsList"
          :key="index"
          :data-index="index"
        >
          <a href class="title">{{items.title}}</a>
          <transition name="slide-fade">
            <div class="menu-wrapper" v-show="isShow === index">
              <div class="menu-list">
                <div href class="menu-item" v-for="(item,index) in items.menuList" :key="index">
                  <tag :tag="item.tag" v-if="item.tag"></tag>
                  <img :src="item.imgUrl" />
                  <a>{{item.title}}</a>
                  <p class="price">{{item.price}}</p>
                </div>
              </div>
            </div>
          </transition>
        </li>
      </ul>
      <!--右边查询区-->
      <div class="search-wrapper">
        <div class="search">
          <input type="search" placeholder="输入查询商品名称" />
          <i class="iconfont icon-search" @click="handleSearch"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      isShow: NaN,
    };
  },
  props: {
    goodsList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    showMenu(e) {
      this.isShow = parseInt(e.target.dataset.index);
    },
    hideMenu() {
      this.isShow = NaN;
    },
    handleSearch() {
      this.$router.push("Classify");
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./SearchBar.css";

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>