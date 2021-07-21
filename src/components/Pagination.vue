<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item"
      :class="{'disabled':pageinfo.current_page===1}">
        <a
        @click.prevent="changePage(pageinfo.current_page-1)"
        class="page-link">&laquo;</a>
      </li>
      <li
      v-for="(page) in pageinfo.total_pages"
      :key="page"
      :class="{'active': page === pageinfo.current_page}"
      class="page-item">
        <a
        @click.prevent="changePage(page)"
        class="page-link">{{page}}</a>
      </li>
      <li class="page-item"
      :class="{'disabled': pageinfo.current_page === pageinfo.total_pages}">
        <a
        @click.prevent="changePage(pageinfo.current_page+1)"
        class="page-link">&raquo;</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pageinfo'],
  methods: {
    changePage (page) {
      this.$emit('emit-changePage', page)
    }
  }
}
</script>
