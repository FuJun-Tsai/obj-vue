<template>
  <div class="toast-container position-absolute pe-3 top-1 end-0">
    <Toast v-for="(msg, key) in messages" :key="key"
      :msg="msg"
    />
  </div>
</template>

<script>
import Toast from './Toast'

export default {
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('emit-toastMessage', (info) => {
      const { style = 'success', title, content } = info
      this.messages.push({ style, title, content })
    })
  }
}
</script>

<!--
<template>
  <div class="toast-container position-absolute top-1 end-0 p-3">
    <Toast v-for="(item, key) in messages"
          :key="key"
          :msg="item"></Toast>
  </div>
</template>

<script>
import Toast from './Toast.vue'

export default {
  inject: [
    'emitter'
  ],
  components: {
    Toast
  },
  data () {
    return {
      messages: []
    }
  },
  mounted () {
    this.emitter.on('emit-toastMessage', (updateinfo) => {
      console.log(updateinfo)
      const { style, title, content } = updateinfo
      this.messages.push({ style, title, content })
    })
  }
}
</script>
-->
