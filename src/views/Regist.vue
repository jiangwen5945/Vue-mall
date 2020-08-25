<template>
  <div class="regist">
    <div class="main">
      <div class="panfish">
        <img :src="imgState" class="normal" />
      </div>
      <i title="关闭" class="close-btn ion-close-round"></i>
      <div class="panel">
        <h1 class="title">注册</h1>
        <div class="input-group">
          <div class="input-box">
            <input
              name="userName"
              maxlength="64"
              placeholder="请输入用户名"
              class="input"
              @focus="handleFocus(this)"
              @blur="handleBlur(this)"
              v-model="userName"
            />
          </div>
          <div class="input-box">
            <input
              name="tel"
              maxlength="64"
              placeholder="请输入手机号码"
              class="input"
              @focus="handleFocus(this)"
              @blur="handleBlur(this)"
              v-model="tel"
            />
          </div>
          <div class="input-box">
            <input
              name="email"
              maxlength="64"
              placeholder="请输入邮箱"
              class="input"
              @focus="handleFocus(this)"
              @blur="handleBlur(this)"
              v-model="email"
            />
          </div>
          <div class="input-box">
            <input
              name="password"
              type="password"
              maxlength="64"
              placeholder="请输入密码"
              autocomplete="new-password"
              class="input"
              @focus="handlePswFocus(this)"
              @blur="handleBlur(this)"
              v-model="password"
            />
          </div>
          <div class="input-box">
            <input
              type="password"
              maxlength="64"
              placeholder="请确认密码"
              class="input"
              @focus="handlePswFocus(this)"
              @blur="handleBlur(this)"
              v-model="confirePwd"
            />
          </div>
        </div>
        <div class="btn" @click="handlePost">注册</div>
      </div>
    </div>
    <div class="footer">
      <div class="links">
        <a rel="nofollow" target="_blank" href="#">关于我们</a>|
        <a rel="nofollow" target="_blank" href="#">联系我们</a>|
        <a rel="nofollow" target="_blank" href="#">人才招聘</a>|
        <a rel="nofollow" target="_blank" href="#">商家入驻</a>|
        <a rel="no follow" target="_blank" href="#">广告服务</a>|
        <a rel="nofollow" target="_blank" href="#">手机xx</a>|
        <a target="_blank" href="#">友情链接</a>|
        <a target="_blank" href="#">销售联盟</a>|
        <a href="#" target="_blank">xx社区</a>|
        <a href="#" target="_blank">xx公益</a>|
        <a target="_blank" href="#">English Site</a>
      </div>
      <div class="copyright">Copyright©2004-2020&nbsp;&nbsp;xxxx.com&nbsp;版权所有</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Regist",
  data() {
    return {
      imgState: require("../assets/imgs/normal.png"),
      imgs: [
        require("../assets/imgs/normal.png"),
        require("../assets/imgs/greeting.png"),
        require("../assets/imgs/blindfold.png"),
      ],
      isfocus: false,
      password: "",
      confirePwd: "",
      userName: "",
      tel: "",
      email: "",
    };
  },

  mounted() {},
  methods: {
    handleFocus() {
      this.isfocus = true;
      this.imgState = this.imgs[1];
    },
    handlePswFocus() {
      this.isfocus = true;
      this.imgState = this.imgs[2];
    },
    handleBlur() {
      this.isfocus = false;
      this.imgState = this.imgs[0];
    },
    handlePost() {
      console.log('handlePost');
      let password = this.password.trim();
      let confirePwd = this.confirePwd.trim();
      let userName = this.userName.trim();
      let tel = this.tel.trim();
      let email = this.email.trim();

      // 规则校验1：两次输入密码一致
      if (password !== confirePwd) {
        alert("两次输入密码不一致");
        return;
      }
      // 规则校验2：密码合法
      if (!/^[0-9a-zA-Z]{6,18}$/.test(password)) {
        alert("密码必须是6到18位的数字或字母");
        return;
      }
      // 规则校验3：用户名合法且不重复

      // 发送注册请求
      this.$axios
        .post(`${this.$api}/users/register`, {
          userName: userName,
          password: password,
          tel: tel,
          email: email,
        })
        .then((res) => {
          let _r = res.data;
          if (_r.status == "0") {
            alert(_r.result);
            // 跳转至首页并显示登录页面
            this.$router.push("/");
          } else {
            console.log(_r.msg);
          }
        });
    },
  },
};
</script>

<style scoped  lang="scss">
.main {
  position: relative;
  margin: 200px auto;
  padding: 32px;
  width: 424px;
  font-size: 18px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
}

.panfish {
  img {
    width: 160px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -76%);
    z-index: 1;
  }
}
.panel {
  .title {
    font-size: 24px;
    margin: 0 0 32px;
    text-align: center;
  }

  .input-group {
    margin-bottom: 8px;
    overflow: hidden;
  }

  .input-box {
    position: relative;
    margin-bottom: 12px;
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
    height: 54px;
    line-height: 54px;
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
    margin: 16px 0 0;
    color: #8b9196;
    font-size: 16px;
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

.footer {
  font-size: 12px;
  text-align: center;
  color: #999;
  width: 1210px;
  margin: -76px auto 0 auto; // sticky布局关键点

  .links {
    padding-top: 30px;
    padding-bottom: 14px;
    a {
      color: #999;
      margin: 0 10px;
    }
  }
}
.focus {
  box-shadow: 10px 20px 40px rgba(0, 0, 0, 0.1);
}
</style>

