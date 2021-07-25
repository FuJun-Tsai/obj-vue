<template>
  <loading :active="isLoading"></loading>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">
          <span>分類</span>
        </th>
        <th width="120">產品名稱</th>
        <th width="120">
          <span>原價</span>
        </th>
        <th width="120">
          <span>售價</span>
        </th>
        <th width="110">
          <span>是否啟用</span>
        </th>
        <th width="50">
          <span>編輯</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in data"
          :key="item.id"
          :id="item.id">
        <td>{{item.category}}</td>
        <td>{{item.title}}</td>
        <td class="text-right">
          {{ $filter.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filter.currency(item.price) }}
        </td>
        <td class="position-relative">
          <span v-if="item.is_enabled === 1"
                class="text-success">啟用</span>
          <span v-else
                class="text-danger">未啟用</span>
          <div class="form-check form-switch d-inline-block position-absolute top-50 end-0 translate-middle-y">
            <input :checked="item.is_enabled === 1"
                   @click="enabledButton(item)"
                   class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button @click="openForm(false,item)"
                    class="btn btn-outline-primary btn-sm">編輯</button>
            <button @click="delCheck(item)"
                    class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- {{pagination}} -->
  <Pagination
  :pageinfo="pagination"
  @emit-changePage="getData"></Pagination>
  <Goodmodal
  ref="modal"
  :nowData="temp"
  @emit-updateGoods="updateGoods"></Goodmodal>
  <Delmodal
  ref="delcheck"
  :nowData="temp"
  @emit-delitem="delItem"></Delmodal>
  <Addbutton
  @emit-openNewModal="openForm(true)"></Addbutton>
</template>

<script>
import Pagination from '../components/Pagination'
import Goodmodal from '../components/GoodsModal'
import Delmodal from '../components/DelModal'
import Addbutton from '../components/AddButton'

export default {
  inject: [
    'emitter'
  ],
  data () {
    return {
      data: [],
      pagination: {},
      temp: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    Pagination,
    Addbutton,
    Goodmodal,
    Delmodal
  },
  methods: {
    getData (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.$http.get(api).then((res) => {
        this.data = res.data.products
        this.pagination = res.data.pagination
        this.isLoading = false
      })
    },
    openForm (isNew, nowdata) {
      if (isNew === true) {
        this.temp = {}
      } else {
        this.temp = { ...nowdata }
      }
      this.isNew = isNew
      this.$refs.modal.openModal()
    },
    updateGoods () {
      // 新增
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let httpmethod = 'post'
      if (!this.isNew) {
        // 修改
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`
        httpmethod = 'put'
      }
      this.temp.origin_price = parseInt(this.temp.origin_price)
      this.temp.price = parseInt(this.temp.price)
      this.$http[httpmethod](api, { data: this.temp }).then((res) => {
        this.isLoading = true
        this.$refs.modal.closeModal()
        console.log(this.temp)
        // emitter
        if (res.data.success) {
          if (!this.isNew) {
            this.emitter.emit('emit-toastMessage', {
              title: '更新成功',
              style: 'success',
              content: `商品編號 ${this.temp.id} 已更新`
            })
          } else {
            this.emitter.emit('emit-toastMessage', {
              title: '更新成功',
              style: 'success',
              content: '建立新商品'
            })
          }
        } else {
          this.emitter.emit('emit-toastMessage', {
            title: '更新失敗',
            style: 'danger',
            content: res.data.message.join(',')
          })
        }
        // /emitter
        this.getData()
        this.isLoading = false
      })
    },
    enabledButton (item) {
      this.temp = item
      this.temp.is_enabled = Number(!this.temp.is_enabled)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`
      this.$http.put(api, { data: this.temp }).then((res) => {
        console.log(res)
        this.emitter.emit('emit-toastMessage', {
          title: '更新成功',
          style: 'success',
          content: `ID編號 ${this.temp.id} 已更新`
        })
      })
    },
    delCheck (item) {
      this.temp = item
      this.$refs.delcheck.openModal()
    },
    delItem () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`
      this.$http.delete(api).then((res) => {
        this.isLoading = true
        console.log(res)
        this.$refs.delcheck.closeModal()
        this.getData()
        this.emitter.emit('emit-toastMessage', {
          title: '更新成功',
          style: 'success',
          content: `ID編號 ${this.temp.id} 已刪除`
        })
        this.isLoading = false
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
