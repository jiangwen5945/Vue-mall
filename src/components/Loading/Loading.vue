
<template>
  <div class="loading" v-if="isShow">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      shadeState: this.isShow,
    };
  },
  props: {
    isShow: {
      type: Boolean,
    },
  },
  methods: {
    hideShade() {
      this.shadeState = false;
      this.$emit("setState", this.shadeState);
    },
  },
};
</script>
<style lang='scss' scoped>
</style>