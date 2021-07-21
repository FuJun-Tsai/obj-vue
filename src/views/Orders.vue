<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="(item) in data"
      :key="item.id"
      :id="item.id"
      >
        <td>{{item.create_at}}</td>
        <td>{{item.user.email}}</td>
        <td class="text-right">
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
        </td>
        <td class="text-right">
          {{item.total}}
        </td>
        <td class="">
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-danger">未啟用</span>
          <div class="form-check form-switch d-inline-block">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" :checked="item.is_enabled === 1">
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination
  :pageinfo="pagination"
  @emit-changePage="getData"></Pagination>
</template>

<script>
import Pagination from '../components/Pagination.vue'

export default {
  data () {
    return {
      data: [],
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getData (page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(api).then((res) => {
        this.data = res.data.orders
        this.pagination = res.data.pagination
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
  .form-check{
    margin-bottom: -6px;
    margin-left: 6px;
  }
</style>
