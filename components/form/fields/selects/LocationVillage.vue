<template>
  <v-select
    autocomplete
    :overflow="overflow"
    :clearable="clearable"
    :items="districts"
    item-text="name"
    item-value="villages_id"
    :label="loading ? 'Loading Kecamatan' : 'Pilih Kecamatan'"
    :name="name||'villages_id'"
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
    cityId: Number,
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
    if (_.isNumber(this.cityId)) {
      this.loading = true
      this.fetchDistricts({q: null, district: this.cityId}).then(respones => {
        this.loading = false
      })
    }
  },
  watch: {
    cityId (value) {
      if (_.isNumber(value)) {
        this.loading = true
        this.fetchDistricts({q: null, district: value}).then(respones => {
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
      fetchDistricts: LOCATION.FETCH_VILLAGE
    })
  },
  computed: {
    ...mapState({
      districts: state => state.location.entriesVillage
    })
  }
}
</script>
