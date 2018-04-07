<template>
  <v-select
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
      default: 'name'
    },
    setItemsValue: {
      type: String,
      default: 'role_id'
    },
    value: null
  },

  data () {
    return {
      selected: null,
      loading: false,
      entriesDefault: [
        { text: 'KTP', value: 1 },
        { text: 'SIM', value: 2 },
        { text: 'PASSPORT', value: 3 },
        { text: 'NPWP', value: 4 }
      ]
    }
  },

  mounted () {
    this.selected = this.value
    this.loading = true
    this.fetchResource().then(response => {
      this.loading = false
    })
  },

  watch: {
    value (val) {
      setTimeout(() => {
        this.selected = val
      }, 300)
    },

    selected (val) {
      this.$emit('input', val)
    }
  },

  computed: {
    ...mapState({
      items: state => state.role.entries
    })
  },

  methods: {
    ...mapActions({
      fetchResource: ROLE.FETCH_RESOURCE
    })
  }
}
</script>