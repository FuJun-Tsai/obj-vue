<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-3 mt-3">
        <router-link to="/wants">首頁</router-link>／<router-link to="/shop">商品一覽</router-link>／{{data.title}}
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-lg-4">
          <img :src="data.imageUrl" alt="">
          <h2 class="text-center text-primary d-lg-none">{{data.title}}</h2>
          <h4 class="text-end d-lg-none">{{data.category}}</h4>
          <div class="row d-lg-none">
            <div class="col-12">
                <h5 class="text-end">NT.${{data.price}}／{{data.unit}}</h5>
            </div>
            <div class="col-12 d-flex justify-content-end mb-3">
              <div class="input-group me-2">
                <span class="input-group-text">數量</span>
                <input
                v-model.Number="qua"
                min="1"
                type="number" class="form-control">
              </div>
              <div @click="addCart(data.id)"
                   class="btn btn-outline-primary me-2">
                <div v-if="this.loadingItem === data.id"
                     class="spinner-grow text-danger spinner-grow-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                   加入購物車
              </div>
              <div class="btn btn-primary">結帳</div>
            </div>
          </div>
      </div>
      <div class="col-lg-8 pb-3 pt-3 position-relative">
          <h2 class="text-primary mb-3 d-none d-lg-block">{{data.title}}</h2>
          <h4 class="mb-2 text-primary">產品說明</h4>
          <p class="mb-3">{{data.content}}</p>
          <h4 class="mb-2 text-primary">產品成分</h4>
          <p class="mb-3">{{data.description}}</p>
          <div class="row d-none d-lg-block">
            <div class="col-12">
              <div class="quantity">
                <div class="input-group">
                  <span class="input-group-text">數量</span>
                  <input v-model.Number="qua"
                         min="1" type="number" class="form-control">
                </div>
              </div>
              <h5 class="text-end">NT.${{data.price}}／{{data.unit}}</h5>
            </div>
            <div class="col-12 d-flex justify-content-end">
              <div @click="addCart(data.id)"
                   class="btn btn-outline-primary me-4">
                <div v-if="this.loadingItem === data.id"
                     class="spinner-grow text-danger spinner-grow-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                加入購物車
              </div>
              <div class="btn btn-primary">結帳</div>
            </div>
          </div>
      </div>
    </div>
    <div class="row mb-5">
      <h2 class="mb-5">更多商品</h2>
      <div v-for="(item,index) in more" :key="index"
           class="col-md-4 col-12">
        <div class="p-4 border h-100 card mb-5">
          <img :src="item.imageUrl"
               class="card-img-top">
          <div class="card-body">
            <h5 class="card-title mb-5">{{item.title}}</h5>
            <h5 class="text-end">
              NT.${{item.price}}／{{item.unit}}
              <a @click.prevent="toProduct(item)"
                 class="btn btn-primary">查看更多</a>
            </h5>
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
      data: {},
      qua: 1,
      more: [],
      nowCategory: '',
      nowId: '',
      loadingItem: ''
    }
  },
  methods: {
    getData () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`
      this.$http.get(api).then((res) => {
        if (res.data.success === true) {
          this.data = res.data.product
          this.nowCategory = res.data.product.category
          this.nowId = res.data.product.id
        } else {
          this.$router.push('/shop')
        }
        this.moreProducts()
      })
    },
    moreProducts () {
      const moreapi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(moreapi).then((res) => {
        this.more = [...res.data.products].filter((item) => {
          return item.category === this.nowCategory && item.id !== this.nowId
        })
      })
    },
    toProduct (item) {
      this.$router.push(`/product/${item.id}`)
    },
    addCart (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.loadingItem = id
      const cart = {
        product_id: id,
        qty: parseInt(this.qua)
      }
      this.$http.post(api, { data: cart }).then((res) => {
        this.loadingItem = ''
        console.log(res)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss">
img{
    width: 100%;
}
.quantity{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media screen and (max-width:991px) {
      flex-direction: row;
      justify-content: flex-end;
    }
    .input-group{
        width: 100%;
        max-width: 150px;
    }
}
.input-group{
    width: 100%;
    max-width: 150px;
}
</style>
