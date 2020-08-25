<template>
  <Shade v-bind='$attrs' v-on="$listeners">
    <main>
      <header>{{title}}</header>
      <div class="btn-group">
        <span class="btn btn-primary" @click="handleConfirm()">确认</span>
        <span class="btn btn-normal" @click="isShow(false)">取消</span>
      </div>
    </main>
  </Shade>
</template>

<script>
import Shade from "@/components/Shade/Shade";
export default {
  name: "ConfirmBox",
  components: {
    Shade,
  },
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "操作标题",
    },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  methods: {
    isShow(e) {
      this.$emit("isShow", e);
    },
    handleConfirm() {
      this.$emit("handleConfirm");
    },
  },
};
</script>
<style lang='scss' scoped>
main{
  width: 30%;
  height: 260px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  z-index: 100;
  header {
    font: bold 24px/36px arial, sans-serif;
    text-align: center;
    padding: 70px 0;
  }

  .btn-group {
    display: flex;
    justify-content: center;
    .btn {
      margin: 0 10px;
    }
  }
}
</style>