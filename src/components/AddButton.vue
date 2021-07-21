<template>
  <img
  @click="openModal"
  class="position-fixed bottom-0 end-0 translate-middle" style="width:40px" src="../assets/pic/plus.png" alt="">
</template>

<script>
export default {
  methods: {
    openModal () {
      console.log('open')
      this.$emit('emit-openModal')
    }
  }
}
</script>
