<template>
  <div class="video-card">
    <div class="video-box" @click="isShow(true)">
      <div class="img-wrapper">
        <img :src="video.url" />
        <i class="iconfont icon-iconfontplay2"></i>
      </div>
      <p class="title">{{video.title}}</p>
      <p class="desc">{{video.desc}}</p>
    </div>
    <!-- 视频内容 -->
    <shade v-if="true" :show="show"  v-bind="$attrs">
      <div class="player">
        <div class="player-top">
          <h3>{{video.title}}</h3>
          <span class="close" @click="isShow(false)">
            <i class="iconfont icon-roundclosefill"></i>
          </span>
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
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      show: false,
    };
  },
  components: {
    Shade,
  },
  methods: {
    isShow(e) {
      this.show = e;
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./VideoCard";
</style>