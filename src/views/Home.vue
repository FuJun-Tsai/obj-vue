<template>
  <div class="home">
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark d-flex justify-content-between">
        <a class="nav-link" href="#/wants">汪食Wants</a>
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
        class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link ms-3 me-3" to="/shop">商城</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link ms-3 me-3" to="/cart">購物車</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <router-view/>
    <footer class="pt-5">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-between">
            <div>
              <h1>汪食Wants犬科食物網路商店</h1>
            </div>
            <div>
              <p>此網頁為作品用途，無任何金流及商業用途</p>
              <p>圖源、文案來自 <a class="font-black" href="https://petpetgo.com/">毛孩市集</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openNav: false
    }
  }
}
</script>

<style lang="scss">
#navbarNav{
  .btn{
    margin-right: 4px;
  }
}

body{
  padding-top: 56px
}

footer{
  background: var(--bs-primary);
  a{
    color: #333;
    &:hover{
      color: #111;
    }
  }
}

html{
  min-height: 100vh;
}
</style>
