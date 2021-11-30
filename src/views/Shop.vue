<template class>
  <div class="container mt-5">
    <div class="row mb-5">
      <div class="col-md-2">
        <div class="sticky-top">
          <div class="col-12 mb-3">
            <router-link to="/wants">首頁</router-link>／<span>商品一覽</span>
          </div>
          <ul class="d-flex flex-column p-3 border bg-white">
            <li class="text-center mb-3">產品分類</li>
            <li
            v-for="(item) in kinds"
            :key="item"
            :id="item"
            @click="nowkinds=item,kindSearch()"
            class="btn btn-outline-primary mb-3"
            :class="{active:nowkinds===item}">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-lg-4 col-sm-6 col-12 mb-3 radius-24"
            v-for="(item) in nowdata"
            :key="item">
            <div class="position-relative p-4 border h-100 card">
              <img
              :src="item.imageUrl" alt="">
              <h4 class="text-center mb-3 text-primary">{{item.title}}</h4>
              <p class="pb-3">{{item.content}}</p>
              <div class="row mb-3 mt-3 btns">
                <div class="col-12">
                  <h5 class="price text-end">NT$.{{item.price}}／{{item.unit}}</h5>
                </div>
                <div class="col-12 d-flex justify-content-end">
                  <div @click="toSingleProduct(item.id)"
                       class="btn btn-outline-primary me-4">查看詳細
                  </div>
                  <div @click="addCart(item.id)"
                       :disabled="this.loadingItem === item.id"
                       class="btn btn-primary">
                    <div v-if="this.loadingItem === item.id"
                         class="spinner-grow text-danger spinner-grow-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                       加入購物車
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      origin_data: [],
      kinds: [],
      nowkinds: [],
      nowdata: [],
      page: 1,
      loadingItem: ''
    }
  },
  methods: {
    // 取得後端資料，一份商資料，一份商品分類
    gatData () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.origin_data = [...res.data.products]
        this.nowdata = this.origin_data
        res.data.products.filter((item) => {
          if (this.kinds.indexOf(item.category) === -1) {
            return this.kinds.push(item.category)
          }
        })
      })
    },
    // 透過分類按鈕篩選商品
    kindSearch () {
      if (this.nowkinds.length === 0) {
        this.nowdata = this.origin_data
      } else {
        this.nowdata = this.origin_data.filter((item) => {
          return item.category === this.nowkinds
        })
      }
    },
    // 前往單一商品頁
    toSingleProduct (id) {
      this.$router.push(`/product/${id}`)
    },
    // 加入購物車
    addCart (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        this.loadingItem = ''
        console.log(res)
      })
    }
  },
  created () {
    this.gatData()
  }
}
</script>

<style lang="scss">
  .price{
    font-size: 20px;
  }
  img{
    display: block;
    width: 80%;
    margin: 0 auto;
    object-fit: cover;
  }
  .card{
    position: relative;
    padding-bottom: 70px !important;
    .btns{
      position: absolute;
      bottom: 0;
      right: 15px;
    }
  }
  p{
    text-align: justify;
  }
  ul{
    list-style: none;
    li{
      &:first-child{
      }
    }
  }
  .sticky-top{
    top: 60px;
  }
</style>
