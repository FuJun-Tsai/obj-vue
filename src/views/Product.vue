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
              <div class="btn btn-outline-primary me-2">加入購物車</div>
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
                <div
                @click="qua+=1"
                class="btn btn-primary me-3 d-block d-md-none">+1</div>
                <div
                @click="qua+=5"
                class="btn btn-primary me-3 d-block d-md-none">+5</div>
                <div class="input-group">
                  <span class="input-group-text">數量</span>
                  <input
                  v-model.Number="qua"
                  min="1"
                  type="number" class="form-control">
                </div>
              </div>
              <h5 class="text-end">NT.${{data.price}}／{{data.unit}}</h5>
            </div>
            <div class="col-12 d-flex justify-content-end">
              <div class="btn btn-outline-primary me-4">加入購物車</div>
              <div class="btn btn-primary">結帳</div>
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
      qua: 1
    }
  },
  methods: {
    getData () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`
      this.$http.get(api).then((res) => {
        if (res.data.success === true) {
          this.data = res.data.product
        } else {
          this.$router.push('/shop')
        }
      })
    }
  },
  created () {
    this.getData()
    console.log(this.$route)
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
