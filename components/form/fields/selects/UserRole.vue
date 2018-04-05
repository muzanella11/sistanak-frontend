<template>
  <v-select
    class="en-filter"
    :items="items"
    :label="label"
    :loading="loading"
    :multi-line="multiLine"
    :multiple="multiple"
    :required="required"
    :item-text="setItemsText"
    :item-value="setItemsValue"
    v-model="selected"
    :overflow="false"/>
</template>

<style lang="stylus">
.en-filter
  position: relative
</style>

<script>
import * as ROLE from '~/store/modules/role/types'
import {mapActions, mapState} from 'vuex'

export default {
  props: {
    entries: {
      type: Array,
      default () {
        return []
      }
    },
    label: {
      type: String,
      default: 'Pilih Role'
    },
    loading: {
      type: Boolean,
      default: false
    },
    multiLine: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    setItemsText: {
      type: String,
      default: 'text'
    },
    setItemsValue: {
      type: String,
      default: 'value'
    },
    value: null
  },

  data () {
    return {
      selected: null,
      entries: [
        { text: 'KTP', value: 1 },
        { text: 'SIM', value: 2 },
        { text: 'PASSPORT', value: 3 },
        { text: 'NPWP', value: 4 }
      ]
    }
  },

  mounted () {

  },

  watch: {
    value (val) {
      this.selected = val
    },

    selected (val) {
      this.$emit('input', val)
    }
  },

  computed: {
    ...mapState({
      items: state => state.location.entriesProvince
    })
  },

  methods: {
    ...mapActions({
      fetchProvinces: LOCATION.FETCH_PROVINCE
    })
  }
}
</script>