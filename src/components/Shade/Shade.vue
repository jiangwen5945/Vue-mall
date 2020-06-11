<template>
  <transition name="fade">
    <div class="shade" v-if="isShow">
      <div class="shade-wrapper">
        <div class="shade-main">
          <slot></slot>
        </div>
      </div>
      <div class="shade-close" @click="hideShade">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Shade",
  data() {
    return {
      shadeState: this.isShow
    };
  },
  props: {
    isShow: {
      type: Boolean
    }
  },
  methods: {
    hideShade() {
      this.shadeState = false;
      this.$emit("getState", this.shadeState);
    }
  }
};
</script>
<style lang='scss' scoped>
.shade {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  backdrop-filter: blur(8px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.8);
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

  .shade-wrapper {
    width: 100%;
    min-height: 100%;
    .shade-main {
      padding-bottom: 64px;  // sticky布局关键点
    }
  }
  .shade-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;  // sticky布局关键点
    clear: both;
    font-size: 32px;
    font-weight: 900;
    cursor: pointer;
  }
}
</style>