<template>
  <div>
    <!-- <Upload @close="closeThis" v-if="isShow"></Upload> -->
    <Shade :show="show">
      <div class="wrapper address-modal" style="width: 660px;">
        <div class="header">
          <span class="title">{{title}}</span>
        </div>
        <a class="closeBtn">
          <i class="close iconfont" @click="isShow(false)">✖︎</i>
        </a>
        <div class="body">
          <div class="upload-wrapper">
            <div class="img-wrapper">
              <img :src="currentImg" id="uploadPreview" v-if="currentImg" />
              <!-- 进度条 -->
              <div class="upload-progress" v-if="progressShow">
                <div class="inner" ref="progress"></div>
              </div>
            </div>

            <!-- 上传图片信息 -->
            <div class="info">
              <div class="name">{{uploadName}}</div>
              <div class="size">{{uploadSize}}</div>
            </div>
          </div>

          <form action id="avatar-form">
            <label for="uploadImage">选择头像</label>
            <input
              type="file"
              @change="uploadImage($event)"
              multiple="multiple"
              accept="image/gif, image/jpeg, image/png"
              class="input-text"
              name="uploadImage"
              id="uploadImage"
            />
            <input type />
          </form>
        </div>
      </div>
    </Shade>
  </div>
</template>

<script>
import Shade from "@/components/Shade/Shade";
import Upload from "@/components/Upload/Upload";
export default {
  name: "HelloWorld",
  components: {
    Shade,
    Upload,
  },
  data() {
    return {
      progressShow: true,
      uploadName: "",
      uploadSize: "",
    };
  },

  props: {
    title: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
    currentImg: {
      type: String,
      default: "",
    },
  },

  methods: {
    isShow(e) {
      this.$emit("update:show", e);
    },

    uploadImage($event) {
      let _this = this,
        fileReader = new FileReader(),
        files = document.getElementById("uploadImage").files[0];

      fileReader.readAsDataURL(files);
      fileReader.onload = (e) => {
        this.$emit("update:currentImg", e.target.result);
        this.uploadName = "名称:" + files.name;
        this.uploadSize = "大小:" + files.size + " b";
        this.$refs.progress.style.width = 100+'%'
      };
      setTimeout(() => {
        this.isShow(false);
      }, 1000);
    },
  },
};
</script>
<style lang='scss' scoped>
.address-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  overflow: hidden;

  .header {
    position: relative;
    height: 32px;
    padding: 14px 20px;
    line-height: 32px;
    background-color: #f5f5f5;
    .title {
      font-size: 18px;
      font-weight: 400;
      color: #424242;
      vertical-align: middle;
    }
  }
  .closeBtn {
    position: absolute;
    right: 14px;
    top: 14px;
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #757575;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;
    border-radius: 15px;
  }
  .body {
    padding: 20px;
    #avatar-form {
      input {
        opacity: 0;
      }
      label {
        height: 32px;
        background: #3eb5dd;
        line-height: 32px;
        color: #fff;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 14px;
        cursor: pointer;
        position: absolute;
        left: 294px;
        bottom: 10px;
        z-index: 2;
      }
    }

    .upload-wrapper {
      margin-bottom: 10px;
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      margin: 6px;
      cursor: pointer;
      text-align: center;
      .img-wrapper {
        position: relative;
        padding: 10px;
        margin-bottom: 10px;
        img {
          width: 120px;
          height: 120px;
          // background: #e1e1e1;
          margin: 0 auto;
        }
        /*进度条*/
        .upload-progress {
          width: 120px;
          height: 7px;
          position: absolute;
          bottom: 0;
          left: 40.2%;
          overflow: hidden;
          .inner {
            width: 0%;
            height: 7px;
            background: #a1f380;
            transition: width .8s ease-in;
            border-radius: 4px;
          }
        }
      }

      .info {
        font-size: 10px;
        color: #878787;
        text-align: left;
        text-align: center;
      }
    }
  }
}
</style>