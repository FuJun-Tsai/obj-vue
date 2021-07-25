<template>
  <div class="container-fluid banner back1 d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-12">
          <h1>汪食-給狗兒最想要的</h1>
          <router-link class="btn btn-primary btn-lg" to="/shop">前往商城</router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid banner back2 d-flex align-items-center">
    <div class="container">
      <div class="row mb-5 mt-5">
        <h2 class="text-primary">
          更多商品
        </h2>
      </div>
      <div class="row">
        <swiper :slidesPerView="1" :spaceBetween="10" :pagination='{
            "clickable": true
          }' :breakpoints='{
            "@0.00": {
              "slidesPerView": 1,
              "spaceBetween": 10
            },
            "@0.75": {
              "slidesPerView": 2,
              "spaceBetween": 20
            },
            "@1.00": {
              "slidesPerView": 3,
              "spaceBetween": 30
            },
            "@1.50": {
              "slidesPerView": 3,
              "spaceBetween": 40
            }
          }' class="mySwiper">
          <swiper-slide v-for="(item, index) in goods"
                        :key="index">
            <div class="card p-4 border h-100">
              <img :src="item.imageUrl"
                  class="w-100">
              <div class="">
                <!-- card-body -->
                <h5 class="card-title mb-3">{{item.title}}</h5>
                <h5 class="text-end mb-3">
                  NT.${{item.price}}／{{item.unit}}
                </h5>
                <div
                @click="toSingleProduct(item.id)"
                class="btn btn-outline-primary w-100">查看詳細</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/swiper.scss'
// import "swiper/components/pagination/pagination.min.css"
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core'

SwiperCore.use([Pagination])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      goods: {}
    }
  },
  methods: {
    getData () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.goods = [...res.data.products]
      })
    },
    toSingleProduct (id) {
      this.$router.push(`/product/${id}`)
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss">

.banner{
  position: relative;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  max-height: calc(100vh - 56px);
  h1{
      color: #fff;
  }
}

.back1{
  object-fit: cover;
  background-attachment: fixed;
  background-image: url('../assets/pic/banner.jpg');
  background-position: center center;
  background-size: cover;
}

.back2{
  object-fit: cover;
  background-attachment: fixed;
  background-image: url('../assets/pic/back2.jpg');
  background-position: center center;
  background-size: cover;
  @media screen and (max-width:576px) {
    background-position: left 25% center;
  }
}
</style>
