<template>
  <v-layout row wrap class="search-filter">
    <v-layout row class="search-filter__content">
      <v-container grid-list-md text-xs-center class="content__container">
        <v-layout row wrap class="content__block">
          <template v-if="dataDropdowns.length > 0">
            <v-flex xs4 v-for="items in dataDropdowns" :key="items.name" class="block-filter">
              <search-filter-dropdowns
                @input="setFilterDropdown($event, items.name)"
                :entries="items.setting.entries"
                :label="items.setting.label"
                :loading="items.setting.loading"
                :multi-line="items.setting.multiLine"
                :multiple="items.setting.multiple"
                :required="items.setting.required"
                :setItemsText="items.setting.setItemsText"
                :setItemsValue="items.setting.setItemsValue"
                :ref="'dd'+ items.name"></search-filter-dropdowns>
            </v-flex>
            <v-flex xs4 class="block-filter" v-if="dataDropdowns.length < 2"></v-flex>
            <v-flex xs4 class="block-filter search">
              <v-text-field
                name="en"
                :label="labelInput"
                single-line
                append-icon="search"
                v-model="filter.keyword"
              ></v-text-field>
            </v-flex>
          </template>

          <template v-else>
            <v-flex xs12 class="block-filter search">
              <v-text-field
                name="en"
                :label="labelInput"
                single-line
                append-icon="search"
                v-model="filter.keyword"
              ></v-text-field>
            </v-flex>
          </template>

        </v-layout>
      </v-container>
    </v-layout>
  </v-layout>
</template>

<style lang="stylus">
.search-filter
  & .search-filter__content
    padding: 0 16px
    & .content__container
      padding: 16px
      padding-top: 0
      padding-bottom: 0
      margin-top: 0
      margin-bottom: 0
      & .content__block
        & .block-filter
          border-right: 1px solid #ccc
          padding-top: 11px
          padding-bottom: 11px
          padding-right: 16px
          padding-left: 16px
          margin-bottom: 5px
          max-height 64px
          &:first-child
            padding-left: 0
          &:last-child
            padding-right: 0
            border: none
          &.search
            padding-top: 3px
            & .input-group__details
              display: none
</style>

<script>
import SearchFilterDropdowns from '~/components/form/fields/selects/SearchFilter'

export default {
  props: {
    labelInput: {
      type: String,
      default: 'Cari'
    },
    dataDropdowns: {
      type: Array,
      default () {
        return []
      }
    }
  },

  components: {
    SearchFilterDropdowns
  },

  data () {
    return {
      filter: {
        keyword: '',
        filterFrom: '',
        sortFrom: ''
      }
    }
  },

  watch: {
    'filter.keyword' () {
      this.emitToParent()
    }
  },

  methods: {
    clearFilter () {
      this.filter.keyword = ''
      this.setFilterDropdown('', 'filter')
      let elFilter = this.$refs['ddfilter'] || []
      let elSort = this.$refs['ddsort'] || []

      elFilter.forEach((el) => {
        el.selected = null
      })

      elSort.forEach((el) => {
        el.selected = null
      })

      this.emitToParent()
    },

    setFilterDropdown (val, el) {
      if (el === 'filter') {
        this.filter.filterFrom = val
      } else if (el === 'sort') {
        this.filter.sortFrom = val
      }
      this.emitToParent()
    },

    emitToParent () {
      this.$bus.$emit('searchFilterChanged', this.filter)
    }
  }
}
</script>
