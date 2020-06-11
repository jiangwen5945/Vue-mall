<template>
  <div class="video-card">
    <div class="video-box" @click="showShade">
      <div class="img-wrapper">
        <img :src="video.url" />
        <i class="iconfont icon-iconfontplay2"></i>
      </div>
      <p class="title">{{video.title}}</p>
      <p class="desc">{{video.desc}}</p>
    </div>
    <!-- 视频内容 -->
    <shade v-if="true" :isShow="isShow" @getState="getState">
      <div class="player">
        <div class="player-top">
          <h3>{{video.title}}</h3>
          <a @click="hideShade" class="close">×</a>
        </div>
      </div>
    </shade>
  </div>
</template>

<script>
import Shade from "@/components/Shade/Shade";
export default {
  name: "VideoCard",
  props: {
    video: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  components: {
    Shade
  },
  methods: {
    showShade() {
      this.isShow = true;
    },
    hideShade() {
      this.isShow = false;
    },
    getState(e) {
      this.isShow = e;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./VideoCard";
</style>