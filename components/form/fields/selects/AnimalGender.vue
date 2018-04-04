<template>
  <div>
    <v-select
    autocomplete
    :clearable="clearable"
    :items="items"
    item-text="name"
    item-value="animals_gender_id"
    :label="loading ? 'Loading Jenis Kelamin Hewan' : 'Pilih Jenis Kelamin Hewan'"
    :name="name||'animals_gender_id'"
    v-model="selected"
    :error-messages="errorMessages"
    :loading="loading"
    :readonly="readonly"
    :disabled="disabled"
    :required="required"/>
  </div>
</template>

<script>
import * as ANIMAL from '~/store/modules/animalgender/types'
import {mapActions, mapState} from 'vuex'
export default {
  props: {
    name: String,
    overflow: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    value: Number,
    errorMessages: Array
  },
  data () {
    return {
      selected: null,
      loading: false
    }
  },
  mounted () {
    this.selected = this.value
    this.loading = true
    this.fetchResource().then(respones => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      fetchResource: ANIMAL.FETCH_RESOURCE
    })
  },
  watch: {
    value (value) {
      console.info('valll : ', value)
      this.selected = value
    },
    selected (value) {
      this.$emit('input', value)
    }
  },
  computed: {
    ...mapState({
      items: state => state.animalGender.entries
    })
  }
}
</script>
