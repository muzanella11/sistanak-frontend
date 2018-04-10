import * as USER from './types'
import mutator from '~/utils/mutator'

export default {
  [USER.SET_STATE]: mutator,

  [USER.PRUNE_STATE] (state) {
    state.entry = {
      nik: null,
      name: null,
      username: null,
      email: null,
      password: null,
      phone: null,
      user_role: null,
      address: null
    }
  }
}
