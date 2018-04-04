import * as LOCATION from './types'
import mutator from '~/utils/mutator'

export default {
  [LOCATION.SET_STATE]: mutator,

  [LOCATION.PRUNE_STATE_PROVINCE] (state) {
    state.entryProvince.name = null
  },

  [LOCATION.PRUNE_STATE_REGION] (state) {
    state.entryRegion.name = null
  },

  [LOCATION.PRUNE_STATE_VILLAGE] (state) {
    state.entryVillage.name = null
  }
}
