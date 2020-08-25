<template>
  <shade class="login-box" :closeBtn="true" v-bind="$attrs" v-on="$listeners">
    <form class="auth-form">
      <div class="panfish">
        <img :src="imgState" class="normal" />
      </div>
      <i title="关闭" class="close-btn ion-close-round"></i>
      <div class="panel">
        <h1 class="title">登录</h1>
        <div class="input-group">
          <div class="input-box">
            <input
              name="userName"
              maxlength="64"
              placeholder="请输入用户名"
              class="input"
              id="userName"
              @focus="handleNameFocus(this)"
              @blur="handleBlur(this)"
              v-model="userName"
            />
          </div>
          <div class="input-box">
            <input
              name="userPwd"
              type="password"
              maxlength="64"
              placeholder="请输入密码"
              class="input"
              id="loginPassword"
              @focus="handlePswFocus(this)"
              @blur="handleBlur(this)"
              v-model="userPwd"
            />
          </div>
        </div>
        <button class="btn" id="loginBtn" @click.prevent="handleLogin">登录</button>
        <div class="prompt-box">
          没有账号？
          <span class="clickable">注册</span>
          <a href="###" class="right clickable">忘记密码</a>
        </div>

        <transition name="fade">
          <div class="msg-box" v-if="this.errTip">
            <p class="err">⚠️{{errTip}}</p>
          </div>
        </transition>
      </div>
    </form>
  </shade>
</template>

<script>
import Shade from "@/components/Shade/Shade";
export default {
  name: "LoginBox",
  data() {
    return {
      imgState: require("../../assets/imgs/normal.png"),
      imgs: [
        require("../../assets/imgs/normal.png"),
        require("../../assets/imgs/greeting.png"),
        require("../../assets/imgs/blindfold.png"),
      ],
      errTip: "",
      userName: "Jiang Wen",
      userPwd: "abcd",
    };
  },
  components: {
    Shade,
  },

  mounted() {},
  methods: {
    handleNameFocus() {
      this.imgState = this.imgs[1];
    },
    handlePswFocus() {
      this.imgState = this.imgs[2];
    },
    handleBlur() {
      this.imgState = this.imgs[0];
    },

    handleLogin() {
      this.$axios
        .post(`${this.$api}/users/login`, {
          userName: this.userName,
          userPwd: this.userPwd,
        })
        .then((res) => {
          let resData = res.data;
          if (resData.status == "0") {
            this.errTip = "";
            this.$emit("update:show", false);
            this.$store.commit("setUserInfo", res.data.result); // 初始化个人资料
            // 异步时使用action的dispatch
            this.$store.dispatch("setLoginInfo", true);
            console.log("登陆成功");
          } else {
            this.errTip = resData.msg;
            console.log(resData.msg);
          }
        });
    },
  },
};
</script>

<style scoped  lang="scss">
.auth-form {
  padding: 34px;
  width: 348px;
  height: 348px;
  max-width: 100%;
  font-size: 14px;
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 100;
  // 上下垂直居中
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .panfish {
    position: relative;
    img {
      width: 174px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -96%);
      z-index: 1;
    }
  }
  .panel {
    .title {
      font-size: 22px;
      line-height: 42px;
      margin: 0 0 2px;
      text-align: center;
    }

    .input-group {
      margin-bottom: 10px;
      overflow: hidden;
    }

    .input-box {
      position: relative;
      margin-bottom: 14px;
    }

    .input {
      padding: 10px;
      width: 100%;
      border: 1px solid #e9e9e9;
      border-radius: 2px;
      outline: none;
      box-sizing: border-box;
      &:focus {
        border-color: #007fff;
      }
    }

    .btn {
      width: 100%;
      height: 42px;
      color: #fff;
      background-color: #007fff;
      border-radius: 2px;
      outline: none;
      border: none;
      box-sizing: border-box;
      cursor: pointer;
      font-size: 18px;
      &:hover {
        background-color: rgb(36, 104, 252);
      }
      &:disabled {
        background-color: #909090;
        cursor: default;
      }
    }

    .prompt-box {
      margin: 24px;
      color: #8b9196;
      font-size: 14px;
      .center {
        text-align: center;
      }
      .right {
        float: right;
      }
      .clickable {
        color: #007fff;
        cursor: pointer;
      }
    }
    .msg-box {
      p {
        text-align: center;
        color: #ff0000;
        line-height: 14px;
      }
    }
  }
}

// 动画效果
.slide-enter-active {
  transition: all 1s;
}
.slide-leave-active {
  transition: all 1s;
}
.slide-enter,
.slide-leave-active {
  opacity: 0;
  transform: translateY(-500px);
}
</style>

