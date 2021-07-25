<template>
  <div ref="modal"
       class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    {{ temp }}
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input v-model="temp.title"
                   type="text" class="form-control" id="title" placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input v-model="temp.code"
                   type="text" class="form-control" id="coupon_code" placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input v-model="due_date"
                   type="date" class="form-control" id="due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input v-model.number="temp.percent"
                   type="number" class="form-control" id="price" placeholder="請輸入折扣百分比">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input v-model="temp.is_enabled"
                     :true-value="1"
                     :false-value="0"
                     class="form-check-input" type="checkbox" id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="$emit('emit-updateCoupons', temp)"
                  type="button" class="btn btn-primary">更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    nowData: {
      type: Object,
      defailt () { return {} }
    }
  },
  watch: {
    nowData () {
      this.temp = this.nowData
      console.dir(this.temp)
      const dateAndTime = new Date(this.nowData.due_date * 1000).toISOString().split('T')[0]
      this.due_date = dateAndTime
    },
    due_date () {
      this.temp.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  data () {
    return {
      modal: {},
      temp: {},
      due_date: ''
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    closeModal () {
      this.modal.hide()
    },
    showData (x) {
      console.log(x)
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
