<template>
  <v-select
    autocomplete
    :overflow="overflow"
    :clearable="clearable"
    :items="cities"
    item-text="name"
    item-value="regencies_id"
    :label="loading ? 'Loading Kota/Kab' : 'Pilih Kota/Kab'"
    :name="name||'regencies_id'"
    v-model="selected"
    :error-messages="errorMessages"
    :loading="loading"
    :readonly="readonly"
    :disabled="disabled"
    :required="required"/>
</template>

<script>
import _ from 'lodash'
import * as LOCATION from '~/store/modules/location/types'
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
    provinceId: Number,
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
    if (_.isNumber(this.provinceId)) {
      this.loading = true
      this.fetchCities({q: null, province: this.provinceId}).then(response => {
        this.loading = false
      })
    }
  },
  watch: {
    provinceId (value) {
      if (_.isNumber(value)) {
        this.loading = true
        this.fetchCities({q: null, province: value}).then(response => {
          this.loading = false
        })
      } else {
        this.$emit('input', null)
      }
    },
    value (value) {
      this.selected = value
    },
    selected (value) {
      this.$emit('input', value)
    }
  },
  methods: {
    ...mapActions({
      fetchCities: LOCATION.FETCH_REGION
    })
  },
  computed: {
    ...mapState({
      cities: state => state.location.entriesRegion
    })
  }
}
</script>
