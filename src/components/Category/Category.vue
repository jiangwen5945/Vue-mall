<template>
  <div class="category-container">
    <div class="category-menu">
      <!--轮播区左侧开始-->
      <div class="category-list">
        <div
          class="category-item"
          v-for="(item, index) in categoryList"
          :key="index"
          @mouseenter="toShow"
          @mouseleave="toHide"
          :data-index="index"
        >
          <a href class="title">
            {{item.categoryName}}
            <i class="iconfont icon-jiantou"></i>
          </a>
          <ul class="list-childen" v-show="isShow === index">
            <li v-for="(children,index) in item.childrenLists" :key="index">
              <img :src="children.imgSrc" />
              <p class="overflow">{{children.title}}</p>
              <input type="submit" value="选购" />
            </li>
          </ul>
        </div>
      </div>

      <!--轮播区中间开始-->
      <div class="category-middle">
        <slot></slot>
      </div>

      <!--轮播区底部开始-->
      <ul class="category-bottom">
        <li class="icon-wrapper">
          <a class="icon-item" v-for="(item,index) in 6" :key="index">
            <i class="iconfont icon-tag"></i>
            <span>图标名称</span>
          </a>
        </li>
        <li v-for="(item,index) in 3" :key="index">
          <img src="https://dummyimage.com/'316x170'/f27998" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    categoryList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isShow: NaN
    };
  },
  components: {},
  methods: {
    toShow(e) {
      this.isShow = parseInt(e.target.dataset.index);
    },
    toHide(e) {
      this.isShow = NaN;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./Category.scss";
</style>
