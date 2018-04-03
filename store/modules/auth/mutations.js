import * as AUTHTYPES from './types'
import mutator from '~/utils/mutator'
import { TOKEN_STORAGE, IS_AUTHENTICATED, DATA_USER } from './state'
import store from 'store'

export default {
  [AUTHTYPES.SET_STATE]: mutator,

  [AUTHTYPES.SIGNIN_STATE] (state, payload) {
    store.set(IS_AUTHENTICATED, payload.isAuthenticated)
    store.set(DATA_USER, payload.dataUser)
    store.set(TOKEN_STORAGE, payload.token)
  },

  [AUTHTYPES.SIGNOUT_STATE] (state, payload) {
    state.isAuthenticated = false
    store.remove(IS_AUTHENTICATED)

    state.dataUser = []
    store.remove(DATA_USER)

    state.token = null
    store.remove(TOKEN_STORAGE)
  }
}
