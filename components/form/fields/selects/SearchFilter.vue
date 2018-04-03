<template>
  <v-select
    class="en-filter"
    :items="entries"
    :label="label"
    :loading="loading"
    :multi-line="multiLine"
    :multiple="multiple"
    :required="required"
    :item-text="setItemsText"
    :item-value="setItemsValue"
    v-model="selected"
    append-icon="keyboard_arrow_down"
    :overflow="true"/>
</template>

<style lang="stylus">
.en-filter
  position: relative
  & .input-group__input
    box-shadow: none !important
    margin-bottom: 5px
    background: none !important
    &:hover
      background: none !important
    &:before
      height: 0 !important

  & .input-group__details
    &:before
      height: 0 !important
</style>

<script>
export default {
  props: {
    entries: {
      type: Array,
      default: []
    },
    label: {
      type: String,
      default: 'Select'
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
      default: ''
    },
    setItemsValue: {
      type: String,
      default: ''
    },
    value: null
  },

  data () {
    return {
      selected: null,
      items: [
        { text: 'State 1' },
        { text: 'State 2' },
        { text: 'State 3' },
        { text: 'State 4' },
        { text: 'State 5' },
        { text: 'State 6' },
        { text: 'State 7' }
      ]
    }
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