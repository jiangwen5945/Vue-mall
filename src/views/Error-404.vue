<template>
  <div class="Error-404">
    <img class="bg" src="../assets/imgs/404.png" />
    <a href="/" class="btn">返回首页</a>
  </div>
</template>

<script>
export default {
  name: "Error-404",
  components: {},
  props: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.Error-404 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.bg {
  display: block;
  max-width: 100%;
}
.btn {
  display: block;
  width: 120px;
  height: 46px;
  border: 1px solid #5298ff;
  background: #5298ff;
  color: #fff;
  line-height: 46px;
  text-align: center;
  font-size: 16px;
  border-radius: 3px;
  overflow: hidden;
  margin: 100px auto;
}

@media screen and (max-width: 500px) {
  .btn {
    width: 85%;
  }
}
</style>