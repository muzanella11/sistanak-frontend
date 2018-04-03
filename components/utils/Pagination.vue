<template>
<div class="alpine list-pagination">
  <ul>
    <li>Halaman :</li>
    <!-- Prev -->
    <li class="prev" @click="toPage(page.prev)" v-if="page.prev">
      <i class="material-icons">keyboard_arrow_left</i>
    </li>
    <!-- End Prev -->

    <!-- List Page -->
    <li v-for="page in pagination" :key="page" :class="{ active: meta.current_page === page }" @click="toPage(page)">{{ page }}</li>
    <!-- End List Page -->

    <!-- Next -->
    <li class="next" @click="toPage(page.next)" v-if="page.next">
      <i class="material-icons">keyboard_arrow_right</i>
    </li>
    <!-- End Next -->

    <!-- Last -->
    <li class="last" @click="toPage(meta.total_pages)">
      Terakhir
    </li>
    <!-- End Last -->
  </ul>
</div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {}
      }
    },
    limit_page: {
      type: Number,
      default: 4
    },
    value: ''
  },
  data () {
    return {
      page: {
        prev: '',
        next: '',
        start_page: '',
        end_page: ''
      }
    }
  },
  computed: {
    pagination: function () {
      this.paginationCore()

      let pagesArray = []

      // Looping untuk mendapatkan jumlah page yg ingin di tampilkan setelah paginationCore berjalan dan di limit
      // Jika total halamannya di tampilkan semua nanti jadi aneh paginationnya kalo banyak halamannya melebihi 50
      // Jika currentPage nya adalah 1 maka page yg akan di tampilkan adalah
      for (let from = this.page.start_page; from <= this.page.end_page; from++) {
        pagesArray.push(from)
      }

      return pagesArray
    }
  },

  methods: {
    paginationCore () {
      let totalPage = this.meta.total_pages
      let currentPage = this.meta.current_page
      let limitPage = this.limit_page

      // Set Pagination
      if (currentPage > totalPage) {
        // console.info('a')
        this.page.start_page = currentPage
        this.page.end_page = totalPage > limitPage ? currentPage + limitPage : totalPage
      } else if (currentPage > 2) {
        // Current page > 2
        // console.info('b')
        if (currentPage === totalPage) {
          // console.info('b.1')
          // Ketika page sama dengan jumlah total page (last page)
          if (currentPage < limitPage) {
            this.page.start_page = 1
            this.page.end_page = totalPage
            // console.info('b.1.1')
          } else {
            this.page.start_page = totalPage > limitPage ? currentPage - limitPage : currentPage - limitPage + 1
            this.page.end_page = totalPage
            // console.info('b.1.2')
          }
        } else if (currentPage === totalPage - 1) {
          // console.info('b.2')
          // Satu angka sebelum terakhir
          if (currentPage >= limitPage) {
            // console.info('b.2.1')
            this.page.start_page = currentPage - 3
            this.page.end_page = currentPage + limitPage - 3
          } else {
            // console.info('b.2.2')
            this.page.start_page = 1
            this.page.end_page = currentPage + limitPage - 3
          }
        } else {
          // console.info('b.3')
          this.page.start_page = currentPage - 2
          this.page.end_page = currentPage + limitPage - 2
        }
        // End
      } else if (currentPage > 1) {
        // console.info('c')
        this.page.start_page = currentPage - 1
        this.page.end_page = totalPage > limitPage ? currentPage + limitPage - 1 : totalPage
      } else {
        // console.info('d')
        this.page.start_page = currentPage
        this.page.end_page = totalPage > limitPage ? currentPage + limitPage : totalPage
      }

      // Set Prev Next
      if (currentPage <= 1) {
        // console.info('current a')
        if (totalPage > 1) {
          // console.info('current a.1')
          this.page.prev = false
          this.page.next = currentPage + 1
        } else {
          // console.info('current a.2')
          this.page.prev = false
          this.page.next = false
        }
      } else if (currentPage >= totalPage) {
        // console.info('current b')
        this.page.prev = currentPage - 1
        this.page.next = false
      } else {
        // console.info('current c')
        this.page.prev = currentPage - 1
        this.page.next = currentPage + 1
      }
    },
    toPage (page) {
      this.$emit('update', page)
    }
  }
}
</script>

<style lang="stylus">
.alpine
  &.list-pagination
    position: relative
    width: 100%
    padding: 0px
    padding-top: 28px
    & ul
      margin: 0
      padding: 0
      & li
        display: inline
        padding-right: 25px
        cursor: pointer
        color: #9b9b9b
        font-size: 15px
        &:first-child
          cursor: default
          padding-right: 30px
        &.active
          color: #000
        & i
          position: relative
          top: 7px
</style>
