<template>
  <div class="footer-container">
    <ul class="footer-service">
      <li>
        <i class="iconfont icon-repair"></i>
        <a>预约维修服务</a>
      </li>

      <li>
        <i class="iconfont icon-refund"></i>
        <a>7天无理由退货</a>
      </li>
      <li>
        <i class="iconfont icon-round_transfer"></i>
        <a>15天免费换货</a>
      </li>
      <li>
        <i class="iconfont icon-present"></i>
        <a>满150元包邮</a>
      </li>
      <li>
        <i class="iconfont icon-location"></i>
        <a>520余家售后网点</a>
      </li>
    </ul>

    <div class="footer-links">
      <div class="r-box">
        <ul v-for="(item,index) in 6" :key="index">
          <li>
            <p>标题</p>
          </li>
          <li>
            <a href>项目1</a>
          </li>
          <li>
            <a href>项目2</a>
          </li>
          <li>
            <a href>项目3</a>
          </li>
        </ul>
      </div>

      <div class="l-box">
        <p class="phone">xxx-xxx-xxxx</p>
        <p class="time">
          周一至周日 8:00-18:00
          <br />（仅收市话费）
        </p>
        <i class="iconfont icon-comment_fill_light">在线客服</i>
      </div>
    </div>
    <div class="footer-info">
      <div class="lside">
        <a v-for="(item,index) in 12" :key="index">xxxxxx</a>
      </div>
      <ul>
        <li v-for="(item,index) in imgUrl" :key="index">
          <img :src="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {},
  data() {
    return {
      imgUrl: [
        require("../../assets/imgs/bottom1.png"),
        require("../../assets/imgs/bottom2.png"),
        require("../../assets/imgs/bottom3.png"),
        require("../../assets/imgs/bottom4.png"),
      ],
    };
  },
};
</script>
<style lang='scss' scoped>
@import "./Footer";
</style>