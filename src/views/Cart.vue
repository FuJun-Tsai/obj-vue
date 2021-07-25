<template>
  <Loading :active="isLoading"></Loading>
  <div class="container mt-5">
      <div class="row">
          <div class="col-lg-6">
            <h2 class="mb-5">寄送資料</h2>
            <Form class="" v-slot="{ errors }"
                  @submit="createOrder">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field id="email" name="email" type="email" class="form-control"
                        :class="{ 'is-invalid': errors['email'] }"
                        placeholder="請輸入 Email" rules="email|required"
                        v-model="form.user.email"></Field>
                <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <Field id="name" name="姓名" type="text" class="form-control"
                       :class="{ 'is-invalid': errors['姓名'] }"
                       placeholder="請輸入姓名" rules="required"
                       v-model="form.user.name"></Field>
                <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <Field id="tel" name="電話" type="tel" class="form-control"
                        :class="{ 'is-invalid': errors['電話'] }"
                        placeholder="請輸入電話" rules="required"
                        v-model="form.user.tel"></Field>
                <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <Field id="address" name="地址" type="text" class="form-control"
                       :class="{ 'is-invalid': errors['地址'] }"
                       placeholder="請輸入地址" rules="required"
                       v-model="form.user.address"></Field>
                <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea name="" id="message" class="form-control" cols="30" rows="10"
                            v-model="form.message"></textarea>
                </div>
            </Form>
          </div>
          <div class="col-lg-6">
            <h2 class="mb-5">購物車列表</h2>
            <div class="row">
                <div v-for="(item, index) in data.carts"
                     :key="index"
                     class="col-12">
                    <div class="row mb-5">
                        <div class="col-4">
                            <img :src="item.product.imageUrl">
                        </div>
                        <div class="col-8 position-relative pb-5">
                            <h3>{{item.product.title}}</h3>
                            <div class="row">
                                <div class="col-6">
                                    <div class="quantity">
                                        <div class="input-group">
                                        <span class="input-group-text">數量</span>
                                        <input v-model.Number="item.qty"
                                               @change="updateCart(item)"
                                               min="1" type="number" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="position-absolute bottom-0 end-0">
                                  <h5 class="price text-end mb-0">NT$.{{item.product.price}}元</h5>
                                  <h4 class="text-end mb-0">
                                    <div @click="delCart(item)"
                                         class="btn btn-outline-primary me-2">
                                      刪除
                                    </div>
                                    總價：{{item.total}}元
                                  </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-5">
                    <div class="row mb-5">
                        <div class="col-9">
                            <div class="quantity mb-3">
                                <div class="input-group">
                                    <span class="input-group-text">輸入優惠碼</span>
                                    <input v-model="coupon_code"
                                           type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div @click="addCouponCode"
                                 class="btn btn-primary w-100">
                                送出
                            </div>
                        </div>
                    </div>
                    <h2 :class="{'text-primary':data.total>data.final_total}"
                        class="text-end">總價：{{data.final_total}}元</h2>
                    <div class="col-12 d-flex justify-content-end">
                        <router-link class="btn btn-outline-primary me-4" to="/shop">
                            回到商品一覽
                        </router-link>
                        <div @click="createOrder"
                             class="btn btn-primary">
                            就此結帳
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
      data: {},
      isLoading: false,
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getData () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.data = res.data.data
        this.isLoading = false
      })
    },
    updateCart (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      item.qty = parseInt(item.qty) || 1
      this.$http.put(api, { data: item }).then((res) => {
        console.log(res)
        this.isLoading = false
        this.getData()
      })
    },
    delCart (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        this.getData()
      })
    },
    createOrder () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(api, { data: order })
        .then((res) => {
          console.log(res)
        })
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(api, { data: coupon }).then((response) => {
        // this.$httpMessageState(response, '加入優惠券')
        this.getData()
        this.isLoading = false
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
