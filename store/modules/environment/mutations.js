import * as ENVIRONMENT from './types'
import mutator from '~/utils/mutator'

export default {
  [ENVIRONMENT.SET_STATE]: mutator,

  [ENVIRONMENT.PRUNE_STATE] (state) {
    state.entry = {
      ownership_id: null,
      fullname: null,
      identity_number: null,
      identity_type: null,
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
