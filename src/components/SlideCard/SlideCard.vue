<template>
  <div class="slide-card">
    <span class="topline" :style="{borderTop: `1px solid ${randomColor}`}"></span>
    <div class="card-main">
      <h2 :style="{color: randomColor}">游戏</h2>
      <a href class="title">{{cardlist[curIndex]['title']}}</a>
      <p class="desc">{{cardlist[curIndex]['desc']}}</p>
      <a href class="price">{{cardlist[curIndex]['price']}}</a>
      <img :src="cardlist[curIndex]['url']" />
      <!-- 位置指示点 -->
    </div>
    <ul class="dot">
      <li
        v-for="(item,index) in cardlist"
        :key="index"
        :class="{active:index === curIndex}"
        @click="dotHandle(index)"
      ></li>
    </ul>
    <!-- 左右按钮 -->
    <span class="btn left" @click="preHandle">
      <i class="iconfont icon-back"></i>
    </span>
    <span class="btn right" @click="nextHandle">
      <i class="iconfont icon-more"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "SlideCard",
  props: {
    cardlist: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      curIndex: 0
    };
  },
  methods: {
    preHandle() {
      this.curIndex--;
      if (this.curIndex < 0) {
        this.curIndex = 2;
      }
    },
    nextHandle() {
      // 0-2之间循环取值
      this.curIndex = (this.curIndex + 1) % 3;
    },
    dotHandle(e) {
      this.curIndex = e;
    }
  },
  computed: {
    // 返回值得随意颜色中的随机一个
    randomColor() {
      let colors = [
        "#83c44e",
        "#00c0a5",
        "#3f51b5",
        "#9c27b0",
        "#fbb900",
        '#14ece3',
        '#df14ec',
        '#f44336',
        '#83f95c',
        '#7b60d0',
      ];
      let color = colors[Math.floor(Math.random() * 10)];
      return color
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./SlideCard";
</style>