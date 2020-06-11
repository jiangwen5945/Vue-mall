<template>
  <div class="video-class">
    <title-bar>
      视频模块
      <template v-slot:sub-item>
        查看全部
        <i class="iconfont icon-more"></i>
      </template>
    </title-bar>
    <div class="video-container">
      <video-card v-for="(video,index) in videoList" :key="index" :video="video"></video-card>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar/TitleBar";
import VideoCard from "@/components/VideoCard/VideoCard";
export default {
  name: "VideoClass",
  props: {
    videoList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  components: {
    VideoCard,
    TitleBar
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
@import "../../assets/css/index";
.video-container {
  display: flex;
  justify-content: space-between;
}
</style>