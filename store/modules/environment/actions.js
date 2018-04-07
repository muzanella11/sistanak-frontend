import api from '~/api'
import * as ENVIRONMENT from './types'

export default {
  [ENVIRONMENT.FETCH_RESOURCE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.environment.list(data).then((response) => {
        commit(ENVIRONMENT.SET_STATE, {accessor: 'entries', value: response.data.data})
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ENVIRONMENT.FETCH_DETAIL] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.environment.detail(id).then((response) => {
        commit(ENVIRONMENT.SET_STATE, { accessor: 'entriesDetail', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ENVIRONMENT.FETCH_DETAIL_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.environment.detail(id).then((response) => {
        commit(ENVIRONMENT.SET_STATE, { accessor: 'entry', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ENVIRONMENT.CREATE_DATA] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.environment.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ENVIRONMENT.UPDATE_DATA] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.environment.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ENVIRONMENT.DELETE_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.environment.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }
}
