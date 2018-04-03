// import * as GLOBAL from './types'
import store from 'store'

export const TOKEN_STORAGE = 'token'
export const IS_AUTHENTICATED = 'isAuthenticated'
export const DATA_USER = 'dataUser'

export const initial = () => ({
  token: store.get(TOKEN_STORAGE) ? store.get(TOKEN_STORAGE) : null,
  isAuthenticated: store.get(IS_AUTHENTICATED) ? store.get(IS_AUTHENTICATED) : false,
  dataUser: store.get(DATA_USER) ? store.get(DATA_USER) : {},
  entries: []
})

export default initial()
