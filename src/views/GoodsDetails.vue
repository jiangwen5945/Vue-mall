<template>
  <div>
    <div class="goods-details">
      <div class="product-info">
        <div class="product-img">
          <!-- 主图 -->
          <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
            <swiper-slide v-for="(imgsUrl,index) in productDetails.productImgUrl" :key="index">
              <img :src="productDetails.productImgUrl" style="width:100%" />
            </swiper-slide>
          </swiper>
          <!-- 缩略图 -->
          <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
            <swiper-slide v-for="(imgsUrl,index) in productDetails.productImgUrl" :key="index">
              <img :src="productDetails.productImgUrl" style="width:100%" />
            </swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          </swiper>
        </div>
        <div class="product-con">
          <h2>{{productDetails.productName}}</h2>
          <p class="sale-desc">
            <font color="#ff4a00">{{productDetails.productDesc}}</font>
          </p>
          <div class="price-info">
            <span>{{productDetails.productPrice}} 元</span>
          </div>
          <div class="line"></div>
          <div class="activity-box">
            <div class="flow-box">
              <span class="flow-tag">赠完即止</span>
              <span class="flow-name">购机赠送xx单动圈耳机（二选一）</span>
            </div>
          </div>
          <div class="address-box">
            <div class="product-address">
              <i class="iconfont icon-location_light"></i>
              <div class="address-con">
                <div>
                  <div class="address-info" v-html="formatCurrentAddress"></div>
                  <span @click="setState(true)" class="edit">修改</span>
                </div>
                <div class="info">
                  <div class="desc">
                    <span>有现货</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="buy-option">
            <div class="buy-box-child">
              <div class="option-box">
                <div class="title">选择产品</div>
                <ul>
                  <li class>
                    <a>商品类型（1）</a>
                  </li>
                  <li class="active">
                    <a>商品类型（2）</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="selected-list">
            <ul>
              <li>
                {{productDetails.productName}}
                <span>{{productDetails.productPrice}}元</span>
              </li>
            </ul>

            <div class="total-price">总计：{{productDetails.productPrice}}元</div>
          </div>
          <div class="btn-box">
            <div class="sale-btn">
              <a
                class="btn btn-primary"
                @click.stop="addCart(productDetails.productId,1)"
              >{{isLogin?'加入购物车':'登录后购买'}}</a>

              <a class="btn btn-like">
                <i class="iconfont icon-like"></i>喜欢
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="product-desc">
        <section></section>
      </div>
      <tool-bar></tool-bar>
      <!-- 修改地址模态框 -->
      <Shade :isShow="isShow" @setState="setState">
        <div class="pick-container">
          <header>
            收货地址:
            <a v-html="formatCurrentAddress"></a>
            <i class="iconfont icon-round_close_fill_light" @click="setState(false)"></i>
          </header>

          <main>
            <v-distpicker @selected="selected"></v-distpicker>
          </main>
        </div>
      </Shade>
    </div>
  </div>
</template>

