import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import modules from './modules'
import types from './types'

export default () => {
  return new Vuex.Store({
    state,
    actions,
    getters,
    modules,
    mutations,
    types
  })
}
