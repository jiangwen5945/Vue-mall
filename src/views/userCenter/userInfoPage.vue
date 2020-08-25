<template>
  <div class="page-box">
    <page-header :title="title"></page-header>
    <div class="page-bd">
      <div class="img-wrap">
        <img :src="currentImg" />
        <a class="img-link" title="修改头像" @click="uploaderShow=true" >修改头像</a>
      </div>

      <ul class="info-wrap">
        <li>
          <a href="#" class="edit" @click="isShow(true)">
            <i class="iconfont icon-write"></i>编辑
          </a>

          <h3>基础资料</h3>
        </li>
        <li>
          <p>
            <span>昵称：</span>
            <span class="value">唯独黑白丶</span>
          </p>
        </li>
        <li>
          <span>生日：</span>
        </li>
        <li>
          <p>
            <span>性别：</span>
            <span class="value" val="m">男</span>
          </p>
        </li>

        <li>
          <h3>其他</h3>
        </li>
        <li>
          <p>
            <span>绑定银行卡：</span>
            <a href="#" class="edit">
              <i class="iconfont icon-roundadd"></i>管理
            </a>
          </p>
        </li>
      </ul>
    </div>
    <edit-box :title="editTitel" :show="show" @handleEdit="handleEdit" @isShow="isShow"></edit-box>
    <uploader-box :title="uploaderTitle" :show.sync='uploaderShow'   :currentImg.sync='currentImg'></uploader-box>
  </div>
</template>

<script>
import pageHeader from "./components/pageHeader";
import EditBox from "@/components/EditBox/EditBox";
import uploaderBox from "@/components/uploaderBox/uploaderBox";
export default {
  name: "userInfoPage",
  components: {
    pageHeader,
    EditBox,
    uploaderBox,

  },
  data() {
    return {
      title: "个人信息",
      editTitel: "编辑资料",
      uploaderTitle: "选择头像",
      show: false,
      uploaderShow: false,
      currentImg: require('@/assets/imgs/default_avatar.png')
    };
  },
  methods: {
    isShow(e) {
      console.log(e);
      this.show = e;
    },
   
    handleEdit(e) {
      // this.show = e
    },
  },
};
</script>

<style lang="scss" scoped>
.page-box {
  padding: 0 48px;
  background: #fff;
}
.page-bd {
  padding: 0 34px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  min-height: 400px;
  display: flex;
  align-items: center;
}

.img-wrap {
  flex: 1;
  img {
    display: block;
    width: 60%;
    border-radius: 50%;
    margin: 0 auto;
  }
  .img-link {
    color: #ff6700;
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 18px;
  }
  a{
    cursor: pointer;
  }
}
.info-wrap {
  flex: 3;
  li {
    padding-left: 20px;
    line-height: 40px;
    overflow: hidden;
    h3 {
      font-size: 16px;
      color: #333;
    }
    a {
      color: #ff6700;
    }
  }

  .edit {
    float: right;
  }
}



</style>