<script>
// 引入轮播图组件
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ToolBar from "@/components/ToolBar/ToolBar";
import "swiper/css/swiper.css";
import Shade from "@/components/Shade/Shade";
import VDistpicker from "v-distpicker";
export default {
  name: "GoodsDetails",
  components: {
    Swiper,
    SwiperSlide,
    ToolBar,
    Shade,
    VDistpicker,
  },
  props: {},
  data() {
    return {
      swiperOptionTop: {
        loop: true,
        loopedSlides: 4, // looped slides should be the same
        spaceBetween: 10,
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 4, // looped slides should be the same
        spaceBetween: 10,
        // centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      productDetails: {},
      isShow: false,
      currentAddress: {
        province: "福建省",
        city: "福州市",
        area: "台江区",
      },
    };
  },
  mounted() {
    this.init();
    // 略缩图关联
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
    window.scrollTo(0, 0);
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin; // 检测是否登录
    },

    // 格式化当前地址
    formatCurrentAddress() {
      return `<span>${this.currentAddress.province}</span> <span>${this.currentAddress.city}</span> <span>${this.currentAddress.area}</span>`;
    },
  },

  methods: {
    init() {
      let productId = this.$route.query.productId;
      this.$axios
        .get(`${this.$api}/goods/productDefault`, {
          params: { productId: productId },
        })
        .then((res) => {
          if (res.data.status == 0) {
            this.productDetails = res.data.result;
            console.log(" this.productDetails ", this.productDetails);
          }
        });
    },
    // 加入购物车
    addCart(e, num) {
      console.log(e);
      this.$axios
        .post(`${this.$api}/goods/addCart`, {
          productId: e,
        })
        .then((res) => {
          if (res.data.status == 0) {
            this.$store.commit("addCartList", num);
          }
        });
    },
    setState(e) {
      this.isShow = e;
    },
    selected(data) {
      this.currentAddress.area = data.area.value;
      this.currentAddress.city = data.city.value;
      this.currentAddress.province = data.province.value;
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "./GoodsDetails";

.swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  &.gallery-top {
    height: 80%;
    width: 100%;
  }
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  &.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}
.goods-details {
  .product-info {
    display: flex;
    width: 1226px;
    margin: 0 auto;
    .product-img {
      width: 560px;
      height: 560px;
      margin-right: 100px;
    }
    .product-con {
      flex: 1;
      h2 {
        font-size: 24px;
        font-weight: 400;
        color: #212121;
      }
      .sale-desc {
        color: #b0b0b0;
        margin: 0;
        padding: 0;
        padding-top: 8px;
        line-height: 1.5;
      }
      .price-info {
        display: block;
        font-size: 18px;
        line-height: 1;
        color: #ff6700;
        padding: 12px 0 10px;
      }
      .line {
        margin-top: 12px;
        border-bottom: 1px solid #e0e0e0;
      }
      .activity-box {
        padding: 10px 0 5px;
        border-bottom: 1px solid #e0e0e0;
        .flow-box {
          margin-bottom: 5px;
          .flow-tag {
            display: inline-block;
            width: 80px;
            padding: 8px 0;
            text-align: center;
            background: #ff6700;
            color: #fff;
          }
          .flow-name {
            width: 430px;
            line-height: 26px;
            margin-left: 5px;
          }
        }
      }
      .address-box {
        margin: 20px 0;
        .product-address {
          padding: 30px 50px;
          position: relative;
          background: #fafafa;
          border: 1px solid #e0e0e0;
          .iconfont {
            position: absolute;
            left: 20px;
            top: 26px;
            font-size: 20px;
            color: #999;
          }
          .address-con {
            .address-info {
              display: inline-block;
              span {
                display: inline;
                margin-right: 14px;
                line-height: 1.5;
              }
            }
            .edit {
              color: #ff6700;
              margin: 0;
              margin-left: 16px;
              cursor: pointer;
            }
            .info {
              color: #ff6700;
              line-height: 1.5;
            }
          }
        }
      }
      .buy-option {
        overflow: hidden;
        margin-bottom: 20px;
        .buy-box-child {
          margin-bottom: 30px;
          .option-box {
            .title {
              font-size: 18px;
            }
            ul {
              display: flex;
              justify-content: space-between;
              li {
                margin-top: 10px;
                line-height: 42px;
                height: 42px;
                position: relative;
                border: 1px solid #e0e0e0;
                cursor: pointer;
                transition: all 0.2s ease;
                float: left;
                width: 270px;
                font-size: 16px;
                text-align: center;
                &:hover {
                  background: #ff6700;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .selected-list {
        background: #f9f9fa;
        padding: 30px;
        margin-bottom: 30px;
        ul {
          li {
            list-style: none;
            line-height: 30px;
            color: #616161;
            span {
              float: right;
            }
          }
        }
        .total-price {
          color: #ff6700;
          font-size: 24px;
          padding-top: 20px;
        }
      }
      .btn-box {
        margin: 10px 0 20px 0;
        .sale-btn {
          display: inline-block;
          margin-right: 10px;
          display: flex;
          justify-content: space-between;
          .btn {
            display: inline-block;
            padding: 0;
            margin: 0;
            border: 1px solid #b0b0b0;
            text-align: center;
            color: #b0b0b0;
            cursor: pointer;
            transition: all 0.4s;
            width: 270px;
            height: 52px;
            line-height: 52px;
            font-size: 16px;
          }
          .btn-like {
            background: #b0b0b0;
            color: #fff;
          }
          .btn-primary {
            background: #ff6700;
            border-color: #ff6700;
            color: #fff;
          }
        }
      }
    }
  }
  .product-desc {
    width: 100%;
    height: 800px;
    background: rgb(173, 173, 173);
  }
}

.pick-container {
  width: 30%;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  transition: all 1s;
  header {
    position: relative;
    height: 32px;
    padding: 14px 20px;
    line-height: 32px;
    background-color: #f5f5f5;
    color: #b0b0b0;
    border-radius: 2px;
    font-size: 16px;

    i {
      position: absolute;
      right: 14px;
      top: 10px;
      text-align: center;
      color: #757575;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 24px;
      &:hover {
        color: #ff6700;
      }
    }
  }
  main {
    padding: 30px;
  }
}
</style>