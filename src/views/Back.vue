<template>
  <ToastMessages></ToastMessages>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark d-flex justify-content-between">
        <a class="nav-link" href="#/back">後台</a>
        <button
        class="navbar-toggler me-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="openNav=!openNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
        :class="{show: openNav===true}"
        class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link ms-3 me-3" to="/back/goods">商品</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link ms-3 me-3" to="/back/coupons">優惠卷</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link ms-3 me-3" to="/back/orders">訂單</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link ms-3 me-3" to="/back/login">登入</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <router-view/>
</template>

<script>
import ToastMessages from '../components/ToastMessages.vue'
import emitter from '../methods/emitter'

export default {
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  data () {
    return {
      openNav: false
    }
  },
  created () {
    var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = myCookie
    const api = `${process.env.VUE_APP_API}/api/user/check`
    this.$http.post(api, this.user).then((res) => {
      if (!res.data.success) {
        console.log(res.data.success)
        // this.$router.push('/back/login')
      }
    })
  }
}
</script>
