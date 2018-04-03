import { GET_ENTRIES, IS_AUTHENTICATED, TOKEN } from './types'

export default {
  [GET_ENTRIES] (state) {
    return state.entries
  },

  [IS_AUTHENTICATED] (state) {
    return state.isAuthenticated
  },

  [TOKEN] (state) {
    return state.token
  }
}
