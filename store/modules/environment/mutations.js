import * as USER from './types'
import mutator from '~/utils/mutator'

export default {
  [USER.SET_STATE]: mutator,

  [USER.PRUNE_STATE] (state) {
    state.entry = {
      province_id: null,
      district_id: null,
      village_id: null,
      drainase: null,
      hygiene: null,
      fount: null,
      pollution: null,
      food_availability: null,
      land_area: null
    }
  }
}
