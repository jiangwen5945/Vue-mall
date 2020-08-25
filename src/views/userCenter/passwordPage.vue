<template>
  <div class="page-box">
    <page-header :title="title"></page-header>
    <div class="page-bd">
      <dl>
        <dt>原密码</dt>
        <dd>
          <label class="labelbox">
            <input
              type="password"
              name="password"
              placeholder="输入原密码"
              autocomplete="off"
              @change="checkPassword"
              v-model="password"
            />
          </label>

          <div class="err-tip" v-show="errPassword">
            <i class="iconfont icon-infofill"></i>
            <span>{{errPwdMsg}}</span>
          </div>
        </dd>

        <dt>新密码</dt>
        <dd>
          <div class="inputbg">
            <label class="labelbox">
              <input
                type="password"
                name="repassword"
                placeholder="输入新密码"
                autocomplete="off"
                v-model="repassword"
                @change="checkRePassword"
              />
            </label>
            <label class="labelbox">
              <input
                type="password"
                name="repassword2"
                placeholder="重复新密码"
                autocomplete="off"
                v-model="repassword2"
                @change="checkRePassword"
              />
            </label>
          </div>
          <div class="err-tip" v-show="errRePassword">
            <i class="iconfont icon-infofill"></i>
            <span>{{errRepwdMsg}}</span>
          </div>
        </dd>

        <div class="capt_box" style="display: block;">
          <dt>验证码</dt>
          <dd>
            <div class="inputcode">
              <label class="labelbox codebox">
                <input
                  type="text"
                  name="icode"
                  placeholder="图片验证码"
                  autocomplete="off"
                  @change="checkCode"
                  v-model="code"
                />
              </label>
              <random-code :length="4" :value.sync="randomCode" ref="randomCode"></random-code>
            </div>
            <div class="err-tip" v-if="errCode">
              <i class="iconfont icon-infofill"></i>
              <span>验证码错误</span>
            </div>
          </dd>
        </div>
      </dl>
    </div>
    <footer>
      <a
        class="btn btn-primary"
        href
        title="确定"
        style="margin-right:10px"
        @click.prevent="postChange"
      >确定</a>
      <a class="btn btn-normal" href title="取消" @click.prevent="handleCancel">取消</a>
    </footer>
  </div>
</template>

<script>
import PageHeader from "./components/pageHeader";
import RandomCode from "@/components/RandomCode/RandomCode";
export default {
  name: "passwordPage",
  components: {
    PageHeader,
    RandomCode,
  },
  data() {
    return {
      title: "修改密码",
      password: "",
      repassword: "",
      repassword2: "",
      code: "", // 输入验证的code
      errPassword: false,
      errRePassword: false,
      errCode: false,
      errRepwdMsg: "", //新密码错误提示
      errPwdMsg: "", // 原密码错误提示
      randomCode: "", // 随机生成的code
    };
  },
  methods: {
    init() {
      this.password = "";
      this.repassword = "";
      this.repassword2 = "";
      this.code = ""; // 输入验证的code
      this.$refs.randomCode.refreshCode(); // 刷新验证码
    },
    // 检测密码是否为空
    checkPassword() {
      console.log("checkPassword");
      if (this.password == "") {
        this.errPwdMsg = "原密码不能为空";
        this.errPassword = true;
        return false;
      } else {
        this.errPassword = false;
        return true;
      }
    },

    // 检测密码合法性
    checkRePassword() {
      if (!/^[0-9a-zA-Z]{8,18}$/.test(this.repassword)) {
        this.errRepwdMsg = "密码长度8~16位，数字、字母、字符至少包含两种";
        this.errRePassword = true;
        return false;
      } else if (this.repassword == this.password) {
        this.errRepwdMsg = "新密码不能与原密码相同";
        this.errRePassword = true;
      } else if (this.repassword != this.repassword2) {
        this.errRepwdMsg = "两次密码不相同";
        this.errRePassword = true;
        return false;
      } else {
        this.errRePassword = false;
        return true;
      }
    },

    // 检测验证码
    checkCode() {
      if (this.code != this.randomCode.toLowerCase()) {
        this.errCode = true;
        return false;
      } else {
        this.errCode = false;
        return true;
      }
    },
    CheckAll() {
      // 只要存在一个不满足验证条件，即返回false
      if (this.checkPassword() && this.checkRePassword() && this.checkCode()) {
        return true;
      } else {
        this.$refs.randomCode.refreshCode(); // 输入错误时刷新获取新的验证码
        return false;
      }
    },
    // 确定修改
    postChange() {
      if (this.CheckAll()) {
        this.$axios
          .post(`${this.$api}/users/editInfo`, {
            oldUserPwd: this.password,
            newUserPwd: this.repassword,
          })
          .then((response) => {
            let res = response.data;
            if (res.status == "0") {
              alert(res.result);
              this.init();
            } else {
              this.errPwdMsg = res.msg;
              this.errPassword = true;
            }
          });
      }
    },

    // 取消修改
    handleCancel() {
      this.password = "";
      this.repassword = "";
      this.repassword2 = "";
      this.code = "";
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
  margin-top: 15px;
  max-width: 400px;
  padding: 10px 0;

  dt {
    font-size: 15px;
    color: #555;
    font-weight: bold;
    line-height: 30px;
  }
  dd {
    .labelbox {
      height: 42px;
      line-height: 42px;
      display: inline-block;
      border: 1px solid #e8e8e8;
      padding: 0 10px;
      margin-bottom: 10px;

      input {
        width: 310px;
        border: none;
        outline: none;
      }
    }

    .codebox {
      width: 115px;
      margin-right: 10px;
      input {
        width: 115px;
      }
    }
    img {
      margin-left: 7px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .err-tip {
    margin-bottom: 5px;
    line-height: 20px;
    font-size: 14px;
    color: #f66;
    // display: none;
  }
}
</style>