import * as ANIMAL from './types'
import mutator from '~/utils/mutator'

export default {
  [ANIMAL.SET_STATE]: mutator,

  [ANIMAL.PRUNE_STATE] (state) {
    state.entry.name = null
    state.entry.description = null
  }
}
