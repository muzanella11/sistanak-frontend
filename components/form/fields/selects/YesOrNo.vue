<template>
  <v-select
    :clearable="true"
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
      default: 'Pilih Opsi'
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
      items: [
        { text: 'Ya', value: 1 },
        { text: 'Tidak', value: 0 }
      ]
    }
  },

  mounted () {
    this.loading = false
    this.selected = this.value
  },

  watch: {
    value (val) {
      this.selected = val
    },

    selected (val) {
      this.$emit('input', val)
    }
  }
}
</script>