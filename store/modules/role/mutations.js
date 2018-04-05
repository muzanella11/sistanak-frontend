import * as ROLE from './types'
import mutator from '~/utils/mutator'

export default {
  [ROLE.SET_STATE]: mutator,

  [ROLE.PRUNE_STATE] (state) {
    state.entry.name = null
    state.entry.description = null
  }
}
