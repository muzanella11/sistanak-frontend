import api from '~/api'
import * as AUTHTYPES from './types'

export default {
  [AUTHTYPES.SIGNIN] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.auth.login(data).then((response) => {
        commit(AUTHTYPES.SET_STATE, {accessor: 'isAuthenticated', value: true})
        commit(AUTHTYPES.SET_STATE, {accessor: 'dataUser', value: response.data.data_user})
        resolve(response)
      }, (error) => {
        reject(error.response.data)
      })
    })
  }
}
