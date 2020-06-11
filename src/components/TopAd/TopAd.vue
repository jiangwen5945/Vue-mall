<template>
  <div id="top-ad">
    <a href='#'>
      <img :src="imgUrl" alt="推广广告" />
    </a>
  </div>
</template>

<script>
export default {
  name: "TopAd",
  props: {
    imgUrl: String
  }
};
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
    display: block;
  }
</style>
