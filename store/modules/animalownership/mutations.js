import * as ANIMAL from './types'
import mutator from '~/utils/mutator'

export default {
  [ANIMAL.SET_STATE]: mutator,

  [ANIMAL.PRUNE_STATE] (state) {
    state.entry = {
      fullname: null,
      identity_number: null,
      identity_type: null,
      phone: null,
      province_id: null,
      region_id: null,
      village_id: null,
      address: null,
      birth_date: null,
      animal_list: [
        {
          animal_id: null,
          amount: null,
          group_id: null,
          gender_id: null
        }
      ],
      animal_list_delete: []
    }
  }
}
