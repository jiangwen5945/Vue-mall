<template>
  <div class="title-box">
    <a href="# " class="title">
      <slot></slot>
    </a>

    <div class="sub-item">
      <slot name="sub-item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  props: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/index";
.title-box {
  line-height: 58px;
  height: 58px;
  overflow: hidden;
  .title {
    display: block;
    float: left;
    color: rgb(51, 51, 51);
    font-size: 22px;
  }
  .sub-item {
    float: right;
    font-size: 18px;
    a {
      margin: 0 4px;
      color: #999;
      &:hover {
        color: $base-color;
      }
    }
    i{
     outline:none;
    }
  }
}
</style>
