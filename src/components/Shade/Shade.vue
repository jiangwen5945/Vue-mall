<template>
  <transition name="fade">
    <div class="shade-wrapper" v-if="this.$attrs.show">
      <div class="shade-main">
        <!-- 默认插槽 -->
        <slot></slot>

        <!-- 具名插槽 -->
        <slot name="msg-box"></slot>
      </div>

      <div class="shade-close" @click="hideShade(false)" v-if="closeBtn">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Shade",
  props: {
    closeBtn: {
      type: Boolean,
      default: false,
    },
  },
  // inject: ["name"],
  // inject: {
  //   setState: {
  //     default: () => {},
  //   },
  // },

  methods: {
    hideShade() {
      this.$emit("update:show", false);
    },
  }
};
</script>

<style lang='scss' scoped>
// Sticky footers布局
.shade-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.8);
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .shade-main {
    width: 100%;
    flex: 1;
  }
  .shade-close {
    width: 32px;
    height: 64px;
    line-height: 64px;
    clear: both;
    font-size: 32px;
    font-weight: 900;
    cursor: pointer;
    margin: 0 auto;
  }
}

// 淡入动画效果
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}

// 滑动动画效果
.slide-enter-active {
  transition: all 1s;
}
.slide-leave-active {
  transition: all 1s;
}
.slide-enter,
.slide-leave-active {
  opacity: 0;
  transform: translateY(-500px);
}
</style>