<template>
  <div class="code-wrap" @click="refreshCode">
    <span v-for="(item, index) in codeList" :key="index" :style="codeStyle(item)">{{item.code}}</span>
  </div>
</template>

<script>
export default {
  name: "RandomCode",
  data() {
    return {
      codeList: [],
    };
  },
  props: {
    length: {
      type: Number,
      default: 4,
    },
  },
  created() {
    this.createdCode();
  },
  methods: {
    refreshCode() {
      this.createdCode();
    },
    createdCode() {
      let len = this.length,
        fooList = [],
        chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
        charsLen = chars.length;

      for (let i = 0; i < len; i++) {
        let rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200),
        ];
        fooList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${
            Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)
          }deg)`,
        });
      }
      this.codeList = fooList;
      this.$emit('update:value', fooList.map((item) => item.code).join(""));
    },
    codeStyle(item) {
      return `color: ${item.color}; font-size: ${item.fontSize}; padding: ${item.padding}; transform: ${item.transform}`;
    },
  },
};
</script>
<style lang='scss' scoped>
.code-wrap {
  display: inline-block;
  padding: 0 10px;
  background: #eee;
  vertical-align: middle;
  overflow: hidden;
  cursor: pointer;
  span {
    display: inline-block;
  }
}
</style>