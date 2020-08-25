<template>
  <div class="page-hd">
    <h1 class="title">
      {{title}}
      <small v-if="info">
        {{info}}
        <a href="#" target="_blank">了解更多&gt;</a>
      </small>
    </h1>

    <slot name="more"></slot>
  </div>
</template>

<script>
export default {
  name: "pageHeader",
  props:{
   title: {
      type: String,
      default: "默认标题"
    },
    info:{
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.page-hd {
  .title {
    margin: 0;
    font-size: 30px;
    font-weight: 400;
    line-height: 68px;
    color: #757575;
  }
  small {
    margin-left: 10px;
    font-size: 12px;
    line-height: 1.5;
    a {
      color: #757575;
    }
  }
}
</style>