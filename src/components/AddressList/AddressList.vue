<template>
  <ul class="address-list">
    <li
      class="address-item"
      v-for="(item,index) in addressList"
      :key="index"
      :class="{'active':item.isDefault}"
      @click="handleChecked(item)"
    >
      <div class="address-info">
        <div class="name">{{item.consignee}}</div>
        <div class="default" v-if="item.isDefault">
          <i class="iconfont icon-homefill"></i>
        </div>
        <div class="tel">{{item.tel}}</div>
        <div class="address-con">
          <span class="info">
            <i class="iconfont icon-locationfill"></i>
            {{item.addressName}}
          </span>
        </div>
        <div class="address-action">
          <span @click.stop="changeInfo(item,true)">修改</span>
          ｜
          <span @click.stop="isShowConfirm(true,item)">删除</span>
        </div>
      </div>
      <div class="address-info-solt"></div>
    </li>

    <div class="address-item">
      <div class="add-desc" @click="newAddress">
        <i class="iconfont icon-roundaddlight"></i>
        <span>添加新地址</span>
      </div>
    </div>

    <!-- 修改信息模态框 -->
    <edit-box
      :show="showEdit"
      @isShow="isShowEdit"
      @handleEdit="handleEdit"
      :title="editTitle"
      :currentAddress="currentAddress"
    ></edit-box>

    <!-- 确定操作模态框 -->
    <confirm-box
      :show="showConfirm"
      @isShow="isShowConfirm"
      :title="operateTitle"
      @handleConfirm="handleConfirm"
    ></confirm-box>
  </ul>
</template>

<script>
// import pageHeader from "./components/pageHeader";
import Shade from "@/components/Shade/Shade";
import ConfirmBox from "@/components/ConfirmBox/ConfirmBox";
import EditBox from "@/components/EditBox/EditBox";
export default {
  name: "addressList",
  components: {
    // pageHeader,
    Shade,
    ConfirmBox,
    EditBox,
  },
  data() {
    return {
      title: "收货地址管理",
      addressList: [],
      operateTitle: "确认删除？",
      showConfirm: false,
      showEdit: false,
      isNewAddress: 1, // 默认新增地址
      // 当前地址
      currentAddress: {
        addressId: "",
        consignee: "",
        addressName: "",
        postCode: "",
        tel: "",
        isDefault: false,
      },
    };
  },
  computed: {
    editTitle() {
      return this.isNewAddress == 1 ? "新增收货地址" : "修改收货地址";
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.addressList = this.$store.state.userInfo.addressList;
    },
    // 获取用户地址
    getAddressList() {
      this.$axios.post(`${this.$api}/users/addressList`).then((res) => {
        if (res.data.status == "0") {
          this.addressList = res.data.result;
          this.addressList.forEach((e) => {
            if (e.isDefault) {
              // 设置当前地址数据
              this.currentAddress = e;
            }
          });
        } else {
          alert(res.data.msg);
        }
      });
    },
    // 删除操作模态框
    isShowConfirm(e, item) {
      this.showConfirm = e;
      console.log(this.showConfirm);

      if (item) {
        this.currentAddress.addressId = item.addressId;
      }
    },
    // 发送请求（确认删除）
    handleConfirm() {
      this.$axios
        .get(`${this.$api}/users/addressList/del`, {
          params: {
            addressId: this.currentAddress.addressId,
          },
        })
        .then((res) => {
          if (res.data.status == 0) {
            this.getAddressList();
            this.isShowConfirm(false);
          } else {
            alert(res.data.msg);
          }
        });
    },
    // 修改信息模态框
    isShowEdit(e) {
      this.showEdit = e;
    },
    // 新增地址
    newAddress() {
      this.showEdit = true;
      this.isNewAddress = 1; // 将表单设置为新增状态
      this.currentAddress = {
        addressId: "",
        consignee: "",
        addressName: "",
        postCode: "",
        tel: "",
        isDefault: "",
      };
    },
    // 修改地址
    changeInfo(item, isModeal) {
      this.isNewAddress = 0; // 将表单设置为修改状态
      let currentAddress = this.currentAddress;
      currentAddress.addressId = item.addressId;
      currentAddress.consignee = item.consignee;
      currentAddress.addressName = item.addressName;
      currentAddress.postCode = item.postCode;
      currentAddress.tel = item.tel;
      currentAddress.isDefault = item.isDefault;
      isModeal ? this.isShowEdit(true) : "";
    },
    // 设置默认地址
    handleChecked(item) {
      // 设置当前地址数据
      this.currentAddress = item;
      // 用户界面切换效果
      this.addressList.forEach((e) => {
        if (item.addressId == e.addressId) {
          e.isDefault = true;
        } else {
          e.isDefault = false;
        }
      });
      this.$axios
        .get(`${this.$api}/users/addressList/setDefault`, {
          params: {
            addressId: item.addressId,
          },
        })
        .then((res) => {
          if (res.data.status != 0) {
            alert(res.data.msg);
          }
        });
    },
    // 发送请求（新增或修改）
    handleEdit() {
      if (this.isNewAddress) {
        // 新增地址接口
        let reqUrl = `${this.$api}/users/newAddress`;
        this.$axios
          .get(reqUrl, {
            params: this.currentAddress,
          })
          .then((res) => {
            if (res.data.status == 0) {
              this.getAddressList();
            } else {
              alert(res.data.msg);
            }
          });
      } else {
        // 修改地址接口
        let reqUrl = `${this.$api}/users/addressList/edit`;
        this.$axios.post(reqUrl, this.currentAddress).then((res) => {
          if (res.data.status == 0) {
            this.getAddressList();
          } else {
            alert(res.data.msg);
          }
        });
      }
      this.isShowEdit(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.address-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  .address-item {
    display: inline-block;
    flex: none;
    width: 268px;
    height: 178px;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    position: relative;
    margin: 10px 10px;
    vertical-align: top;
    transition: all 0.4s ease;
    .address-info {
      line-height: 22px;
      color: #757575;
      padding: 15px 24px 0;
      &:hover .address-action {
        opacity: 1;
      }
      .name {
        font-size: 18px;
        color: #333;
        line-height: 30px;
        margin-bottom: 10px;
      }
      .default {
        position: absolute;
        top: 12px;
        right: 14px;
        color: #ff6700;
        i {
          font-size: 20px;
        }
      }
      .tel {
        line-height: 22px;
        color: #757575;
      }
      .address-con {
        span {
          display: inline-block;
          margin-right: 3px;
          word-wrap: break-word;
        }
      }
      .address-action {
        text-align: right;
        position: absolute;
        right: 24px;
        bottom: 10px;
        color: #ff6700;
        opacity: 0;
        font-size: 12px;
      }
    }
    .add-desc {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      color: #b0b0b0;
      i {
        display: block;
        font-size: 30px;
        text-align: center;
        &:hover {
          color: rgb(136, 134, 134);
        }
      }
    }
  }
  .active {
    border-color: #ff6700;
  }
}
</style>