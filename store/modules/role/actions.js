import api from '~/api'
import * as ROLE from './types'

export default {
  [ROLE.FETCH_RESOURCE] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.role.list(data).then((response) => {
        commit(ROLE.SET_STATE, {accessor: 'entries', value: response.data.data})
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ROLE.FETCH_DETAIL] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.role.detail(id).then((response) => {
        commit(ROLE.SET_STATE, { accessor: 'entriesDetail', value: response.data.data[0] })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ROLE.FETCH_DETAIL_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.role.detail(id).then((response) => {
        commit(ROLE.SET_STATE, { accessor: 'entry.name', value: response.data.data[0].name })
        commit(ROLE.SET_STATE, { accessor: 'entry.description', value: response.data.data[0].description })
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ROLE.CREATE_DATA] ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.role.create(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ROLE.UPDATE_DATA] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.role.update(data).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },

  [ROLE.DELETE_DATA] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.role.delete(id).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }
}
