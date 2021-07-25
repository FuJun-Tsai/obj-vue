<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>名稱</th>
        <th width="110">折扣百分比</th>
        <th>到期日</th>
        <th width="110">是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="(item) in data"
      :key="item.id"
      :id="item.id"
      >
        <td>{{ item.title }}</td>
        <td>{{ `${item.percent}%` }}</td>
        <td>
          {{  $filter.date(item.due_date) }}
        </td>
        <td class="position-relative">
          <span v-if="item.is_enabled === 1"
                class="text-success">啟用</span>
          <span v-else
                class="text-danger">未啟用</span>
          <div class="form-check form-switch d-inline-block position-absolute top-50 end-0 translate-middle-y">
            <input @click="enabledButton(item)"
                   :checked="item.is_enabled === 1"
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
  <Pagination
  :pageinfo="pageinfo"
  @emit-changePage="getData"></Pagination>
  <CouponModal
  ref='modal'
  :nowData="temp"
  @emit-updateCoupons="updateCoupons"></CouponModal>
  <DelModal
  ref='delcheck'
  :nowData="temp"
  @emit-delitem="delItem"></DelModal>
  <AddButton
  @emit-openNewModal="openForm(true)"></AddButton>
</template>

<script>
import Pagination from '../components/Pagination.vue'
import CouponModal from '../components/CouponModal.vue'
import DelModal from '../components/DelModal.vue'
import AddButton from '../components/AddButton.vue'

export default {
  inject: [
    'emitter'
  ],
  data () {
    return {
      data: [],
      pageinfo: {},
      temp: {},
      isNew: false
    }
  },
  components: {
    Pagination,
    CouponModal,
    DelModal,
    AddButton
  },
  methods: {
    getData (page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(api).then((res) => {
        this.data = res.data.coupons
        this.pageinfo = res.data.pagination
      })
    },
    openForm (isNew, nowdata) {
      if (isNew) {
        this.temp = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
      } else {
        this.temp = { ...nowdata }
      }
      console.log(this.temp)
      this.isNew = isNew
      this.$refs.modal.openModal()
    },
    updateCoupons () {
      // 新增
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpmethod = 'post'
      if (!this.isNew) {
        // 修改
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.temp.id}`
        httpmethod = 'put'
      }
      this.$http[httpmethod](api, { data: this.temp }).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.emitter.emit('emit-toastMessage', {
            title: '更新成功',
            style: 'success',
            content: `酷碰卷編號 ${this.temp.id} 已更新`
          })
        } else {
          this.emitter.emit('emit-toastMessage', {
            title: '更新失敗',
            style: 'danger',
            content: res.data.message.join(',')
          })
        }
        this.getData()
      })
      this.$refs.modal.closeModal()
    },
    enabledButton (item) {
      this.temp = item
      this.temp.is_enabled = Number(!this.temp.is_enabled)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.temp.id}`
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
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.temp.id}`
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
