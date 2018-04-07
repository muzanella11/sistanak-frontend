import * as USER from './types'
import mutator from '~/utils/mutator'

export default {
  [USER.SET_STATE]: mutator,

  [USER.PRUNE_STATE] (state) {
    state.entry.name = null
    state.entry.description = null
  }
}
