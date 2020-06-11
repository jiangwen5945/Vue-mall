<template>
  <div>
    <div class="goods-details">
      <div class="product-info">
        <div class="product-img">
          <!-- 主图 -->
          <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
            <swiper-slide v-for="(imgsUrl,index) in ProductDetails.imgsList" :key="index">
              <img :src="imgsUrl" />
            </swiper-slide>
          </swiper>
          <!-- 缩略图 -->
          <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
            <swiper-slide v-for="(imgsUrl,index) in ProductDetails.imgsList" :key="index">
              <img :src="imgsUrl" style="width:100%" />
            </swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          </swiper>
        </div>
        <div class="product-con">
          <h2>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/3f5857bb24d798edfa4d800481aeb894.png"
            /> Redmi 10X 5G 系列
          </h2>
          <p class="sale-desc">
            <font color="#ff4a00">「新品现货热卖中！购机赠69元小米单动圈耳机；购机享12期信用卡分期；前3000名评价晒单赠小背包」</font>双5G待机 /天玑820处理器 /4800万流光相机+800万超广角/6.57"三星AMOLED屏幕 /屏幕指纹 /4520mAh长续航 /红外遥控
          </p>
          <p class="company-info">小米自营</p>
          <div class="price-info">
            <span>2299 元</span>
          </div>
          <div class="line"></div>
          <div class="activity-box">
            <div class="flow-box">
              <span class="flow-tag">赠完即止</span>
              <span class="flow-name">购机赠送小米单动圈耳机（二选一）</span>
            </div>
          </div>
          <div class="address-box">
            <div class="product-address">
              <i class="iconfont iconfont-location"></i>
              <div class="address-con">
                <div>
                  <div class="address-info">
                    <span>北京</span>
                    <span>北京市</span>
                    <span>海淀区</span>
                    <span>清河街道</span>
                  </div>
                  <a href="javascript:void(0);" class="edit">修改</a>
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
                    <a>Redmi 10X 5G</a>
                  </li>
                  <li class="active">
                    <a>Redmi 10X Pro 5G</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="selected-list">
            <ul>
              <li>
                Redmi 10X Pro 5G 8GB+ 128GB 凝夜紫
                <span>2299元</span>
              </li>
            </ul>

            <div class="total-price">总计：2299元</div>
          </div>
          <div class="btn-box">
            <div class="sale-btn">
              <a class="btn btn-primary">登录后购买</a>

              <a class="btn btn-like">
                <i class="iconfont default"></i>喜欢
              </a>
            </div>
          </div>

          <div class="after-sale-info">
            <span data-v-6d9966ee>
              <a data-v-6d9966ee href="javascript:void(0);" class="support">
                <i data-v-6d9966ee class="iconfont"></i>
                <em data-v-6d9966ee>小米自营</em>
              </a>
            </span>
            <span data-v-6d9966ee>
              <a data-v-6d9966ee href="javascript:void(0);" title="由小米发货" class="support">
                <i data-v-6d9966ee class="iconfont"></i>
                <em data-v-6d9966ee>小米发货</em>
              </a>
            </span>
            <span data-v-6d9966ee>
              <a data-v-6d9966ee href="javascript:void(0);" class="support">
                <i data-v-6d9966ee class="iconfont"></i>
                <em data-v-6d9966ee>7天无理由退货</em>
              </a>
            </span>
            <span data-v-6d9966ee>
              <a data-v-6d9966ee href="javascript:void(0);" title class="support">
                <i data-v-6d9966ee class="iconfont"></i>
                <em data-v-6d9966ee>运费说明</em>
              </a>
            </span>
            <span data-v-6d9966ee>
              <a data-v-6d9966ee href="javascript:void(0);" class="support">
                <i data-v-6d9966ee class="iconfont"></i>
                <em data-v-6d9966ee>企业信息</em>
              </a>
            </span>
            <span data-v-6d9966ee>
              <a
                data-v-6d9966ee
                href="https://s1.mi.com/m/faq/giving/index.html?project_id=44"
                target="_blank"
                class="support"
              >
                <i data-v-6d9966ee class="iconfont"></i>
                <em data-v-6d9966ee>7天价格保护</em>
              </a>
            </span>
          </div>
        </div>
      </div>

      <div class="product-desc">
        <section></section>
      </div>
    </div>
  </div>
</template>

<script>
// 引入轮播图组件
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "GoodsDetails",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {},
  data() {
    return {
      swiperOptionTop: {
        loop: true,
        loopedSlides: 4, // looped slides should be the same
        spaceBetween: 10
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
          prevEl: ".swiper-button-prev"
        }
      },

      ProductDetails: {}
    };
  },
  created() {
    this.$axios
      .get("http://rap2.taobao.org:38080/app/mock/255953/ProductDetails")
      .then(res => {
        this.ProductDetails = res.data.ProductDetails;
      });
  },
  mounted() {
    // 略缩图关联
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  }
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
                img {
                    height: 24px;
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -3px;
                    margin-right: 2px;
                }
            }
            .sale-desc {
                color: #b0b0b0;
                margin: 0;
                padding: 0;
                padding-top: 8px;
                line-height: 1.5;
            }
            .company-info {
                color: #ff6700;
                margin-bottom: 0;
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
            .after-sale-info {
                a {
                    display: inline-block;
                    margin-right: 15px;
                    line-height: 30px;
                    margin-bottom: 10px;
                    cursor: default;
                    white-space: nowrap;
                    color: #b0b0b0;
                    i {
                        font-size: 20px;
                        display: inline-block;
                        font-style: normal;
                        vertical-align: middle;
                    }
                    em {
                        font-style: normal;
                        display: inline-block;
                        margin-left: 2px;
                        vertical-align: middle;
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


</style>