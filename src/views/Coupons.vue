<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="(item) in data"
      :key="item.id"
      :id="item.id"
      >
        <td>{{item.title}}</td>
        <td>{{item.percent}}</td>
        <td class="text-right">
          {{item.due_date}}
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
  :pageinfo="pageinfo"
  @emit-changePage="getData"></Pagination>
</template>

<script>
import Pagination from '../components/Pagination.vue'

export default {
  data () {
    return {
      data: [],
      pageinfo: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getData (page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(api).then((res) => {
        this.data = res.data.coupons
        this.pageinfo = res.data.pagination
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
