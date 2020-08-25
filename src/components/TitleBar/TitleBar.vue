<template>
  <div class="bar-wrapper">
    <a href="# " class="title">
      <slot></slot>
    </a>
    <div class="sub-item">
      <slot name="inner-con">
        <router-link to="Classify">
          查看全部
          <i class="iconfont icon-right"></i>
        </router-link>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  props: {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/index";

.bar-wrapper {
  height: 58px;
  overflow: hidden;
  .title {
    display: block;
    float: left;
    color: rgb(51, 51, 51);
    font-size: 22px;
    line-height: 58px;
  }
  .sub-item {
    float: right;
    font-size: 18px;
    line-height: 58px;
    a {
      margin: 0 4px;
      color: #999;
      &:hover {
        color: $base-color;
      }
    }
    i {
      font-size: 16px;
      line-height: 16px;
    }
  }
}
</style>
