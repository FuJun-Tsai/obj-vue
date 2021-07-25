<template>
  <img
  @click="openModal"
  class="position-fixed bottom-0 end-0 translate-middle" style="width:40px" src="../assets/pic/plus.png" alt="">
</template>

<script>
export default {
  inject: [
    'emitter'
  ],
  methods: {
    openModal () {
      this.$emit('emit-openNewModal')
    }
  }
}
</script>
