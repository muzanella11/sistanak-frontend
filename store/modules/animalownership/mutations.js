import * as ANIMAL from './types'
import mutator from '~/utils/mutator'

export default {
  [ANIMAL.SET_STATE]: mutator,

  [ANIMAL.PRUNE_STATE] (state) {
    state.entry.fullname = null
    state.entry.identity_number = null
    state.entry.identity_type = null
    state.entry.phone = null
    state.entry.province_id = null
    state.entry.region_id = null
    state.entry.village_id = null
    state.entry.address = null
    state.entry.birth_date = null
    state.entry.animal_list = []
  }
}
