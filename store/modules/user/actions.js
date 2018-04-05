import api from '~/api'
import * as USER from './types'

export default {
  [USER.FETCH_RESOURCE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.user.list(data).then((response) => {
        commit(USER.SET_STATE, {accessor: 'entries', value: response.data.data})
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [USER.FETCH_DETAIL] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.user.detail(id).then((response) => {
        commit(USER.SET_STATE, { accessor: 'entriesDetail', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [USER.FETCH_DETAIL_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.user.detail(id).then((response) => {
        commit(USER.SET_STATE, { accessor: 'entry.name', value: response.data.data[0].name })
        commit(USER.SET_STATE, { accessor: 'entry.description', value: response.data.data[0].description })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [USER.CREATE_DATA] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.user.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [USER.UPDATE_DATA] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.user.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [USER.DELETE_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.user.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }
}
