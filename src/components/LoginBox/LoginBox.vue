<template>
  <div class="login-box">
    <shade :isShow="this.isShow" @getState="getState">
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
              />
            </div>
            <div class="input-box">
              <input
                name="loginPassword"
                type="password"
                maxlength="64"
                placeholder="请输入密码"
                class="input"
                id="loginPassword"
                @focus="handlePswFocus(this)"
                @blur="handleBlur(this)"
              />
            </div>
          </div>
          <button class="btn" id="loginBtn">登录</button>
          <div class="prompt-box">
            没有账号？
            <span class="clickable">注册</span>
            <a href="###" class="right clickable">忘记密码</a>
          </div>
        </div>
      </form>
    </shade>
  </div>
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
        require("../../assets/imgs/blindfold.png")
      ],
    };
  },
  props:{
    isShow:{
      type: Boolean,
      default: false
    }
  },
  components: {
    Shade
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
    getState(e) {
      this.$emit('getState',e)
    }
  }
};
</script>

<style scoped  lang="scss">
.auth-form {
  padding: 34px;
  width: 348px;
  max-width: 100%;
  font-size: 14px;
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
      margin-top: 26px;
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
      .right {
        float: right;
      }
    }
  }
}

// @media (min-width: 320px) and (max-width: 479px) {
//   .auth-form {
//     padding: 2rem;
//     width: 23rem;
//     max-width: 100%;
//     font-size: 1.167rem;
//     background-color: #fff;
//     border-radius: 2px;
//     box-sizing: border-box;

//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);

//     .panfish {
//       position: relative;
//       img {
//         width: 10rem;
//         position: absolute;
//         top: 0;
//         left: 50%;
//         transform: translate(-50%, -96%);
//         z-index: 1;
//       }
//     }
//     .panel {
//       .title {
//         font-size: 1.5rem;
//         line-height: 2rem;
//         margin: 0 0 0.8rem;
//         text-align: center;
//       }

//       .input-group {
//         margin-bottom: 0.5rem;
//         overflow: hidden;
//       }

//       .input-box {
//         position: relative;
//         margin-bottom: 0.8rem;
//       }

//       .input {
//         padding: 1rem;
//         width: 100%;
//         border: 1px solid #e9e9e9;
//         border-radius: 2px;
//         outline: none;
//         box-sizing: border-box;
//         &:focus {
//           border-color: #007fff;
//         }
//       }

//       .btn {
//         width: 100%;
//         height: 3.334rem;
//         color: #fff;
//         background-color: #007fff;
//         border-radius: 2px;
//         outline: none;
//         border: none;
//         box-sizing: border-box;
//         cursor: pointer;
//         font-size: 1rem;
//         &:hover {
//           background-color: rgb(36, 104, 252);
//         }
//         &:disabled {
//           background-color: #909090;
//           cursor: default;
//         }
//       }

//       .prompt-box {
//         margin: 1rem 0 0;
//         color: #8b9196;
//         font-size: 1rem;
//         .center {
//           text-align: center;
//         }
//         .right {
//           float: right;
//         }
//         .clickable {
//           color: #007fff;
//           cursor: pointer;
//         }
//         .right {
//           float: right;
//         }
//       }
//     }
//   }
// }
</style>

