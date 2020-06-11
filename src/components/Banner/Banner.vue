<template>
  <div class="Banner">
    <div class="home-banner-box">
      <a href="#" target="_blank">
        <img
          width="1226"
          height="120"
          src="https://dummyimage.com/1226x120"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner"
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.home-banner-box {
    height: 120px;
    margin: 22px auto;
    overflow: hidden;
}
</style>