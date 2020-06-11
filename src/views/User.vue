<template>
  <div class="user">
    <h1>this is user</h1>
    <h2>{{ id }}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
// import Aoo from '@/components/Aoo.vue'
// import Foo from '@/components/Foo.vue'
export default {
  name: "user",
  components: {
  },
  props: {
    id: {
      type: [String, Number],
      default: 666
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    // $route (to, from) {
    //   // 对路由变化作出响应...
    //   this.log()
    //   console.log(to);
    //   console.log(from);
    // }
  }
};
</script>