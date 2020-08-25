<template>
  <div class="slide-class">
    <title-bar>
        推荐模块
    </title-bar>
    <div class="card-container">
      <slide-card :cardlist="cardlist" v-for="(cardlist,index) in listClass" :key="index"></slide-card>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar/TitleBar.vue";
import SlideCard from "@/components/SlideCard/SlideCard.vue";
export default {
  name: "SlideClass",
  props: {
    listClass:{
      type: Array,
      default: function(){
        return []
      }
    }
  },
  data() {
    return {
    };
  },
  components: {
    TitleBar,
    SlideCard
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/index";
.card-container {
  display: flex;
  justify-content: space-between;
}
</style>