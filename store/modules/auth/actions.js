import api from '~/api'
import * as AUTHTYPES from './types'

export default {
  [AUTHTYPES.SIGNIN] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.auth.login(data).then((response) => {
        commit(AUTHTYPES.SET_STATE, {accessor: 'isAuthenticated', value: true})
        commit(AUTHTYPES.SET_STATE, {accessor: 'dataUser', value: response.data.data_user})
        commit(AUTHTYPES.SET_STATE, {accessor: 'token', value: response.data.token})

        let data = {
          isAuthenticated: true,
          token: response.data.token,
          dataUser: response.data.data_user
        }

        commit(AUTHTYPES.SIGNIN_STATE, data)

        resolve(response)
      }, (error) => {
        reject(error.response.data)
      })
    })
  }
}
