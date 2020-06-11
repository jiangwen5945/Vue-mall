<template>
  <div class="tag">
    <p class="label" :style="{background:tag.bgColor,color:tag.color}">
      <slot>默认标题</slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "Tag",
  components: {},
  created() {
    // 初始化标签数据
    this.tag.color = this.tag.color ? this.tag.color : "#fff";
    this.tag.bgColor = this.tag.bgColor ? this.tag.bgColor : "#a0c868";
  },

  props: {
    tag: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.label {
  padding: 0px 4px;
  height: 22px;
  min-width: 50px;
  position: absolute;
  top: 0px;
  left: 35%;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  color: #ff6700;
  font-weight: 400;
}
</style>