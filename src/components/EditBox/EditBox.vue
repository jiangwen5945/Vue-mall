<template>
  <Shade  v-bind='$attrs' v-on="$listeners">
    <div class="wrapper address-modal" style="width: 660px;">
      <div class="header">
        <span class="title">{{title}}</span>
      </div>
      <a class="closeBtn">
        <i class="close iconfont" @click="isShow(false)">✖︎</i>
      </a>
      <div class="body">
        <form action id="my">
          <div class="item">
            <div class="col mi-input input-active mr">
              <label for="consignee" class="input-label">姓名</label>
              <input
                type="text"
                name="consignee"
                placeholder
                maxlength
                autocomplete="off"
                class="input-text"
                v-model.lazy="currentAddress.consignee"
              />
              <p class="msg msg-error" v-show="!checkName">请输入正确的用户名</p>
              <span class="iconfont-circle-close icon-error"></span>
            </div>
            <div class="col mi-input input-active">
              <label for="tel" class="input-label">手机号</label>
              <input
                type="text"
                name="tel"
                maxlength
                autocomplete="off"
                class="input-text"
                v-model.lazy="currentAddress.tel"
              />
              <p class="msg msg-error" v-show="!checkTel">请输入正确的手机号</p>
              <span class="iconfont-circle-close icon-error"></span>
            </div>
          </div>

          <div class="item">
            <div class="col mi-input input-active">
              <label for="postCode" class="input-label">邮政编码</label>
              <input
                type="text"
                name="postCode"
                placeholder
                maxlength
                autocomplete="off"
                class="input-text"
                v-model.lazy="currentAddress.postCode"
              />
              <p class="msg msg-error" v-show="!checkPostCode">请输入正确的邮政编号</p>
              <span class="iconfont-circle-close icon-error"></span>
            </div>
          </div>

          <div class="item">
            <div class="col mi-input input-active">
              <label for="addressName" class="input-label">详细地址</label>
              <textarea
                name="addressName"
                placeholder="详细地址，路名或街道名称，门牌号"
                maxlength
                autocomplete="off"
                class="input-text"
                v-model.lazy="currentAddress.addressName"
              ></textarea>
              <span class="iconfont-circle-close icon-error"></span>
            </div>
          </div>
        </form>
      </div>
      <div class="footer">
        <button class="btn btn-primary mr" @click="handleEdit">确定</button>
        <button class="btn btn-gray" @click="isShow(false)">取消</button>
      </div>
    </div>
  </Shade>
</template>

<script>
import Shade from "@/components/Shade/Shade";
export default {
  name: "EditBox",
  components: {
    Shade,
  },
  data() {
    return {};
  },
  computed: {
    // 校验姓名
    checkName() {
      if (this.currentAddress.consignee === "") {
        return true;
      } else {
        let reg = /^([\u4e00-\u9fa5·s]{1,20}|[a-zA-Z.s]{1,20})$/;
        return reg.test(this.currentAddress.consignee);
      }
    },
    // 校验手机号
    checkTel() {
      if (this.currentAddress.tel === "") {
        return true;
      } else {
        let reg = /^1[0-9]{10}$/;
        return reg.test(this.currentAddress.tel);
      }
    },
    // 校验邮政编码
    checkPostCode() {
      if (this.currentAddress.postCode === "") {
        return true;
      } else {
        let reg = /^[0-9][0-9]{5}$/;
        return reg.test(this.currentAddress.postCode);
      }
    },
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
    currentAddress: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    isShow() {
      this.$emit("isShow", false);
    },
    handleEdit() {
      this.$emit("handleEdit");
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
    .item {
      display: flex;
      margin-bottom: 14px;
      .col {
        flex: 1;
      }

      .mi-input {
        position: relative;
        margin: 0;
        padding: 0;
        border: 0;
        text-align: left;

        textarea.input-text {
          height: 5em;
          resize: vertical;
          font-size: 12px;
        }
        .msg-error {
          background-color: #e53935;
          color: #fff;
        }

        .msg {
          position: absolute;
          left: 10px;
          top: -26px;
          z-index: 5;
          padding: 6px 12px;
          margin: 0;
          font-size: 12px;
          box-shadow: 0 3px 4px rgba(0, 0, 0, 0.18);
          transform: translate3d(0, 5px, 0);
          transition: all 0.2s;
          &:after {
            position: absolute;
            top: 30px;
            left: 15px;
            width: 0;
            height: 0;
            content: "";
            border-style: solid;
            border-width: 6px 6px 0 6px;
            border-color: #e53935 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)
              rgba(0, 0, 0, 0);
            overflow: hidden;
          }
        }

        .input-label {
          position: absolute;
          left: 12px;
          top: 11px;
          z-index: 2;
          padding: 0 3px;
          font-size: 14px;
          line-height: 18px;
          color: #b0b0b0;
          background: rgba(0, 0, 0, 0);
          cursor: text;
          transition: all 0.2s linear;
        }
        .input-text {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 16px;
          border: 1px solid #e0e0e0;
          font-size: 14px;
          line-height: 18px;
          background: #fff;
          transition: border-color 0.2s linear;
        }
      }

      .input-active {
        .input-label {
          top: -7px;
          font-size: 12px;
          background: #fff;
        }
      }

      .mr {
        margin-right: 14px;
      }
    }
  }
  .footer {
    height: 40px;
    padding: 20px 0;
    border-top: 1px solid #e0e0e0;
    text-align: center;
    background-color: #f5f5f5;
    .btn {
      display: inline-block;
      width: 158px;
      height: 38px;
      padding: 0;
      margin: 0;
      border: 1px solid #b0b0b0;
      font-size: 14px;
      line-height: 38px;
      text-align: center;
      color: #b0b0b0;
      cursor: pointer;
      transition: all 0.4s;
      outline: none;
    }
    .btn-primary {
      background: #ff6700;
      border-color: #ff6700;
      color: #fff;
    }
    .mr {
      margin-right: 14px;
    }
  }
}
</style>